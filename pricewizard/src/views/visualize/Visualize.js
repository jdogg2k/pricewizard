import React, { useState, useEffect, useRef  } from "react";
import { API } from 'aws-amplify';
import '../../Modal/Modal.css';
import '../../App.css';
import PriceChart from '../../Charts/chart';
import { listPriceBuilds } from '../../graphql/queries';
import { ReactSession } from 'react-client-session';

function Visualize() {
    
    const [vizData, setVizData] = useState({});

    let categoryID = "";
    let categoryName = "";

    //get from session
    var catObj = ReactSession.get("selcategory");

    if (catObj.value) {
        categoryID = catObj.value;
        categoryName = catObj.label;
    }

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
        <div className="container catboxes">
            <PriceChart builddata={vizData} catname={categoryName} />
        </div>
        </>
    );
}

export default Visualize