import { USER_LOGGED_IN, USER_LOGGED_OUT, ERROR_MESSAGE } from "../actions/";

export default function(state = null, action) {
  localStorage.getItem("access_token");
  localStorage.getItem("refresh_token");
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.payload;
    case USER_LOGGED_OUT:
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("publisher name:");
   
      return localStorage.getItem("access_token", "refresh_token");
    case ERROR_MESSAGE:
      return action.payload;

    default:
      return state;
  }
}
