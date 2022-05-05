import React, {forwardRef, useImperativeHandle, useState} from 'react';
import CurrencyInput from 'react-currency-input-field';
import { object, node, func } from 'prop-types';
import { OverlayTrigger, Button, Tooltip} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton, CFormSelect } from '@coreui/react';
import Geosuggest from 'react-geosuggest';

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
const DeliverStep = forwardRef((props, ref) => {
  //const [valid, setValid] = useState(true);
  //const [uiError, setUiError] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const [addMa, setMA] = useState("");
  const [addCda, setCDA] = useState("");
  const [fs, setFS] = useState("amount");
  const [fsVal, setFSVal] = useState(0);
  const [pmShipCost, setShipCost] = useState(0);
  const [validForm, setValidity] = useState(true);

  const toggle = ()=>{
    setModalShow(!modalShow);
    if (modalShow) {
      //reset data
      setMA("");
      setCDA("");
      setFS("amount");
      setFSVal(0);
      setShipCost(0);
      setValidity(true);
    }
  }

  const getNavDistance = () => {

    if (addMa === "" || addCda === "" || pmShipCost === 0 || fsVal === 0) {
      setValidity(false);
    } else {

      setValidity(true);

      var service = new window.google.maps.DistanceMatrixService();

      service.getDistanceMatrix(
      {
          origins: [addMa],
          destinations: [addCda],
          travelMode: window.google.maps.TravelMode.DRIVING,
          avoidHighways: false,
          avoidTolls: false,
          unitSystem: window.google.maps.UnitSystem.IMPERIAL
        }, 
        showData
      );

    }

  };

  function getMiles(meters) {
    return Math.round(meters*0.000621371192 * 100) / 100;
}

function calcFreight(miles) {
  var freight = 0;

  if (fs === "amount") {
    //IF FS is noted as an Amount: ([Distance from MA to CDA] x PMSC) + FS
    freight = (miles * pmShipCost) + fsVal;
  } else {
    //IF FS is noted as a Percentage: ([Distance from MA to CDA] x PMSC) x (1+FS)
    freight = (miles * pmShipCost) * (1 + fsVal);
  }

  freight = Math.round(freight * 100) / 100;
  props.setFreight(freight);
  toggle(); //close wizard -- TODO store variables from modal?
}

  function showData(response, status) {
    if(status === "OK") {
        var distVal = getMiles(response.rows[0].elements[0].distance.value);
        if (distVal > 0) { //we have miles
          calcFreight(distVal);
        }
    } else {
        alert("Error: " + status);
    }
  }

  function setWizardData(v, n) {
    setShipCost(parseFloat(v));
  }

  function fsValChange(v, n) {
    setFSVal(parseFloat(v));
  }

  function setMaSuggest(suggest) {
    if (suggest !== undefined)
      setMA(suggest.label);
  }

  function setCdaSuggest(suggest) {
    if (suggest !== undefined)
      setCDA(suggest.label);
  }

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({

    isValidated() {

      //if (!valid) {
        //setUiError(true);
        //return false;
      //} else {
        // all good, let's proceed
        //return true;
     // }

     return true;

    }
  }));

    return <div className='row justify-content-center'>

        <div className='col-8'>

          <div className="input-group mb-3 mt-5">

            <span className="input-group-text" id="basic-addon17">Market Freight</span>
            <>
            {['top'].map((placement) => (
              <OverlayTrigger
                key={placement}
                placement={placement}
                overlay={
                  <Tooltip id={`tooltip-compacq`}>
                    Use Wizard to Calculate
                  </Tooltip>
                }
              >
                <Button variant="info" onClick={() => setModalShow(!modalShow)}><FontAwesomeIcon icon={faWandMagicSparkles} /></Button>
              </OverlayTrigger>
            ))}
            </>
            <CurrencyInput id="marketfreight" name="marketfreight" className="form-control" value={props.data.current.marketfreight} onValueChange={(value, name) => props.setFreight(value)} />
            
            
          </div>
          <div className="form-text">
            <p className="text-start">The market cost of shipping from your plant/warehouse to a customer (only applies in instances where the customer pays for delivery). Not reflective of competitor freight costs.</p>
          </div>

            <CModal visible={modalShow} onClose={() => setModalShow(false)}>
        <CModalHeader closeButton>Market Freight Wizard</CModalHeader>
        <CModalBody>
          <div className='row justify-content-center'>

            <div className='col-12'>

              { validForm ? <div className="alert alert-info" role="alert">
                Please fill out all fields below to calculate your market freight cost.
              </div> : null }

              { validForm ? null : <div className="alert alert-danger" role="alert">
                *All fields must be completed to properly calculate cost*
              </div> }

              <div className="form-group">
                <label htmlFor="maAddress">Manufacturing Address</label>
                <Geosuggest id="maAddress" onChange={setMA} onSuggestSelect={setMaSuggest}/>
              </div>

              <div className="form-group">
                <label htmlFor="cdaAddress">Customer Delivery Address</label>
                <Geosuggest id="cdaAddress" onChange={setCDA} onSuggestSelect={setCdaSuggest}/>
              </div>

              <div className="form-group">
                <label htmlFor="permileshipping" className="mb-3 mt-2">Per Mile Shipping Cost</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <CurrencyInput id="permileshipping" name="permileshipping" className="form-control" defaultValue={pmShipCost} onValueChange={(value, name) => setWizardData(value, name)} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="permileshipping" className="mb-3 mt-2">Fuel Surcharges</label>
                
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    { fs === "amount" ? <span className="input-group-text">$</span> : <span className="input-group-text">%</span> }
                  </div>
                  <CurrencyInput id="fsVal" name="fsVal" className="form-control" defaultValue={fsVal} onValueChange={(value, name) => fsValChange(value, name)} />
                  <div className="input-group-append">
                    <CFormSelect id="fuelSelect" aria-label="Default select example" onChange={e => setFS(e.target.value)}>
                      <option value="amount">Amount</option>
                      <option value="percentage">Percentage</option>
                    </CFormSelect>
                  </div>
                </div>
                
              </div>

            </div>

          </div>

        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={getNavDistance}>Calculate Frieght</CButton>{' '}
          <CButton
            color="secondary"
            onClick={toggle}
          >Cancel</CButton>
        </CModalFooter>
      </CModal>

          </div>
        
        </div>

});

DeliverStep.propTypes = {
  data: object,
  onHide: node,
  setFreight: func
}

DeliverStep.displayName = 'DeliverStep';

export default DeliverStep;