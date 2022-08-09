import { PUBLISHERS_ALL } from "../actions/publishers";

export default function(state = null, action) {
  switch (action.type) {
    case PUBLISHERS_ALL:
      return action.payload;  
    default:
      return state;
  }
}
