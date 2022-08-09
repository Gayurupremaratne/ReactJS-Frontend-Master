import axios from "axios";
import { BASE_URL } from "../config/globals";
import { toastr } from 'react-redux-toastr';
//let user = JSON.parse(localStorage.getItem("user"));
axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.common['Authorization'] = user ? user.token : '';
// axios.defaults.headers.common['Content-Type'] = "application/json";

export const PRICE_FETCH = "PRICE_FETCH";
export const PRICE_LIST = "PRICE_LIST";
export const PRICE_CREATE = "PRICE_CREATE";
export const PRICE_UPDATE = "PRICE_UPDATE";

//view publisher list
export const getPrice = props => {
  return (dispatch, getState) => {
    const url = `/price/list`;
    axios.get(`${url}`).then(({ data }) => {              
      dispatch({ type: PRICE_FETCH, payload: data.data });
    });
  };
};

//view price list
export const viewPrice = props => {
  return (dispatch, getState) => {
    const url = `/price/listing`;
    axios.get(`${url}`).then(({ data }) => {              
      dispatch({ type: PRICE_LIST, payload: data.data });
    });
  };
};

// create price for category per publisher
export const createPrice = (props) => {
  return (dispatch, getState) => {
    const url = `/price/create`;
    axios.post(`${url}`,props).then(({ data }) => {
     toastr.success('Success', 'Successfully Added');
     dispatch(viewPrice());
  // dispatch({ type: PRICE_CREATE, payload: data.data }); 
    });
  };
};  

//update category list
export const updatePrice = (price, cid, pid) => {
  console.log("price ->",price);
  console.log("cid->",cid);
  console.log("pid->",pid);
  
  return (dispatch, getState) => {
    const url = `/price/update/admin/${cid}/${pid}`;  
    axios.put(`${url}`,
    {price:price}).then(({ data }) => {
      //console.log(data)
      //dispatch({ type: PRICE_UPDATE, payload: data });
      dispatch(viewPrice());
    });
  };
};
