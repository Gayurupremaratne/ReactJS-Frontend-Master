import { FETCH_LANGUAGE} from "../actions/language";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_LANGUAGE:
      //console.log("%%%%%%",action.payload)
      //console.log("Languages reducer: ",action.payload)
      return action.payload;
    default:
      return state;
  }
}