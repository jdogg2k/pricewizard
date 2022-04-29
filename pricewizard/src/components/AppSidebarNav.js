import React, {useState, useEffect} from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ReactSession } from 'react-client-session';
import { CBadge } from '@coreui/react'
import Select from 'react-select'
import { CNavTitle } from '@coreui/react'
import { Auth } from 'aws-amplify';
import { API } from 'aws-amplify';
import { listProductCategories } from '../graphql/queries';

export const AppSidebarNav = ({ items }) => {
  const [categoryOptions, setLoadOptions] = useState([])
  const [selectedCategory, setCatValue] = useState(ReactSession.get("selcategory"));
  const location = useLocation()

  let loggedInUser = "";

  const changeCat = (e) =>{ //figure out why session not saving.
    ReactSession.set("selcategory", e);
    setCatValue(e);
    window.location.reload();
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => {
      loggedInUser = user.username;
      fetchProductCategories();
    })
    .catch(err => console.log(err));

    },[])

  async function fetchProductCategories() {
    try {
      const apiData = await API.graphql({ 
        query: listProductCategories,
        variables: {
          filter: {
            userid: {
              eq: loggedInUser
            }
          }
        }
       });

       var catList = [];

       for await (const i of apiData.data.listProductCategories.items) {
            var newCat = i;
            var catObj = {};
            catObj.value = newCat.id;
            catObj.label = newCat.name;
            catList.push(catObj);
        };
        
        setLoadOptions(catList);

    } catch (error) {
        console.log('error getting catagories', error);
    }
    
  }

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: 200,
      color: 'black',
      padding: 20,
    }),
  
    /*control: (_, { selectProps: { width }}) => ({
      width: width
    }),
  
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }*/
  }

  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  return (
    <>
    <CNavTitle>Default Pricing Category</CNavTitle>
    <Select styles={customStyles} options={categoryOptions} value={selectedCategory} onChange={changeCat} />
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
   </>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
