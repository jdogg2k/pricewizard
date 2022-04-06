import React, {forwardRef, useImperativeHandle} from 'react';
import CurrencyInput from 'react-currency-input-field';
import { object } from 'prop-types';

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
const CostStep = forwardRef((props, ref) => {
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
              <span className="input-group-text" id="basic-addon4">Component Shrink</span>
              <CurrencyInput id="compshrink" name="compshrink" className="form-control" prefix="$" defaultValue={props.data.compshrink} onValueChange={(value, name) => setStateData(value, name)} />
            </div>
            <div className="form-text">
              <p className="text-start">Reduction of component(s) prior to being combined with others to make a finished product. Includes reduction that occurs in the processing or making of a component as well.</p>
            </div>

            <div className="input-group mb-3 mt-5">
              <span className="input-group-text" id="basic-addon5">Packaging</span>
              <CurrencyInput id="packaging" name="packaging" className="form-control" prefix="$" defaultValue={props.data.packaging} onValueChange={(value, name) => setStateData(value, name)} />
            </div>
            <div className="form-text text-left">
              <p className="text-start">Cost of packaging materials (NOT labor or utilities) and additional premiums associated with pricing rules or value delivered.  Example: The cost of packaging materials per KG in a tote / super sack may be greater than the cost for packaging per KG in a 25KG kraft bag. Pricing rules may indicate that the price per KG for product sold in 25KG bag must be greater than that sold in totes, thus in addition to the packaging materials costs a premium would be added to the packaging cost to satisfy the rule.</p>
            </div>

            <div className="input-group mb-3 mt-5">
              <span className="input-group-text" id="basic-addon6">Finished Good Shrink</span>
              <CurrencyInput id="finishedshrink" name="finishedshrink" className="form-control" prefix="$" defaultValue={props.data.finishedshrink} onValueChange={(value, name) => setStateData(value, name)} />
            </div>
            <div className="form-text text-left">
              <p className="text-start">Expected reduction from normal transformation of components to finished products. Can include reduction due to any of the following: component/ingredient, manufacturing, transportation, packaging, and/or warehousing.</p>
            </div>

            <div className="input-group mb-3 mt-5">
              <span className="input-group-text" id="basic-addon7">Interplant Freight</span>
              <CurrencyInput id="interplantfreight" name="interplantfreight" className="form-control" prefix="$" defaultValue={props.data.interplantfreight} onValueChange={(value, name) => setStateData(value, name)} />
            </div>
            <div className="form-text text-left">
              <p className="text-start">Freight costs incurred in shipping finished products between plants and/or warehouses (NOT delivery to customers).</p>
            </div>

            <div className="input-group mb-3 mt-5">
              <span className="input-group-text" id="basic-addon8">Manufacturing Cost</span>
              <CurrencyInput id="manufacturingcost" name="manufacturingcost" className="form-control" prefix="$" defaultValue={props.data.manufacturingcost} onValueChange={(value, name) => setStateData(value, name)} />
            </div>
            <div className="form-text text-left">
              <p className="text-start">All expected manufacturing costs for the product category given expected volumes/run sizes. Includes fixed and variable costs for the following: labor, depreciation, energy/utilities, maintenance, packaging labor (NOT packaging materials).</p>
            </div>

          </div>
        
        </div>
 

});

CostStep.propTypes = {
  data: object,
}

CostStep.displayName = 'CostStep';

export default CostStep;