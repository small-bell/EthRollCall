// require('babel-polyfill');
import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import {HashRouter, Switch, Route} from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './redux/store';

import LoginComponent from './components/login/LoginComponent';
import RollCallComponent from './components/rollcall/RollCallComponent';
import AdminComponent from './components/admin/AdminComponent';


ReactDOM.render(
<Provider store={store}>
  <HashRouter>
    <Switch>
      <Route path="/test" component={RollCallComponent}/>
      <Route path="/rollCall" component={RollCallComponent}/>
      <Route path="/admin" component={AdminComponent}/>
      <Route path="/login" component={LoginComponent}/>
      <Route component={App}></Route>
    </Switch>
  </HashRouter>
</Provider>, document.getElementById('app'));
