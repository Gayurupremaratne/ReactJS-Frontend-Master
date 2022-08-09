import { CART_PUBLISHERS } from "../actions/publishers";

export default function(state = null, action) {
  switch (action.type) {
    case CART_PUBLISHERS:
      return action.payload;
    default:
      return state;
  }
}
