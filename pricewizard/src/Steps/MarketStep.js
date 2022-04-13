import React, {forwardRef, useImperativeHandle} from 'react';
import CurrencyInput from 'react-currency-input-field';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Button, Tooltip, Modal } from 'react-bootstrap';
import { object, node } from 'prop-types';

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
const MarketStep = forwardRef((props, ref) => {

  const [modalShow, setModalShow] = React.useState(false);

  function WizModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="example-modal-sizes-title-md"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-md">
            Calculate Cost Wizard
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Wizard Coming Soon....</h3>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  //const [valid, setValid] = useState(true);
  //const [uiError, setUiError] = useState(false);
  
  /*const toggleValidState = () => {
    setUiError(false);
    setValid(!valid);
  }*/

  function setStateData(v, n) {
    props.data.current[n] = parseFloat(v);
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
              <span className="input-group-text" id="basic-addon1">Cost of Component Acquisition</span>
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
                  <Button variant="info" onClick={() => setModalShow(true)}><FontAwesomeIcon icon={faWandMagicSparkles} /></Button>
                </OverlayTrigger>
              ))}
            </>
            <CurrencyInput id="compacquisition" name="compacquisition" className="form-control" prefix="$" defaultValue={props.data.current.compacquisition} onValueChange={(value, name) => setStateData(value, name)} />
            </div>
            <div className="form-text">
              <p className="text-start">Estimate based on the time period of acquisition and forecasted demand. For forecasted demand, it is recommended to use the following order, exhausting each category before moving to the next: Existing Inventory, Purchase Orders, Contracts, Replacements. Components/materials should be valued based on all projected quantities available during the full production month, even when those quantities exceed the projected demand. The periodic unit price is calculated by dividing the total value of the monthly projection by the total quantity of that component/material.</p>
            </div>

            <div className="input-group mb-3 mt-5">
              <span className="input-group-text" id="basic-addon2">Replacement of Component at Spot Price</span>
              <CurrencyInput id="comprelacement" name="comprelacement" className="form-control" prefix="$" defaultValue={props.data.current.comprelacement} onValueChange={(value, name) => setStateData(value, name)} />
            </div>
            <div className="form-text text-left">
              <p className="text-start">The value that reflects your cost of replacing the component at the specific volume/quality/time period.</p>
            </div>

            <div className="input-group mb-3 mt-5">
              <span className="input-group-text" id="basic-addon3">Component Segment Sourcing/Margin Advantage</span>
              <CurrencyInput id="compsegment" name="compsegment" className="form-control" prefix="$" defaultValue={props.data.current.compsegment} onValueChange={(value, name) => setStateData(value, name)} />
             
            </div>
            <div className="form-text text-left">
              <p className="text-start">Sourcing Advantage: The difference in price between what your competitors would pay for the component and what you are able to pay. Margin Advantage: Differentiated value of a unique component as expressed in formulation.</p>
            </div>

            <WizModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

          </div>
          
        </div>

});

MarketStep.propTypes = {
  data: object,
  onHide: node,
}

MarketStep.displayName = 'MarketStep';

export default MarketStep;