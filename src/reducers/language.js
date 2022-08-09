import { LANGUAGE_FETCH } from "../actions/languages";


export default function(state = null, action) {
  switch (action.type) {
    case LANGUAGE_FETCH:
      return action.payload;
    default:
      return state;
  }
}
