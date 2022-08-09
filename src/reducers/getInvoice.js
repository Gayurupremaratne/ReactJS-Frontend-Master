import { GET_INVOICE_BY_ID } from "../actions/invoice";


export default function(state = null, action) {
  switch (action.type) {
    case GET_INVOICE_BY_ID:
      return action.payload;
    default:
      return state;
  }
}
