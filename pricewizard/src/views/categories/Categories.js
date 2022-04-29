import React, { useState, useEffect  } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import Modal from '../../Modal/Modal';
import '../../Modal/Modal.css';
import '../../App.css';
import ToastComp from '../../components/toast/ToastComp';
import { listProductCategories, listPriceBuilds } from '../../graphql/queries';
import { createProductCategory as createProductCategoryMutation} from '../../graphql/mutations';
import { deleteProductCategory as deleteProductCategoryMutation} from '../../graphql/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { ReactSession } from 'react-client-session';

const newCategoryState = { name: '', userid: '' }

function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(newCategoryState);
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [confirmmessage, setConfirmMsg] = useState('');
  const [toaststyle, setToastStyle] = useState('success');
  
  useEffect(() => {
    fetchProductCategories();
  }, []);

  Auth.currentAuthenticatedUser({
    bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  }).then(user => {
    newCategoryState.userid = user.username;
  })
  .catch(err => console.log(err));

  async function fetchProductCategories() {
    try {
      const apiData = await API.graphql({ 
        query: listProductCategories,
        variables: {
          filter: {
            userid: {
              eq: newCategoryState.userid
            }
          }
        }
       });

       var catList = [];

       for await (const i of apiData.data.listProductCategories.items) {
            var newCat = i;
            newCat.hasBuild = await checkForBuild(newCat.id);
            catList.push(newCat);
        };

       setCategories(catList);
       
    } catch (error) {
        console.log('error getting catagories', error);
    }
    
  }

  async function checkForBuild(catID) {
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
      return true;
     } else {
      return false;
     } 
  }
  
  function toastConfirm(tStyle, msg) {
    setConfirmMsg(msg);
    setToastStyle(tStyle);
    setShowToast(true);
  }

  function endToast() {
    setShowToast(false);
  }

  async function createProductCategory() {
    if (!formData.name || !formData.userid) return;
    const newcat = await API.graphql({ query: createProductCategoryMutation, variables: { input: formData } });
    await fetchProductCategories();
    setFormData(newCategoryState);
    setShow(false);
    toastConfirm("success", formData.name + " created successfully!  Please start your build...");
   // editBuild(newcat.data.createProductCategory.id, newcat.data.createProductCategory.name, "new");
  }

  async function deleteProductCategory({ id }) {
    const newCategoryArray = categories.filter(category => category.id !== id);
    setCategories(newCategoryArray);
    await API.graphql({ query: deleteProductCategoryMutation, variables: { input: { id } }});
    //toastConfirm("danger", "Price Category Deleted");
  }

  function processBuild(tCat, mode) {
    var catObj = {};
    catObj.value = tCat.id;
    catObj.label = tCat.name;
    ReactSession.set("selcategory", catObj);

    var navloc = "/pricebuild";
    if (mode == "visualize")
      navloc = "/visualize";

    navigate(navloc);
  }

  return (
      <>
  <ToastComp stopToast={endToast} message={confirmmessage} toaststyle={toaststyle} confirm={showToast} />
    <div className="container catboxes">
        <div className="row">
          <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
          {
            categories.map(category => (
              <div className="col" key={category.id}>
                <div className="card h-100 category">
                  <FontAwesomeIcon icon={faHandHoldingDollar} className="category-icon" size="6x" />
                  <div className="card-body">
                    <h5 className="card-title">{category.name}</h5>
                    <p className="card-text">sample description {category.hasBuild}</p>
                    {category.hasBuild === true && <button onClick={() => processBuild(category, 'visualize')} className="btn btn-info me-2">Visualize</button>}
                    <button onClick={() => processBuild(category, 'build')} className="btn btn-secondary me-1">Edit Build</button>
                    <button onClick={() => deleteProductCategory(category)} className="btn btn-danger ms-1">Delete</button>
                  </div>
                </div>
              </div>
            ))
          }
          <div className="col">
              <div className="card h-100 new-category">
                <FontAwesomeIcon icon={faSquarePlus} className="category-icon" size="6x" style={{marginTop: 35}} />
                <div className="card-body">
                  <button onClick={() => setShow(true) } className="btn btn-secondary stretched-link">Create New Product Category</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

<Modal title="New Product Category" onClose={() => setShow(false)} onSubmit={createProductCategory} show={show}>
<div className="container">
  <div className="row">
      <div className="col">
          <div className="form-floating mb-3">
            <input id="categoryName" className="form-control" 
            onChange={e => setFormData({ ...formData, 'name': e.target.value})} 
            placeholder="Category Name" value={formData.name} />
            <label forhtml="categoryName">Category Name</label>
          </div>
      </div>
  </div>
</div>  
</Modal>
</>
  );
}

export default Categories