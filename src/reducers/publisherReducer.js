import {
  PUBLISHERS_FETCH,
  PUBLISHER_GET,
  PUBLISHER_PRICE,
  UPDATE_PUBLISHER
} from "../actions/publishers";

export default function(state = null, action) {
  switch (action.type) {
    case PUBLISHERS_FETCH:
      return action.payload;
    case PUBLISHER_GET:
      return action.payload;
    case PUBLISHER_PRICE:
      return action.payload;
    case UPDATE_PUBLISHER:
      return action.payload;
    default:
      return state;
  }
}
