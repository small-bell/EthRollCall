require('babel-polyfill');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route} from 'react-router-dom';

import App from './components/Main';
import "antd/dist/antd.css";

import LoginComponent from './components/login/LoginComponent';
import AdminComponent from './components/admin/AdminComponent';
import DoRollCallComponent from './components/rollcall/DoRollCallComponent';
import TestComponent from './components/test/TestComponent';

ReactDOM.render(
<HashRouter>
  <Switch>
    <Route path="/test" component={TestComponent}/>
    <Route path="/rollCall" component={DoRollCallComponent}></Route>
    <Route path="/admin" component={AdminComponent}/>
    <Route path="/login" component={LoginComponent}/>
    <Route component={App}></Route>
  </Switch>
</HashRouter>, document.getElementById('app'));
