/* @flow */
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import Hello from './Hello';

test(async (t) => {
  const wrapper = shallow(<Hello />);
  t.is(wrapper.text(), 'Hello');
});
