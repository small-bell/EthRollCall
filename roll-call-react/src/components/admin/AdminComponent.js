'use strict';

import React from 'react';

require('styles/admin/Admin.css');

import { 
  Button,
  Tabs,
} from 'antd';

const { TabPane } = Tabs;

import RecordComponent from './RecordComponent';
import WrappedRollCallComponent from './RollCallComponent';
import StudentComponent from './StudentComponent';




class AdminComponent extends React.Component {
  render() {
    return (
      <div className="admin-component">
        <Tabs defaultActiveKey="2">
          <TabPane tab="发布签到" key="1">
            <WrappedRollCallComponent></WrappedRollCallComponent>
          </TabPane>
          <TabPane tab="学生管理" key="2">
            <StudentComponent></StudentComponent>
          </TabPane>
          <TabPane tab="查询记录" key="3">
            <RecordComponent></RecordComponent>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

AdminComponent.displayName = 'AdminAdminComponent';

// Uncomment properties you need
// AdminComponent.propTypes = {};
// AdminComponent.defaultProps = {};

export default AdminComponent;
