'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {login} from '../../redux/actions';

require('styles/login/Login.css');

class LoginComponent extends React.Component {

  state = {
    username: '',
    password: ''
  };

  login = () => {
    console.log(this.state)
    this.props.login(this.state)
  };

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    });
  };

  componentWillMount() {
    this.handleChange("username", "123456");
    this.handleChange("password", "123456");
  }

  render() {
    const {msg, redirectTo} = this.props.user

    console.log('message:' + msg);
    console.log('redirectTo:' + redirectTo);
    
    return (
      <div className="login-component">
        <button onClick={this.login}>run</button>
      </div>
    );
  }
}

LoginComponent.displayName = 'LoginLoginComponent';

// Uncomment properties you need
// LoginComponent.propTypes = {};
// LoginComponent.defaultProps = {};

export default connect(
  state => ({user: state.user}),
  {login}
)(LoginComponent);
