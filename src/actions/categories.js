import axios from "axios";
import { BASE_URL } from "../config/globals";
import { toastr } from 'react-redux-toastr';
import { CLIENT_RENEG_LIMIT } from "tls";
//let user = JSON.parse(localStorage.getItem("user"));
axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.common['Authorization'] = user ? user.token : '';
// axios.defaults.headers.common['Content-Type'] = "application/json";

export const CATEGORY_FETCH = "CATEGORY_FETCH";
export const CATEGORIES_LIST = "CATEGORIES_LIST";
export const CATEGORY_VIEW = "CATEGORY_VIEW";
export const CATEGORY_CREATE = "CATEGORY_CREATE";
export const CATEGORY_UPDATE = " CATEGORY_UPDATE";
export const CATEGORY_DELETE = "CATEGORY_DELETE";



//view list
export const getCategoris = (props) => {
 
  return (dispatch, getState) => {
    const url = `/category/list`;
    axios.get(`${url}`).then(({ data }) => {
     
      dispatch({ type: CATEGORY_FETCH, payload: data.data });
    });
  };
};  

// list all available categories
export const getCategoriesList = props => {
  return (dispatch, getState) => {
    const url = `/allCategory/list`;
    axios.get(`${url}`).then(({ data }) => {
      dispatch({ type: CATEGORIES_LIST, payload: data.data });
    });
  };
};

//update category list
export const editCategory = (name, id) => {
 
  
  return (dispatch, getState) => {
    const url = `/category/update/${id}`;
    axios.put(`${url}`,
    {name:name
    }).then(({ data }) => {
      console.log(data)
      //dispatch({ type: CATEGORY_UPDATE, payload: data });
      dispatch(viewCategory());
    });
  };
};

// create category
export const createCategory = (props) => {
  
  return (dispatch, getState) => {
    const url = `/category/create`;
    axios.post(`${url}`,props).then(({ data }) => {
     // dispatch({type: CATEGORY_CREATE, payload:data.data});
     toastr.success('Success', 'Successfully Added');
     dispatch(viewCategory());
    });
  };
};  


//view category list admin
export const viewCategory = (props) => {
  return (dispatch, getState) => {
    const url = `/category/admin/list`;
    axios.get(`${url}`).then(({ data }) => {
     //console.log("=======>", data);  
      dispatch({ type: CATEGORY_VIEW, payload: data.data });
    });
  };
};  


// delete category
export const deleteCategory = (props) => {
  //  let id=props.id
   console.log('ID-----',props.id) 
  return (dispatch, getState) => {
   // const url = `/category/${props}`; 
    const url = `/category/${props.id}`;
    axios.delete(`${url}`).then(({ data }) => {
      dispatch(viewCategory());

    });
  };
};   


