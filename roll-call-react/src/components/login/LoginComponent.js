'use strict';

import React from 'react';

require('styles/login/Login.css');

import WrappedLoginForm from './LoginFormComponent';

class LoginComponent extends React.Component {

  render() {
    return (
      <div className="login-component">
        <WrappedLoginForm></WrappedLoginForm>
      </div>
    );
  }
}

LoginComponent.displayName = 'LoginLoginComponent';

// Uncomment properties you need
// LoginComponent.propTypes = {};
// LoginComponent.defaultProps = {};

export default LoginComponent;
