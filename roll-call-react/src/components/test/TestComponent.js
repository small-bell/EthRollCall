'use strict';

import React from 'react';

require('styles/test/Test.css');

import {test} from '../../api/index';

class TestComponent extends React.Component {

  componentWillMount() {
    test()
  }
  render() {
    return (
      <div className="test-component">
        Please edit src/components/test//TestComponent.js to update this component!
      </div>
    );
  }
}

TestComponent.displayName = 'TestTestComponent';

// Uncomment properties you need
// TestComponent.propTypes = {};
// TestComponent.defaultProps = {};

export default TestComponent;
