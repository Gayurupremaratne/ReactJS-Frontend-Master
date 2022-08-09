import { GET_INVOICE_TOTAL } from "../actions/invoice";

export default function(state = null, action) {
  switch (action.type) {
    case GET_INVOICE_TOTAL:
      return action.payload;
    default:
      return state;
  }
}
