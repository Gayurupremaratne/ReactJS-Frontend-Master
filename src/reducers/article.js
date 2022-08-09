import { ARTICLE_FETCH } from "../actions/articlesActions";
import { ARTICLE_HISTORY_FETCH } from "../actions/articlesActions";
import { DRAFT_ARTICLE_FETCH } from "../actions/articlesActions";

import { ADD_ARTICLE } from "../actions/Advertiserarticles";
import { ADVERTISER_ARTICLE_HISTORY } from "../actions/articlesActions";




export default function(state = null, action) {
  switch (action.type) {
    case ARTICLE_FETCH:
      return action.payload;
    case ARTICLE_HISTORY_FETCH:
      return action.payload;
    case ADD_ARTICLE:
      return action.payload;
    case DRAFT_ARTICLE_FETCH:
      return action.payload;
    case ADVERTISER_ARTICLE_HISTORY:
      return action.payload;
    default:
      return state;
  }
}
