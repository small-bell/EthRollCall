'use strict';

import React from 'react';

require('styles/admin/student/StudentTable.css');

import { 
  Table 
} from 'antd';

import {selectAllStudent} from '../../../api/index';

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
    title: '班级编号',
    dataIndex: 'classes',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.classes - b.classes,
  },
  {
    title: '老师编号',
    dataIndex: 'teacher',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.teacher - b.teacher,
  }
];




class StudentTableComponent extends React.Component {

  state = {
    data: [
      
    ],
  }

  onChange = (pagination, filters, sorter, extra) => {

  }

  componentWillMount() {
    selectAllStudent().then((res) => {
      let rows = res.data.data;
      let data = [];
      for (let i = 0; i < rows.length; i++) {
        let tmpData = {};
        tmpData.key = i + 1;
        tmpData.id = rows[i].id;
        tmpData.name = rows[i].name;
        tmpData.classes = rows[i].classes;
        tmpData.teacher = rows[i].teacher;
        data.push(tmpData);
      }
      
      this.setState({
        data: data
      });
    })
  }

  render() {
    return (
      <div className="studenttable-component">
        <Table columns={columns} dataSource={this.state.data} onChange={this.onChange} />
      </div>
    );
  }
}

StudentTableComponent.displayName = 'AdminStudentStudentTableComponent';

// Uncomment properties you need
// StudentTableComponent.propTypes = {};
// StudentTableComponent.defaultProps = {};

export default StudentTableComponent;
