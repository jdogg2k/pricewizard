import React, { useState, useEffect } from 'react';
import Modal from './Modal/Modal'
import './Modal/Modal.css'
import './App.css';
import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listProductCategories } from './graphql/queries';
import { createProductCategory as createProductCategoryMutation} from './graphql/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'

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

  /*async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
              <button onClick={() => deleteNote(note)}>Delete note</button>
  }*/

  return (
    <div className="App">
      <h1>Price Wizard (PROTOTYPE)</h1>

      <div className="container">
        <div className="row">
          <div class="row row-cols-1 row-cols-md-3 g-4" style={{marginBottom: 30}}>
          {
            categories.map(category => (
              <div class="col">
                <div class="card h-100">
                  <FontAwesomeIcon icon={faHandHoldingDollar} size="6x" />
                  <div class="card-body">
                    <h5 class="card-title">{category.name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  </div>
                </div>
              </div>
            ))
          }
          </div>
        </div>
      </div>

      <button onClick={() => setShow(true) } style={{marginBottom: 30}}>Create New Product Category</button>
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