import React, { useState, useEffect } from 'react';
import Modal from './Modal/Modal'
import './Modal/Modal.css'
import './App.css';
import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listProductCategories } from './graphql/queries';
import { createProductCategory as createProductCategoryMutation} from './graphql/mutations';
import { deleteProductCategory as deleteProductCategoryMutation} from './graphql/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingDollar, faSquarePlus } from '@fortawesome/free-solid-svg-icons'

const newCategoryState = { name: '', userid: '' }

function App() {
  const [show, setShow] = useState(false)
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(newCategoryState);
  

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

  async function createProductCategory() {
    if (!formData.name || !formData.userid) return;
    await API.graphql({ query: createProductCategoryMutation, variables: { input: formData } });
    setCategories([ ...categories, formData ]);
    setFormData(newCategoryState);
    setShow(false);
  }

  async function deleteProductCategory({ id }) {
    const newCategoryArray = categories.filter(category => category.id !== id);
    setCategories(newCategoryArray);
    await API.graphql({ query: deleteProductCategoryMutation, variables: { input: { id } }});
  }

  return (
    <div className="App">
      <h1>Price Wizard (PROTOTYPE)</h1>

      <div className="container">
        <div className="row">
          <div className="row row-cols-1 row-cols-md-3 g-4" style={{marginBottom: 30}}>
          {
            categories.map(category => (
              <div className="col" key={category.id}>
                <div className="card h-100 category">
                  <FontAwesomeIcon icon={faHandHoldingDollar} className="category-icon" size="6x" />
                  <div className="card-body">
                    <h5 className="card-title">{category.name}</h5>
                    <p className="card-text">sample description</p>
                    <button onClick={() => console.log(category.id)} className="btn btn-secondary">Modify</button>
                    <button onClick={() => deleteProductCategory(category)} className="btn btn-danger">Delete</button>
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

      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);