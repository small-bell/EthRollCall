'use strict';

import React from 'react';

require('styles/admin/student/AddStudentForm.css');

import {
  Form, 
  Icon, 
  Input, 
  Button, 
  Checkbox,
  Modal
} from 'antd';

import {
  addStudent,
  deleteStudent,
  updateStudent
} from '../../../api/index';


class AddStudentFormComponent extends React.Component {

  state = {
    id: 1,
    name: '',
    classes: 1,
    teacher: 1,
    visible: false,
  }

  setComponentState = () => {
    this.state.id = this.props.form.getFieldValue("id");
    this.state.name = this.props.form.getFieldValue("name");
    this.state.classes = this.props.form.getFieldValue("classes");
    this.state.teacher = this.props.form.getFieldValue("teacher");
  }

  validateState = () => {
    let validated = true;
    this.props.form.validateFields((err, values) => {
      if (err) {
        validated = false;
      }
    });
    return validated;
  }

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

  handleAddStudent = (e) => {
    e.preventDefault();
    if (!this.validateState()) {
      return;
    }
    this.setComponentState();
    addStudent(this.state).then((res) => {
      let data = res.data;
      if (data.code == 200) {
        this.showModal();
      }
    })
  }
  
  handleDeleteStudent = (e) => {
    e.preventDefault();
    if (!this.validateState()) {
      return;
    }
    this.setComponentState();
    deleteStudent({
      id: this.state.id
    }).then((res) => {
      let data = res.data;
      if (data.code == 200) {
        this.showModal();
      }
    })
  }
  
  handleUpdateStudent = (e) => {
    e.preventDefault();
    if (!this.validateState()) {
      return;
    }
    this.setComponentState();
    updateStudent(this.state)
      .then((res) => {
        let data = res.data;
        if (data.code == 200) {
          this.showModal();
        }
      })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="addstudentform-component">
        <Modal
          title="操作成功"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>操作成功</div>
        </Modal>
        <Form>
          <Form.Item>
            {getFieldDecorator('id', {
              rules: [{ required: true, message: '请输入学生学号!' }],
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
              rules: [{ required: true, message: '输入学生姓名!' }],
            })(
              <Input
                prefix={<Icon type="user" 
                style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="name"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('classes', {
              rules: [{ required: true, message: '输入学生班级!' }],
            })(
              <Input
                prefix={<Icon type="user" 
                style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="classes"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('teacher', {
              rules: [{ required: true, message: '输入老师姓名或id!' }],
            })(
              <Input
                prefix={<Icon type="user" 
                style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="teacher"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              onClick={this.handleAddStudent}>
              ADD
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              onClick={this.handleDeleteStudent}>
              DELETE
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              onClick={this.handleUpdateStudent}>
              MODIFY
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

AddStudentFormComponent.displayName = 'AdminStudentAddStudentFormComponent';

const WrappedAddStudentFormComponent = 
  Form.create({ name: 'add_student_form_component' })
  (AddStudentFormComponent);

export default WrappedAddStudentFormComponent;
