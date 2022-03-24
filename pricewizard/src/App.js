import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Modal from './Modal/Modal';
import './Modal/Modal.css';
import './App.css';
import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listProductCategories, listPriceBuilds } from './graphql/queries';
import { createProductCategory as createProductCategoryMutation} from './graphql/mutations';
import { deleteProductCategory as deleteProductCategoryMutation} from './graphql/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import BuildZilla from './Steps/BuildZilla';


const newCategoryState = { name: '', userid: '' }

function App() {
  const [buildconfirm, setBuildConfirm] = useState(false);
  const [confirmmessage, setConfirmMsg] = useState('');
  const [toaststyle, setToastStyle] = useState('success');
  const [show, setShow] = useState(false)
  const [pagemode, setPageMode] = useState('category')
  const [selcategory, setActiveCategory] = useState('')
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(newCategoryState);
  const [buildState, setBuildState] = useState({ 
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

  useEffect(() => {
    fetchProductCategories();
  }, []);

  Auth.currentAuthenticatedUser({
    bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  }).then(user => {
    newCategoryState.userid = user.username
  })
  .catch(err => console.log(err));

  async function fetchProductCategories() {
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
     setCategories(apiData.data.listProductCategories.items);
  }

  async function editBuild(catID, buildType) {

    var isNewBuild = false;
    if (buildType === "new") {
      isNewBuild = true;
    } else {  //check for existing build
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
         var existBuild = apiData.data.listPriceBuilds.items[0];
         delete existBuild.category;
         delete existBuild.createdAt; //maybe use later on to show time stamp
         delete existBuild.updatedAt; //maybe use later on to show time stamp
         setBuildState(existBuild);
       } else {
        isNewBuild = true;
       }
    }
      

    if (isNewBuild) { //reset build state
      setBuildState({ 
        priceBuildCategoryId: catID,
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
    }

    setActiveCategory(catID);
    setPageMode('build');
  }

  async function createProductCategory() {
    if (!formData.name || !formData.userid) return;
    const newcat = await API.graphql({ query: createProductCategoryMutation, variables: { input: formData } });
    await fetchProductCategories();
    setFormData(newCategoryState);
    setShow(false);
    toastConfirm("success", formData.name + " created successfully!  Please start your build...");
    editBuild(newcat.data.createProductCategory.id, "new");
  }

  async function deleteProductCategory({ id }) {
    const newCategoryArray = categories.filter(category => category.id !== id);
    setCategories(newCategoryArray);
    await API.graphql({ query: deleteProductCategoryMutation, variables: { input: { id } }});
    toastConfirm("danger", "Price Category Deleted");
  }

  function toastConfirm(tStyle, msg) {
    setConfirmMsg(msg);
    setToastStyle(tStyle);
    setBuildConfirm(true);
  }

  function modPageState(stateName, msg) {
    setPageMode(stateName);
    if (msg !== "")
      toastConfirm("success", msg);
  }

  const CategoryList = () => (
    <div className="container">
        <div className="row">
          <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
          {
            categories.map(category => (
              <div className="col" key={category.id}>
                <div className="card h-100 category">
                  <FontAwesomeIcon icon={faHandHoldingDollar} className="category-icon" size="6x" />
                  <div className="card-body">
                    <h5 className="card-title">{category.name}</h5>
                    <p className="card-text">sample description</p>
                    <button onClick={() => editBuild(category.id, 'mod')} className="btn btn-secondary me-1">Modify</button>
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
  )

  

  return (
    <div className="App">
    
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setBuildConfirm(false)} show={buildconfirm} delay={3000} autohide bg={toaststyle}>
        <Toast.Header>
          <strong className="me-auto">PriceWizard</strong>
          <small>now</small>
        </Toast.Header>
        <Toast.Body className='text-white'>{confirmmessage}</Toast.Body>
      </Toast>
      </ToastContainer>

      <h1>Price Wizard (PROTOTYPE)</h1>

      {pagemode === 'category' && <CategoryList />}

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

      {pagemode === 'build' && <BuildZilla selCategory={selcategory} changeState={modPageState} buildState={buildState} />}

      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);