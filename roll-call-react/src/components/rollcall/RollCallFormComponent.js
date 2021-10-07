'use strict';

import React from 'react';

require('styles/rollcall/RollCallForm.css');


import {
  Form, 
  Icon, 
  Input, 
  Button
} from 'antd';

class RollCallFormComponent extends React.Component {

  state = {
    id: "",
    name: ""
  }

  componentWillMount() {
    let myStateId = localStorage.getItem("id");
    let myStateName = localStorage.getItem("name");
    
    if (myStateId && myStateId != 'undefined') {
      this.setState({
        id: myStateId,
        name: myStateName
      });
    }
  }

  handleUpdate = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log(err);
      }
    });
    let fieldId = this.props.form.getFieldValue("id");
    let fieldName = this.props.form.getFieldValue("name");
    this.setState({
      id: fieldId,
      name: fieldName
    });
    localStorage.setItem("id", fieldId);
    localStorage.setItem("name", fieldName);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="rollcallform-component">
        <div>
          你的学号：{this.state.id}<br/>
          你的姓名：{this.state.name}
        </div>
        <Form onSubmit={this.handleUpdate}>
          <Form.Item>
            {getFieldDecorator('id', {
              rules: [{ required: true, message: '请输入学号!' }],
            })(
              <Input
                prefix={<Icon type="user" 
                style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="id"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入姓名!' }],
            })(
              <Input
                prefix={<Icon type="user" 
                style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="name"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              UPDATE
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

RollCallFormComponent.displayName = 'RollcallRollCallFormComponent';

const WrappedRollCallFormComponent = 
  Form.create({ name: 'roll_call_form_component' })
  (RollCallFormComponent);


export default WrappedRollCallFormComponent;
