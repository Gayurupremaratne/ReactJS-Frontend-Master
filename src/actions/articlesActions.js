import axios from "axios";
import { BASE_URL } from "../config/globals";
import { CLIENT_RENEG_LIMIT } from "tls";
//let user = JSON.parse(localStorage.getItem("user"));
axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.common['Authorization'] = user ? user.token : '';
// axios.defaults.headers.common['Content-Type'] = "application/json";

export const ARTICLE_FETCH = "ARTICLE_FETCH";
export const ARTICLE_HISTORY_FETCH = "ARTICLE_HISTORY_FETCH";
export const DRAFT_ARTICLE_FETCH = "DRAFT_ARTICLE_FETCH";
export const ADVERTISER_ARTICLE_HISTORY = "ADVERTISER_ARTICLE_HISTORY";
export const DRAFT_ARTICLE_PUBLISHER_FETCH = "DRAFT_ARTICLE_PUBLISHER_FETCH";
export const FILTEREDLIST = "FILTEREDLIST";

//Pending articles
export const getArticles = props => {
  return (dispatch, getState) => {
    const url = `/article`;
    axios.get(`${url}`).then(({ data }) => {
      dispatch({ type: ARTICLE_FETCH, payload: data.data });
    });
  };
};

//Get article history
export const getArticleHistory = props => {
  return (dispatch, getState) => {
    const url = `/article/history`;
    axios.get(`${url}`).then(({ data }) => {
      dispatch({ type: ARTICLE_HISTORY_FETCH, payload: data.data });
    });
  };
};

export const getPublushersForaAnArticle = article_id => {
  const data_a = {
    article_id: article_id
  };

  return dispatch => {
    const url = `/article/pub-article`;
    axios.post(`${url}`, data_a).then(({ data }) => {
      dispatch({ type: DRAFT_ARTICLE_PUBLISHER_FETCH, payload: data.data });
    });
  };
};

export const getDraftArticles = props => {
  const data_a = {
    created_by: props.created_by
  };

  return (dispatch, getState) => {
    const url = `/article/dashboard`;
    axios.post(`${url}`, data_a).then(({ data }) => {
      dispatch({ type: DRAFT_ARTICLE_FETCH, payload: data.data });
    });
  };
};

export const getFilteredList = filteredList => {
  return dispatch => {
    dispatch({type: FILTEREDLIST, payload: filteredList});
  };
};

//advertiser-article history list
export const getAdvertiserArticleHistory = props => {
  const data_a = {
    username: props.username
  };

  return (dispatch, getState) => {
    const url = `/article/get-history`;
    axios.post(`${url}`, data_a).then(({ data }) => {
      dispatch({ type: ADVERTISER_ARTICLE_HISTORY, payload: data.data });
    });
  };
};
