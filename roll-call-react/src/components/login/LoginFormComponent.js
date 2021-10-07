'use strict';

import React from 'react';
import { withRouter } from 'react-router-dom';

import {login} from '../../api/index';

require('styles/login/LoginForm.css');

import {
  Form, 
  Icon, 
  Input, 
  Button, 
  Checkbox,
  Modal
} from 'antd';

class LoginFormComponent extends React.Component {

  state = {
    // 用户信息
    username: '',
    password: '',
    // 弹窗
    visible: false
  };

  // 显示弹窗
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // 弹窗确认
  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  // 弹窗取消
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  // 提交表单
  handleSubmit = e => {
    e.preventDefault();
    var validated = true;
    this.props.form.validateFields((err, values) => {
      if (err) {
        validated = false;
      }
    });
    if (!validated) {
      return;
    }
    this.state.username = this.props.form.getFieldValue("username")
    this.state.password = this.props.form.getFieldValue("password")
    let _that = this;
    login({
      username: this.state.username,
      password: this.state.password
    }).then((res) => {
      if (res.code == 200) {
        localStorage.setItem('token', res.token);
        _that.props.history.push('/admin');
      } else {
        this.showModal();
      }
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title="登录失败"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>发生错误，请重试！</div>
        </Modal>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" 
                style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username" 
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

LoginFormComponent.displayName = 'LoginLoginFormComponent';

const WrappedLoginForm = 
  Form.create({ name: 'login_form_component' })(LoginFormComponent);

export default withRouter(WrappedLoginForm);
// export default WrappedLoginForm;
