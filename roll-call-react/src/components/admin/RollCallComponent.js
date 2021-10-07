'use strict';

import React from 'react';

require('styles/admin/RollCall.css');

import Moment from 'moment';

import {
  Form, 
  Icon, 
  Input, 
  Button, 
  List, 
  Typography,
  Modal
} from 'antd';

import {
  publishRollCall,
  selectRollCall
} from '../../api/index';

class RollCallComponent extends React.Component {

  state = {
    message: '',
    data: [
      
    ],
    visibleSuccess: false,
    visibleFail: false,
    modelMessage: "发布成功"
  };

  // 显示弹窗
  showSuccessModal = () => {
    this.setState({
      visibleSuccess: true,
    });
  };

  showFailModal = () => {
    this.setState({
      visibleFail: true,
    });
  }

  // 弹窗确认
  handleOk = e => {
    this.setState({
      visibleFail: false,
    });
    this.setState({
      visibleSuccess: false,
    });
  };

  // 弹窗取消
  handleCancel = e => {
    this.setState({
      visibleFail: false,
    });
    this.setState({
      visibleSuccess: false,
    });
  };

  componentWillMount() {
    selectRollCall().then((res) => {
      let tableData = [];
      res.data.data.forEach((content) => {
        let time = Moment(new Date(content.expireTime))
          .format('YYYY-MM-DD HH:mm:ss')
        tableData.push('截止时间' + time + 
          ' , 签到提示：' + content.comment);
      })

      if (res.data.code == 200) {
        this.setState({
          data: tableData
        });
      }
    })
  }

  handleSubmit = (e) => {
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
    this.state.message = this.props.form.getFieldValue("message");
    let _that = this;
    publishRollCall({
      message: _that.state.message
    }).then((res) => {
      if (res.data.code == 200) {
        this.showSuccessModal();
      } else {
        this.showFailModal();
      }
    });
  }


  render() {

    const { getFieldDecorator } = this.props.form;

    return (
      <div className="rollcall-component">
        <Modal
          title="发布成功"
          visible={this.state.visibleSuccess}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>发布签到成功</div>
        </Modal>

        <Modal
          title="发布失败"
          visible={this.state.visibleFail}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>发布签到失败</div>
        </Modal>
        <div>
          在下方输入发布信息
        </div>

        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('message', {
              rules: [{ required: false, message: 'Please input message!' }],
            })(
              <Input
                prefix={<Icon type="user" 
                style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="input your message" 
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              PUBLISH
            </Button>
          </Form.Item>
        </Form>
        <div>
          <List
            header={<div>正在进行的签到:</div>}
            footer={<div></div>}
            bordered
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item>
                <Typography.Text mark>[签到]</Typography.Text> {item}
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

RollCallComponent.displayName = 'AdminRollCallComponent';

const WrappedRollCallComponent = 
  Form.create({ name: 'roll_call_component' })(RollCallComponent);


export default WrappedRollCallComponent;
