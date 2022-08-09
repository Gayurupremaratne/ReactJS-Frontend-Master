import { PRICE_FETCH, PRICE_LIST, PRICE_UPDATE } from "../actions/price";


export default function(state = null, action) {
  switch (action.type) {
    case PRICE_FETCH:
      return action.payload;
      case PRICE_LIST:
      return action.payload;
      // case PRICE_UPDATE:
      // return action.payload;
    default:
      return state;
  }
}
