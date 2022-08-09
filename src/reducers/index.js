import { combineReducers } from "redux";
import { reducer as form } from 'redux-form';
import { reducer as toastr } from 'react-redux-toastr';
import user from "./user";
import somedata from "./somedata";
import articleReducer from "./article";
import publisher from "./publisherReducer";
import category from "./categoryReducer";
import language from "./languageReducer";
import publisherReducer from "./publisher";
import publishers from "./publisher";
import categoryReducer from "./category";
import categories from "./category";
import languageReducer from "./language";
import priceReducer from "./prices";
import draftReducer from "./draft";
import languagePublisherReducer from "./languagePublisher";
import publisherAllReducer from "./publisherAll";
import publisherPrice from "./publisherPrice";
import totalPriceReducer from "./totalPrice";
import pubdelete from './pubReducer';
import draftPublisher from './dashboard'
import createpub from "./pubReducer";
import getInvoiceReducer from "./getInvoice";
import getInvoiceTotalReducer from "./getInvoiceTotal";
import { dialogReducer } from 'redux-reactstrap-modal';
import cartReducer from './cartReducer';
import createInvoice from "./createInvoice";

const rootReducer = combineReducers({
    dialogReducer,
    user,
    somedata,
    form,
    toastr,
    publisher,
    category,
    language,
    publishers,
    categories,
    language_publishers:languagePublisherReducer,
    articles:articleReducer,
    publishers: publisherReducer,
    categories:categoryReducer,
    languages:languageReducer,
    prices: priceReducer,
    draft_articles: draftReducer,
    publisherAll : publisherAllReducer,
    publisherPrice : publisherPrice,
    totalPrice : totalPriceReducer,
    article_list: articleReducer,
    pubdelete,
    pubupdate: publisherReducer,
    createpub,
    invoiceById : getInvoiceReducer,
    invoiceTotal : getInvoiceTotalReducer,
    publisherCart : cartReducer,
    create_invoice: createInvoice,
    draftPublisher
});

export default rootReducer;
