'use strict';

import React from 'react';

require('styles/rollcall/DoRollCall.css');

import WrappedRollCallFormComponent from './RollCallFormComponent';

import {
  addRecord,
  selectRollCall,
} from '../../api/index';

import Moment from 'moment';

import {
  List,
  Typography,
  Button,
  Modal
} from 'antd';

class DoRollCallComponent extends React.Component {

  state = {
    data: [
      
    ],
    visible: false,
    message: '签到成功'
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

  componentWillMount() {
    selectRollCall().then((res) => {
      let tableData = [];
      res.data.data.forEach((content) => {
        let time = Moment(new Date(content.expireTime))
          .format('YYYY-MM-DD HH:mm:ss')
        
        let date = content.date;
        let timeContent = '截止时间' + time + 
          ' , 签到提示：' + content.comment
        tableData.push({
          date,
          content: timeContent
        });
      })

      if (res.data.code == 200) {
        this.setState({
          data: tableData
        });
      }
    })
  }

  doRollCall = (item) => {
    let date = item.date;

    let id = localStorage.getItem("id");
    let name = localStorage.getItem("name");
    addRecord({
      date: date,
      number: id,
      absences: 1
    }).then((res) => {
      let data = res.data;
      if (data.code == 500) {
        // TODO 签到过了
        this.setState({
          message: "您已经签到过了"
        });
        this.showModal();
      } else if (data.code == 200) {
        // TODO 签到成功
        this.setState({
          message: "签到成功"
        });
        this.showModal();
      } else if (data.code == 404) {
        this.setState({
          message: "查无此人"
        });
        this.showModal();
      } else {
        this.setState({
          message: "输入出错"
        });
        this.showModal();
      }
    })
  }

  render() {
    return (
      <div className="dorollcall-component">
        <Modal
          title="签到消息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>{this.state.message}</div>
        </Modal>
        <WrappedRollCallFormComponent></WrappedRollCallFormComponent>
        <List
            header={
            <div>
              <div>正在进行的签到:</div>  
            </div>
            }
            footer={<div></div>}
            bordered
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item>
                <Typography.Text mark>
                  <Button type="primary" onClick={this.doRollCall.bind(this, item)}>签到</Button>
                </Typography.Text> 
                {item.content}
              </List.Item>
            )}
          />
      </div>
    );
  }
}

DoRollCallComponent.displayName = 'RollcallDoRollCallComponent';

// Uncomment properties you need
// DoRollCallComponent.propTypes = {};
// DoRollCallComponent.defaultProps = {};

export default DoRollCallComponent;
