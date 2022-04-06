import React, {forwardRef, useImperativeHandle} from 'react';
import CurrencyInput from 'react-currency-input-field';
import { object } from 'prop-types';

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
const DeliverStep = forwardRef((props, ref) => {
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

    return <div className='row justify-content-center'>

        <div className='col-8'>

          <div className="input-group mb-3 mt-5">
              <span className="input-group-text" id="basic-addon17">Market Freight</span>
              <CurrencyInput id="marketfreight" name="marketfreight" className="form-control" prefix="$" defaultValue={props.data.marketfreight} onValueChange={(value, name) => setStateData(value, name)} />
            </div>
            <div className="form-text">
              <p className="text-start">The market cost of shipping from your plant/warehouse to a customer (only applies in instances where the customer pays for delivery). Not reflective of competitor freight costs.</p>
            </div>

          </div>
        
        </div>

});

DeliverStep.propTypes = {
  data: object,
}

DeliverStep.displayName = 'DeliverStep';

export default DeliverStep;