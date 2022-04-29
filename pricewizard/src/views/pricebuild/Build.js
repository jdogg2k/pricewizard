import React, { useState, useEffect, useRef  } from "react";
import { API } from 'aws-amplify';
import '../../Modal/Modal.css';
import '../../App.css';
import BuildZilla from '../../Steps/BuildZilla';
import { ReactSession } from 'react-client-session';

function Build() {

    let categoryID = "";
    let categoryName = "";

    //get from session
    var catObj = ReactSession.get("selcategory");

    if (catObj.value) {
        categoryID = catObj.value;
        categoryName = catObj.label;
    }

    

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