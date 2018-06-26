import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { Provider } from 'react-redux';

export const history = createBrowserHistory();

// default reducer
const rootReducer = (state = 0, action) => {
  return state;
}

const store = createStore(
  connectRouter(history)(rootReducer), // new root reducer with router state
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      // ... other middlewares ...
    ),
  ),
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));

registerServiceWorker();
