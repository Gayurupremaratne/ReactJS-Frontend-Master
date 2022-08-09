import './scss/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";

import reducers from './reducers';
import App from './containers/App';
import EditEmailModal from './containers/modals/EditEmailModal';
import TableModal from './containers/modals/TableModal';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(
            thunk
        )
    )
);

ReactDOM.render(

    <Provider store={store}>
        <div>
        <App />
        <EditEmailModal/>
        <TableModal/>
        </div>
        


        
    </Provider>, document.getElementById('root'));

export default store;