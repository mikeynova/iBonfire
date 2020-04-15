
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute, hashHistory, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './public/reducers/index';

import App from './public/components/App';
import Login from './public/components/FBLogin';
import Home from './public/components/Home';
import ChatPage from './public/components/ChatPage';
import About from './public/components/About';

import InitFB from './public/components/auth/InitFB';

const history = createBrowserHistory();
const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
export const store = createStoreWithMiddleWare(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f);

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/about" component={About} />
      <Switch>
        <Route path="/" component={InitFB(App)} />
        <Route path="login" component={InitFB(Login)} />
        <Route path="chats/:bonId" component={InitFB(ChatPage)} />
      </Switch>
    </Router>
  </Provider>
)

if (module.hot) {
  module.hot.accept(router, () => {
    render(render(router, document.getElementById('app')))
  })
}

render(
  router, document.getElementById('app')
);
