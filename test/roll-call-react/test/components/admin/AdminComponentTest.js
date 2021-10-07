/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import AdminComponent from 'components/admin/AdminComponent.js';

describe('AdminComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(AdminComponent);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('admin-component');
  });
});
