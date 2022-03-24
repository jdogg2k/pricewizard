import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { API } from 'aws-amplify';
import StepZilla from "react-stepzilla";
import AdjustStep from './AdjustStep';
import CostStep from './CostStep';
import DeliverStep from './DeliverStep';
import MarketStep from './MarketStep';
import { createPriceBuild as createPriceBuildMutation } from '../graphql/mutations';
import { updatePriceBuild as updatePriceBuildMutation } from '../graphql/mutations';

export default function BuildZilla(props) {

  useEffect(() => {

    async function saveBuild() {

      var msg = "New Price Build Created Successfully!";

      if (props.buildState.id) { //update existing build
        await API.graphql({ query: updatePriceBuildMutation, variables: { input: props.buildState } });
        msg = "Price Build Updated Successfully!";
      } else { //add new build
        await API.graphql({ query: createPriceBuildMutation, variables: { input: props.buildState } });
      }

      props.changeState("category", msg);
    }

    function cancelBuild() {
      props.changeState("category", "");
    }

    const parent = document.querySelector("div.footer-buttons");
    const d = document.createElement("div");
    d.id = "saveZilla";
    d.className = "pull-right";
    d.style = "display: inline";

    const c = document.createElement("div");
    c.id = "cancelZilla";
    c.className = "pull-left";
    c.style = "display: inline";
    
    parent.prepend(c);
    parent.append(d);

    let cancelbutton = React.createElement(
      "button",
      { className: 'btn btn-prev btn-danger mb-4 me-1',
        onClick: () => {cancelBuild()}
      },
      "Cancel"
    );

    let donebutton = React.createElement(
      "button",
      { className: 'btn btn-prev btn-success mb-4 ms-2',
        onClick: () => {saveBuild()}
      },
      "Save"
    );

    ReactDOM.render(cancelbutton, document.querySelector("#cancelZilla"));
    ReactDOM.render(donebutton, document.querySelector("#saveZilla"));

  }, []);

    const steps =
    [
    {name: 'Market Components', component: <MarketStep data={props.buildState} />},
    {name: 'Cost to Pricing', component: <CostStep data={props.buildState} />},
    {name: 'Adjustable Price', component: <AdjustStep data={props.buildState} />},
    {name: 'Delivered Price', component: <DeliverStep data={props.buildState} />}
    ]

    return (
        <div>
      <div className='step-progress'>
        <StepZilla steps={steps} backButtonCls="btn btn-prev btn-primary pull-left mb-4 me-1" nextButtonCls="btn btn-next btn-primary pull-right mb-4 ms-1" />
      </div>
    </div>
    );

    
    
}