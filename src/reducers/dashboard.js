import { DRAFT_ARTICLE_PUBLISHER_FETCH } from "../actions/articlesActions";

export default function(state = [], action) {
  switch (action.type) {
    case DRAFT_ARTICLE_PUBLISHER_FETCH:
      return action.payload;

    default:
      return state;
  }
}