import { TOTAL_PRICE } from "../actions/publishers";


export default function(state = null, action) {
  switch (action.type) {
    case TOTAL_PRICE:
      return action.payload;
    default:
      return state;
  }
}