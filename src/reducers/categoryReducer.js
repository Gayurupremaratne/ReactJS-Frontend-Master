import { FETCH_CATEGORY } from "../actions/category";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_CATEGORY:
      //console.log("%%%%%%",action.payload)
      return action.payload;
    default:
      return state;
  }
}