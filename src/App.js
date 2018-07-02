import React, { Component } from 'react';
import { Route, Switch } from 'react-router'; // react-router v4
import { ConnectedRouter } from 'connected-react-router';
import { history } from './index';
import Home from './components/Home';
import Toast from './components/Toast';

class App extends Component {
  render() {
    return (
        <ConnectedRouter history={history}>
          <div>
            <Switch>
              <Route path="/" component={Home} />
            </Switch>
            <Toast />
          </div>
        </ConnectedRouter>
    );
  }
}

export default App;
