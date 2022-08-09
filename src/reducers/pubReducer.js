import { DELETE_PUBLISHER, CREATE_PUBLISHER } from "../actions/publishers";

export default function(state = null, action) {
  switch (action.type) {
    case DELETE_PUBLISHER:
      console.log(action.payload);
      return action.payload;
      case CREATE_PUBLISHER:
          console.log("create reducer", action.payload);
          return action.payload;
    default:
      return state;
  }
}
