'use strict';

import React from 'react';

require('styles/admin/Record.css');

import {
  Form, 
  Icon, 
  Input, 
  Button, 
  List, 
  Alert,
  Table,
  Typography
} from 'antd';

import {
  selectRecordDate,
  selectAbsenceRecord,
  selectRecord,
} from '../../api/index';

import Moment from 'moment';

const columns = [
  {
    title: '学号',
    dataIndex: 'id',
    defaultSortOrder: 'descend',
    sorter: (a, b) =>  parseInt(b.id) - parseInt(a.id)
  },
  {
    title: '姓名',
    dataIndex: 'name',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.name - b.name,
  },
  {
    title: '时间',
    dataIndex: 'date',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.date - b.date,
  },
];


class RecordComponent extends React.Component {

  state = {
    absData: [
      
    ],
    inData: [
      
    ],
    listData: [
      
    ]
  };

  componentWillMount() {
    selectRecordDate().then((res) => {
      let resultData = [];
      res.data.data.forEach((content) => {
        let resultTmpData = Moment(new Date(content.date))
          .format('YYYY年MM月DD日 HH:mm:ss');
        resultData.push({
          date: content.date,
          contentStr: resultTmpData
        });
      })
      this.setState({
        listData: resultData
      })
    })
  }

  handleClick = (item) => {
    selectAbsenceRecord({
      date: item.date
    }).then((res) => {
      let rows = res.data.data.rows;
      let absData = [];
      for (let i = 0; i < rows.length; i++) {
        let tmpData = {};
        tmpData.key = i + 1;
        tmpData.id = rows[i].id;
        tmpData.name = rows[i].name;
        tmpData.date = Moment(new Date(item.date))
        .format('YYYY年MM月DD日 HH:mm:ss');
        absData.push(tmpData);
      }
      this.setState({
        absData: absData
      });
    });
    selectRecord({
      date: item.date
    }).then((res) => {
      let rows = res.data.data;
      let inData = [];
      for (let i = 0; i < rows.length; i++) {
        let tmpData = {};
        tmpData.key = i + 1;
        tmpData.id = rows[i].number;
        tmpData.name = rows[i].name;
        tmpData.date = Moment(new Date(item.date))
          .format('YYYY年MM月DD日 HH:mm:ss');
        inData.push(tmpData);
      }
      this.setState({
        inData: inData
      });
    });
  }

  render() {
    return (
      <div className="record-component">
        <List
          header={
          <div>
            <div>已结束的签到:</div>  
          </div>
          }
          footer={<div></div>}
          bordered
          dataSource={this.state.listData}
          renderItem={item => (
            <List.Item>
              <Typography.Text mark>
                <Button type="primary" 
                  onClick={this.handleClick.bind(this, item)}>查询结果</Button>
              </Typography.Text> 
              {item.contentStr}发布的签到
            </List.Item>
          )}
        />

        <Alert message="这次签到的缺席学生：" type="info" />

        <Table 
          columns={columns} 
          dataSource={this.state.absData}/>

        <Alert message="这次签到的未缺席学生：" type="info" />

        <Table 
          columns={columns} 
          dataSource={this.state.inData}/>
      </div>
    );
  }
}

RecordComponent.displayName = 'AdminRecordComponent';


export default RecordComponent;
