import React, {forwardRef, useImperativeHandle} from 'react';
import CurrencyInput from 'react-currency-input-field';

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
const AdjustStep = forwardRef((props, ref) => {
  //const [valid, setValid] = useState(true);
  //const [uiError, setUiError] = useState(false);
  
  /*const toggleValidState = () => {
    setUiError(false);
    setValid(!valid);
  }*/

  function setStateData(v, n) {
    props.data[n] = parseFloat(v);
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

    return <div><div className='row justify-content-center'>

        <div className='col-4'>

          <div className="input-group mb-3 mt-5">
              <span className="input-group-text" id="basic-addon9">External Consulting/Distribution Margin</span>
              <CurrencyInput id="externalconsulting" name="externalconsulting" className="form-control" prefix="$" defaultValue={props.data.externalconsulting} onValueChange={(value, name) => setStateData(value, name)} />
            </div>
            <div className="form-text">
              <p className="text-start">Cost of compensating non-employee consultants, including royalties and/or external salespeople.</p>
            </div>

        </div>

        <div className='col-4'>

          <div className="input-group mb-3 mt-5">
            <span className="input-group-text" id="basic-addon10">Service &amp; Value Margin</span>
            <CurrencyInput id="servicevalue" name="servicevalue" className="form-control" prefix="$" defaultValue={props.data.servicevalue} onValueChange={(value, name) => setStateData(value, name)} />
          </div>
          <div className="form-text text-left">
            <p className="text-start">Value of a product above the FG cost to a customer segment/subsegment because of consultant, nine box standard services, brand, formulation, relative quality, performance and value. In products where pricing optimization is being utilized this is the element of the price build that is optimized.</p>
          </div>

        </div>

        </div>

        <div className='row justify-content-center'>

          <div className='col-4'>

          <div className="input-group mb-3 mt-5">
            <span className="input-group-text" id="basic-addon11">Non-Standard Service Premium</span>
            <CurrencyInput id="nonstandard" name="nonstandard" className="form-control" prefix="$" defaultValue={props.data.nonstandard} onValueChange={(value, name) => setStateData(value, name)} />
          </div>
          <div className="form-text text-left">
            <p className="text-start">Premiums included for services provided to a customer in addition to those typical for the customer's particular segment.</p>
          </div>

          </div>

          <div className='col-4'>

          <div className="input-group mb-3 mt-5">
            <span className="input-group-text" id="basic-addon12">Discount Premium</span>
            <CurrencyInput id="discountpremium" name="discountpremium" className="form-control" prefix="$" defaultValue={props.data.discountpremium} onValueChange={(value, name) => setStateData(value, name)} />
          </div>
          <div className="form-text text-left">
            <p className="text-start">Includes premiums for discounts such as volume, bagged products, branded products, customer segment, etc.</p>
          </div>

        </div>

        </div>

       <div className='row justify-content-center'>

        <div className='col-4'>

            <div className="input-group mb-3 mt-5">
                <span className="input-group-text" id="basic-addon13">Inflation Premium</span>
                <CurrencyInput id="inflationpremium" name="inflationpremium" className="form-control" prefix="$" defaultValue={props.data.inflationpremium} onValueChange={(value, name) => setStateData(value, name)} />
              </div>
              <div className="form-text text-left">
                <p className="text-start">Reflects anticipated inflation over the life of a contract. An inflation premium is typically applied only to prices determined via long-term (i.e. greater than one month) contract and denominated in local currency where the local inflation exceeds global inflation.</p>
              </div>

          </div>

          <div className='col-4'>

          <div className="input-group mb-3 mt-5">
            <span className="input-group-text" id="basic-addon14">Currency Risk Premium</span>
            <CurrencyInput id="curriskpremium" name="curriskpremium" className="form-control" prefix="$" defaultValue={props.data.curriskpremium} onValueChange={(value, name) => setStateData(value, name)} />
          </div>
          <div className="form-text">
            <p className="text-start">Reflects the risk assumed where contract or payment currency differs from local or operating currency.</p>
          </div>

          </div>
          
          </div>

          <div className='row justify-content-center'>

          <div className='col-4'>

          <div className="input-group mb-3 mt-5">
            <span className="input-group-text" id="basic-addon15">Cash Payment Premium</span>
            <CurrencyInput id="cashpremium" name="cashpremium" className="form-control" prefix="$" defaultValue={props.data.cashpremium} onValueChange={(value, name) => setStateData(value, name)} />
          </div>
          <div className="form-text text-left">
            <p className="text-start">Reflects the cost of extended terms and terms that include a cash discount.</p>
          </div>
          
          </div>

          <div className='col-4'>

          <div className="input-group mb-3 mt-5">
            <span className="input-group-text" id="basic-addon16">Tax Premium</span>
            <CurrencyInput id="taxpremium" name="taxpremium" className="form-control" prefix="$" defaultValue={props.data.taxpremium} onValueChange={(value, name) => setStateData(value, name)} />
          </div>
          <div className="form-text text-left">
            <p className="text-start">Reflects the impact of taxes.</p>
          </div>

        </div>
        
      </div>
      </div>

});

export default AdjustStep;