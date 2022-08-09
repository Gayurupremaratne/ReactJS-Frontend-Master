import { PUBLISHER_FETCH, PUBLISHERS_LIST, PUBLISHERS_FILTER } from "../actions/publishers";

export default function (state = null, action) {
  switch (action.type) {
    case PUBLISHER_FETCH:
      return action.payload;
    case PUBLISHERS_LIST:
      return action.payload;

    default:
      return state;
  }
}
