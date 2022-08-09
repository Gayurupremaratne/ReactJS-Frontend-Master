import axios from "axios";
import { BASE_URL } from "../config/globals";
import { toastr } from "react-redux-toastr";
axios.defaults.baseURL = BASE_URL;

export const PUBLISHERS_FETCH = "PUBLISHER_FETCH";
export const PUBLISHERS_LIST = "PUBLISHERS_LIST"; // view all available publishers
export const PUBLISHER_GET = "PUBLISHER_GET";
export const PUBLISHER_PRICE = "PUBLISHER_PRICE";
export const PUBLISHER_FETCH = "ARTICLE_FETCH";
export const DELETE_PUBLISHER = "DELETE_PUBLISHER";
export const UPDATE_PUBLISHER = "UPDATE_PUBLISHER";
export const PUBLISHERS_ALL = "PUBLISHERS_ALL";
export const PUBLISHERS_PRICE = "PUBLISHERS_PRICE";
export const PUBLISHERS_PRICE_RESET = "PUBLISHERS_PRICE_RESET";
export const TOTAL_PRICE = "TOTAL_PRICE";
export const CART_PUBLISHERS = "CART_PUBLISHERS";
export const CREATE_PUBLISHER = "CREATE_PUBLISHER";

//Pending articles
export const getpublishers = props => {
  return (dispatch) => {
    const url = `/publisher/list`;
    axios.get(`${url}`).then(({ data }) => {
      dispatch({ type: PUBLISHER_FETCH, payload: data.data });
    });
  };
};

// list all available publishers
export const getPublisherList = props => {
  return (dispatch) => {
    const url = `/allPublisher/list`;
    axios.get(`${url}`).then(({ data }) => {
      dispatch({ type: PUBLISHERS_LIST, payload: data.data });
    });
  };
};

//delete publisher
export const deletepublisher = props => {
  return (dispatch, getState) => {
    const url = `/publisher/status/${props}`;
    axios.put(`${url}`, { status: 0 }).then(({ data }) => {
      if (data.status) {
        toastr.success("Success", " Successfully deleted!");
        console.log(data);
      } else {
        toastr.error("We are sorry", "Something went wrong");
      }
      dispatch({ type: DELETE_PUBLISHER, payload: data.status });
    });
  };
};

export const listpublisher = data => {
  return (dispatch) => {
    const url = `/publisher/${data}`;
    axios.get(`${url}`).then(({ data }) => {
      dispatch({ type: PUBLISHER_PRICE, payload: data.data });
    });
  };
};

export const getAllPublishers = props => {
  return (dispatch, getState) => {
    const url = `publisher/get-all-publishers`;
    axios.get(`${url}`).then(function(response) {
      if (response.data.status) {
        dispatch({
          type: PUBLISHERS_ALL,
          payload: response.data.data
        });
      } else {
      }
    });
  };
};

export const getPrice = (publishers, category) => {
  return (dispatch, getState) => {
    const data = {
      publisher_id: publishers,
      category_id: 0
    };

    const url = `/invoice/get-invoice/`;
    axios.post(`${url}`, data).then(function(response) {
      if (response.data.status) {
        dispatch({
          type: PUBLISHERS_PRICE,
          payload: response.data.data
        });
      } else {
        dispatch({
          type: PUBLISHERS_PRICE_RESET,
          payload: ""
        });
      }
    });
  };
};

//view publisher list
export const getPublishers = props => {
  return (dispatch, getState) => {
    const url = `/publisher/list`;
    axios.get(`${url}`).then(({ data }) => {
      dispatch({ type: PUBLISHER_FETCH, payload: data.data });
    });
  };
};

export const getTotalPrice = (publishers, category) => {
  return (dispatch, getState) => {
    const data = {
      publisher_id: publishers,
      category_id: category
    };

    const url = `/publisher/get-total`;
    axios.post(`${url}`, data).then(function(response) {
      if (response.data.status) {
        dispatch({
          type: TOTAL_PRICE,
          payload: response.data.data
        });
      } else {
        toastr.error("We are sorry", "Something went wrong");
      }
    });
  };
};

//update publisher list
export const editPublishers = (email, id) => {
  console.log("email->", email);
  console.log("id->", id);

  return (dispatch) => {
    const url = `/publisher/update/${id}`;
    axios.put(`${url}`, { email: email }).then(({ data }) => {
      if (data.status) {
        toastr.success("Success", "Successfully updated");
        window.location.href = "/publisher";
      } else {
        toastr.error("We are sorry", "Something went wrong");
      }
      dispatch({ type: UPDATE_PUBLISHER, payload: data.status });
    });
  };
};

//create a publisher
export const createpublisher = props => {
  return (dispatch, getState) => {
    const url = `/publisher/create`;
    axios.post(`${url}`, props).then(({ data }) => {
      if (data.status) {
        toastr.success("Success", "Successfully created");
        window.location.href = "/create-publisher";
      } else {
        toastr.error("We are sorry", "Something went wrong");
      }
      dispatch({ type: CREATE_PUBLISHER, payload: data });
    });
  };
};

export const getCart = pub_id => {
  return (dispatch, getState) => {
    let publishers = [];
    localStorage.getItem("publishers") &&
      (publishers = JSON.parse(localStorage.getItem("publishers")));

    var pub_length = publishers.length;
    pub_length = pub_length;

    dispatch({
      type: CART_PUBLISHERS,
      payload: publishers
    });
  };
};

export const addToCart = (pub_id, publisher_id, cat_id) => {
  return (dispatch, getState) => {
    let publishers = [];
    let publisher_ids = [];
    var cats_id = "";
    localStorage.getItem("publishers") &&
      (publishers = JSON.parse(localStorage.getItem("publishers")));
    localStorage.getItem("publisher_ids") &&
      (publisher_ids = JSON.parse(localStorage.getItem("publisher_ids")));
    localStorage.getItem("cats_id") &&
      (cats_id = JSON.parse(localStorage.getItem("cats_id")));

    var pub_length = publishers.length;
    pub_length = pub_length;

    if (pub_id) {
      if (cats_id) {
        if (cat_id === cats_id) {
          if (publishers.indexOf(pub_id) === -1) {
            publishers.push(pub_id);

            toastr.success(
              "Publisher added to the cart, please click submit to proceed"
            );
          }

          if (publisher_ids.indexOf(publisher_id) === -1) {
            publisher_ids.push(publisher_id);
          } else {
            toastr.warning("Publisher is already added to the cart");
          }
        } else {
          toastr.error("you can only add publishers in same category");
        }
      } else {
        if (publishers.indexOf(pub_id) === -1) {
          publishers.push(pub_id);
          toastr.success(
            "Publisher added to the cart, please click submit to proceed"
          );
        }

        if (publisher_ids.indexOf(publisher_id) === -1) {
          publisher_ids.push(publisher_id);
        }
        localStorage.setItem("cats_id", cat_id);
      }
    } else {
    }
    localStorage.setItem("publishers", JSON.stringify(publishers));
    localStorage.setItem("publisher_ids", JSON.stringify(publisher_ids));

    dispatch({
      type: CART_PUBLISHERS,
      payload: publishers
    });
  };
};

export const removeFromCart = (event, publisher_id) => {
  var publishers = [];
  let publisher_ids = [];
  localStorage.getItem("publishers") &&
    (publishers = JSON.parse(localStorage.getItem("publishers")));
  localStorage.getItem("publisher_ids") &&
    (publisher_ids = JSON.parse(localStorage.getItem("publisher_ids")));

  return (dispatch, getState) => {
    if (event !== null && event !== undefined) {
      publishers.map((publisher, index) => {
        if (publishers[index] == event) {
          publishers.splice(index, 1);
        }
      });

      publisher_ids &&
        publisher_ids.map((publishers, index) => {
          if (publisher_ids[index] == publisher_id) {
            publisher_ids.splice(index, 1);
          }
        });
    }
    dispatch({ type: CART_PUBLISHERS, payload: publishers });
    localStorage.setItem("publishers", JSON.stringify(publishers));
    localStorage.setItem("publisher_ids", JSON.stringify(publisher_ids));

    if (publisher_ids.length == 0) {
      localStorage.removeItem("cats_id");
    }
  };
};
