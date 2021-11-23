import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css"
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { getUsers } from './actions/users.action';

const rootNode = document.getElementById('root');
const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
)
store.dispatch(getUsers())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootNode
);

