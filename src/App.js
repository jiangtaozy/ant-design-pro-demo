import React, { Component } from 'react';
import { Route, Switch } from 'react-router'; // react-router v4
import { ConnectedRouter } from 'connected-react-router';
import { history } from './index';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
        <ConnectedRouter history={history}>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route render={() => (<div>Miss</div>)} />
            </Switch>
          </div>
        </ConnectedRouter>
    );
  }
}

export default App;
