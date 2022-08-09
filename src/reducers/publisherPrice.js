import { PUBLISHERS_PRICE, PUBLISHERS_PRICE_RESET } from "../actions/publishers";

export default function(state = null, action) {
  switch (action.type) {
    case PUBLISHERS_PRICE:
      return action.payload;
    case PUBLISHERS_PRICE_RESET:
      return null;    
    default:
      return state;
  }
}
