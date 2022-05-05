import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { API } from 'aws-amplify';
import StepZilla from "react-stepzilla";
import AdjustStep from './AdjustStep';
import CostStep from './CostStep';
import DeliverStep from './DeliverStep';
import MarketStep from './MarketStep';
import '../Modal/Modal.css';
import '../App.css';
import ToastComp from '../components/toast/ToastComp';
import { createPriceBuild as createPriceBuildMutation } from '../graphql/mutations';
import { updatePriceBuild as updatePriceBuildMutation } from '../graphql/mutations';
import { string } from 'prop-types';
import { listPriceBuilds } from '../graphql/queries';
import { useNavigate } from "react-router-dom";

BuildZilla.propTypes = {
    selCategory: string
}

export default function BuildZilla(props) {

  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [confirmmessage, setConfirmMsg] = useState('');
  const [toaststyle, setToastStyle] = useState('success');
  const [buildLoaded, setBuildLoaded] = useState(false);
  const [x, setX] = useState();

  let buildObj = useRef({ 
    priceBuildCategoryId: '',
    compacquisition: 0, 
    comprelacement: 0, 
    compsegment: 0, 
    compshrink: 0, 
    packaging: 0, 
    finishedshrink: 0, 
    interplantfreight: 0, 
    manufacturingcost: 0, 
    externalconsulting: 0, 
    servicevalue: 0, 
    nonstandard: 0, 
    discountpremium: 0, 
    inflationpremium: 0, 
    curriskpremium: 0, 
    cashpremium: 0, 
    taxpremium: 0, 
    marketfreight: 0
});

  //TRY USE EFFECT TO SET buildstate here instead of parent.  check old code

  function toastConfirm(tStyle, msg) {
    setConfirmMsg(msg);
    setToastStyle(tStyle);
    setShowToast(true);
  }
  
  function endToast() {
    setShowToast(false);
  }

  function addButtons() {
    const parent = document.querySelector("div.footer-buttons");


    const d = document.createElement("div");
    d.id = "saveZilla";
    d.className = "pull-right";
    d.style = "display: inline";

    let donebutton = React.createElement(
      "button",
      { className: 'btn btn-prev btn-info mb-4 ms-2',
        onClick: () => {saveBuild(false)}
      },
      "Save"
    );

    const f = document.createElement("div");
    f.id = "finishZilla";
    f.className = "pull-right";
    f.style = "display: inline";

    let finishbutton = React.createElement(
      "button",
      { className: 'btn btn-prev btn-success mb-4 ms-1',
        onClick: () => {saveBuild(true)}
      },
      "Finish"
    );

    parent.append(f);
    parent.append(d);

    ReactDOM.render(finishbutton, document.querySelector("#finishZilla"));
    ReactDOM.render(donebutton, document.querySelector("#saveZilla"));
    
  }

  async function checkExistingBuild() {

    var existBuild = { 
      priceBuildCategoryId: props.selCategory,
      compacquisition: 0, 
      comprelacement: 0, 
      compsegment: 0, 
      compshrink: 0, 
      packaging: 0, 
      finishedshrink: 0, 
      interplantfreight: 0, 
      manufacturingcost: 0, 
      externalconsulting: 0, 
      servicevalue: 0, 
      nonstandard: 0, 
      discountpremium: 0, 
      inflationpremium: 0, 
      curriskpremium: 0, 
      cashpremium: 0, 
      taxpremium: 0, 
      marketfreight: 0
  };
  
  if (props.selCategory !== "") {

    const apiData = await API.graphql({ 
      query: listPriceBuilds,
        variables: {
            filter: {
            priceBuildCategoryId: {
                eq: props.selCategory
            }
            }
        }
    });

    if (apiData.data.listPriceBuilds.items.length > 0) {
        existBuild = apiData.data.listPriceBuilds.items[0];
        
        delete existBuild.category;
        delete existBuild.createdAt; //maybe use later on to show time stamp
        delete existBuild.updatedAt; //maybe use later on to show time stamp
        
    }
    buildObj.current = existBuild;
    setBuildLoaded(true);
    addButtons();

  } else {
    alert("No Pricing Catagory Selected.  Please create/select a category to start a build!");
  }

  }

  async function saveBuild(finish) {

    var msg = "New Price Build Created Successfully!";

    if (buildObj.current.id) { //update existing build

      await API.graphql({ query: updatePriceBuildMutation, variables: { input: buildObj.current } });
      msg = "Price Build Updated Successfully!";
      toastConfirm("success", msg);

    } else { //add new build
      
      await API.graphql({ query: createPriceBuildMutation, variables: { input: buildObj.current } });
      //props.visualizeBuild(props.buildState);
      msg = "Price Build Created Successfully!";
      toastConfirm("success", msg);
    }

    if (finish)
      navigate("/visualize");

  }

  function setFreight(val) {
    buildObj.current.marketfreight = val;
    setX(Math.random()); //updates state of page
  }

  useEffect(() => {

    checkExistingBuild();

  }, []);

    const steps =
    [
    {name: 'Market Components', component: <MarketStep data={buildObj} />},
    {name: 'Cost to Pricing', component: <CostStep data={buildObj} />},
    {name: 'Adjustable Price', component: <AdjustStep data={buildObj} />},
    {name: 'Delivered Price', component: <DeliverStep data={buildObj} setFreight={setFreight} />}
    ]

    return (

        <div>
          <ToastComp stopToast={endToast} message={confirmmessage} toaststyle={toaststyle} confirm={showToast} />
      <div className='step-progress'>

      {buildLoaded === true && <StepZilla steps={steps} backButtonCls="btn btn-prev btn-primary pull-left mb-4 me-1 ms-1" nextButtonCls="btn btn-next btn-primary pull-right mb-4 ms-1 me-1" />}
        
      </div>
    </div>
    );

    
    
}