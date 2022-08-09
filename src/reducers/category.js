import { CATEGORY_FETCH, CATEGORIES_LIST, CATEGORY_CREATE, CATEGORY_DELETE, CATEGORY_VIEW } from "../actions/categories";


export default function(state = null, action) {
  switch (action.type) {
    case CATEGORY_FETCH:
      return action.payload;
      // case CATEGORY_CREATE:
        //return action.payload;
      case CATEGORY_DELETE:
        return action.payload;
        case CATEGORIES_LIST:
        return action.payload;
        case CATEGORY_VIEW:
          console.log('zzz',action.payload)
        return action.payload;
       
    default:
      return state;
  }
}
