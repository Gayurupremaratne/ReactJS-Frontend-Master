import { DRAFT_ARTICLE_FETCH } from "../actions/articlesActions";
import _ from "lodash";
export default function(state = [], action) {
  switch (action.type) {
    case DRAFT_ARTICLE_FETCH:
      return [..._.uniqBy(action.payload, "article_id")];
    default:
      return state;
  }
}
