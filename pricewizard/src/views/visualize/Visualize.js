import React, { useState, useEffect, useRef  } from "react";
import { useLocation } from "react-router-dom";
import { API } from 'aws-amplify';
import '../../Modal/Modal.css';
import '../../App.css';
import PriceChart from '../../Charts/chart';
import { listPriceBuilds } from '../../graphql/queries';

function Visualize() {

    
    const [vizData, setVizData] = useState({});
    const location = useLocation();

    function getCatInfo(cType) {
        var catRes = "";
        if (location.state != null) {
            catRes = location.state[cType]; 
        }
        return catRes;
    }

    const categoryID = getCatInfo("cat");
    const categoryName = getCatInfo("catName");

    visualizeBuild(categoryID);

    async function visualizeBuild(catID, catName) {
        const apiData = await API.graphql({ 
          query: listPriceBuilds,
          variables: {
            filter: {
              priceBuildCategoryId: {
                eq: catID
              }
            }
          }
         });
    
         if (apiData.data.listPriceBuilds.items.length > 0) {
           var vizBuild = apiData.data.listPriceBuilds.items[0];
           setVizData(vizBuild);
         } else {
            alert("No Build Data exists for this category!");
         }
      }

    return(        
        <>
        <div className="container">
            <PriceChart builddata={vizData} catname={categoryName} />
        </div>
        </>
    );
}

export default Visualize