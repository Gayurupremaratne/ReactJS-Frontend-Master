import axios from "axios";
import { BASE_URL } from "../config/globals";
import moment from "moment";
import { toastr } from "react-redux-toastr";

axios.defaults.baseURL = BASE_URL;

export const CREATE_INOVICE = "CREATE_INOVICE";
export const GET_INVOICE_BY_ID = "GET_INVOICE_BY_ID";
export const GET_INVOICE_TOTAL = "GET_INVOICE_TOTAL";

export const createInvoice = publisher_id => {
  return (dispatch, getState) => {
    const data = {
      status: 1,
      created_by: localStorage.getItem("username"),
      created_date: moment().format("YYYY/MM/DD HH:mm:ss"),
      updated_by: null,
      updated_date: null,
      publisher_id: publisher_id,
      category_id: localStorage.getItem("cats_id")
    };

    const url = `/invoice/create-invoice`;
    axios.post(`${url}`, data).then(function(response) {
      if (response.data.status) {
        dispatch({
          type: CREATE_INOVICE,
          payload: response.data.data
        });
        //window.location.href = "/dashboard";
      } else {
        toastr.error("Please try again! ");
      }
    });
  };
};

export const getInvoiceById = invoice_id => {
  return (dispatch, getState) => {
    const data = {
      invoice_id: invoice_id
    };
    const url = `/invoice/get-invoice-by-id`;
    axios.post(`${url}`, data).then(function(response) {
      if (response.data.status) {
        dispatch({
          type: GET_INVOICE_BY_ID,
          payload: response.data.data
        });
        //window.location.href="/dashboard";
      } else {
        //console.log("err:", response);
      }
    });
  };
};

export const getInvoiceTotal = invoice_id => {
  return (dispatch, getState) => {
    const data = {
      invoice_id: invoice_id
    };
    const url = `/invoice/get-invoice-total`;
    axios.post(`${url}`, data).then(function(response) {
      if (response.data.status) {
        dispatch({
          type: GET_INVOICE_TOTAL,
          payload: response.data.data
        });
        //window.location.href="/dashboard";
      } else {
        //console.log("err:", response);
      }
    });
  };
};
