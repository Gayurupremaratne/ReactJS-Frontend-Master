import { CREATE_INOVICE } from "../actions/invoice";


export default function(state = null, action) {
  switch (action.type) {
    case CREATE_INOVICE:
      return action.payload;
    default:
      return state;
  }
}
