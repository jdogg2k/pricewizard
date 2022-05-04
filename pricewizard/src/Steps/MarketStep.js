import React, {forwardRef, useImperativeHandle} from 'react';
import CurrencyInput from 'react-currency-input-field';
import { object } from 'prop-types';

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
const MarketStep = forwardRef((props, ref) => {

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

          </div>
          
        </div>

});

MarketStep.propTypes = {
  data: object
}

MarketStep.displayName = 'MarketStep';

export default MarketStep;