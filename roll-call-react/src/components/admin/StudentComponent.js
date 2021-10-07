'use strict';

import React from 'react';

require('styles/admin/Student.css');

import WrappedAddStudentFormComponent from './student/AddStudentFormComponent';
import StudentTableComponent from './student/StudentTableComponent.js';

class StudentComponent extends React.Component {
  render() {
    return (
      <div className="student-component">
        <WrappedAddStudentFormComponent></WrappedAddStudentFormComponent>
        <StudentTableComponent></StudentTableComponent>
      </div>
    );
  }
}

StudentComponent.displayName = 'AdminStudentComponent';

// Uncomment properties you need
// StudentComponent.propTypes = {};
// StudentComponent.defaultProps = {};

export default StudentComponent;
