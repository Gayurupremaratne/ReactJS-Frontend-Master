import axios from "axios";
import { BASE_URL } from "../config/globals";
//let user = JSON.parse(localStorage.getItem("user"));
axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.common['Authorization'] = user ? user.token : '';
// axios.defaults.headers.common['Content-Type'] = "application/json";

export const LANGUAGE_FETCH = "LANGUAGE_FETCH";
export const LANGUAGE_ARTICLE_FETCH = "LANGUAGE_ARTICLE_FETCH";

//view publisher list
export const getLanguage = props => {
  return (dispatch, getState) => {
    const url = `/language/list`;
    axios.get(`${url}`).then(({ data }) => {
         console.log("=====>",data);
        
      dispatch({ type: LANGUAGE_FETCH, payload: data.data });
    });
  };
};

export const getLanguagePublisher = props => {
  return (dispatch, getState) => {
    const url = `/language/pub/${props}`;
    axios.get(`${url}`).then(({ data }) => {        
      dispatch({ type: LANGUAGE_ARTICLE_FETCH, payload: data.data });
    });
  };
};