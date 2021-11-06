import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import * as AppActions from './actions/AppActions';
import configureStore from './utils/configureStore';
import Routes from './Routes';

export default class Application {
  start() {
    this.startRedux();
    this.startRouter();
  }

  startRedux() {
    this.store = configureStore();
    this.store.dispatch(AppActions.startApp());
  }

  startRouter() {
    const history = createBrowserHistory();
    render(
      <Provider store={this.store}>
        <Router history={history}>{Routes}</Router>
      </Provider>,
      document.getElementById('root')
    );
  }
}
