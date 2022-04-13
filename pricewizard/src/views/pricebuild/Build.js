import React, { useState, useEffect, useRef  } from "react";
import { useLocation } from "react-router-dom";
import { API } from 'aws-amplify';
import '../../Modal/Modal.css';
import '../../App.css';
import BuildZilla from '../../Steps/BuildZilla';

function Build() {

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

    return(        
        <>
        <div className="container catboxes">
            <h3>{categoryName}</h3>
        <BuildZilla selCategory={categoryID} />
        </div>
        </>
    );
}

export default Build