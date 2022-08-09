import { FILTEREDLIST } from "../actions/articlesActions";

export default function(state = [], action) {
  switch (action.type) {
    case FILTEREDLIST:
      return action.payload;

    default:
      return state;
  }
}