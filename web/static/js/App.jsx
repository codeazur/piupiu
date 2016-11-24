import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Main from './containers/Main';
import RegistrationsNew from './views/RegistrationsNew';
import store from './store';

const history = syncHistoryWithStore(browserHistory, store);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route component={Main}>
                        <Route path="/" component={RegistrationsNew} />
                    </Route>
                </Router>
            </Provider>
        );
    }
}
