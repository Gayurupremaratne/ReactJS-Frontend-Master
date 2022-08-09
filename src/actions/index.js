import { toastr } from "react-redux-toastr";
import axios from "axios";

//const API_KEY='b1c098f717ce49a4a997c865ad61126f';
//const ROOT_URL=`https://a753baea-4098-4748-8a0b-bb6af9364f0c.mock.pstmn.io&${API_KEY}`;
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const ERROR_MESSAGE = "ERROR_MESSAGE";

let access_token = localStorage.getItem("access_token");
axios.defaults.headers.common["Authorization"] = access_token
  ? access_token.token
  : "";
axios.defaults.headers.common["Content-Type"] = "application/json";

export const login = props => {
 // const url = `http://3.228.100.114:8087/v1/login`;

   return dispatch => {
//     axios
//       .post(`${url}`, {
//         username: props.username,
//         password: props.password,
//         client: "Studio",
//         secret: "$tud!o"
//       })
//       .then(({ data }) => {
//         localStorage.setItem("access_token", data.access_token);
//         localStorage.setItem("refresh_token", data.refresh_token);
//         localStorage.setItem("username", props.username);
        
        dispatch({
          type: USER_LOGGED_IN,
          payload: { type: USER_LOGGED_IN, data: "username and password" }
        });
//       })
//       .catch(function (error) {
//         dispatch({
//           type: ERROR_MESSAGE,
//           payload: {
//             type: ERROR_MESSAGE,
//             message: "Invalid username or password"
//           }
//         });
//       });
   };
 };

export const checkUserLogin = () => {
  const token=localStorage.getItem("access_token");
  if(token)
    return true

    else
      return false;
}
//--API call to get the uuid of a current user
export const uiApicall = props => {
  const url = `http://192.168.3.142:8087/v1/users/current`;
  let access_token = localStorage.getItem("access_token");
  
  return (dispatch, getState) => {
    axios
      .get(`${url}`, {
        headers: {
          'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBwcnN0dWRpby5jb20iLCJhdWQiOlsicHJvZmlsZSIsInNlZ21lbnQiXSwiaXN1IjoiaHR0cDovL2lhbS1kZXYuYWRzdHVkaW8uY2xvdWQiLCJleHAiOjE1NzMwMzY3ODAsImp0aSI6IjkzMzhmODE1LTM2MjItNDE1Ni04NWE2LWM4ODA5ZDVmOGI0ZCIsImNpZCI6IlBSU3R1ZGlvIn0.QsBAQhuZZ5yReP-tXzoGpps9AcOdKq8r-9MAoxQFsGw'
        }
      })
      .then(({ data }) => {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("email", data.email);
        localStorage.setItem("username", data.username);
        console.log(data);

        dispatch({

        });
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
};

export const logout = props => {
  return (dispatch, getState) => {
    dispatch({
      type: USER_LOGGED_OUT,
      payload: null
    });
    window.location.href = "/login";
  };
};
