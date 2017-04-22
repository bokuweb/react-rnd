/* @flow */

import test from 'ava';
import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import Rnd from './';

const mouseMove = (x, y) => {
  const event = document.createEvent('MouseEvents');
  (event: any).initMouseEvent('mousemove', true, true, window,
    0, 0, 0, x, y, false, false, false, false, 0, null);
  document.dispatchEvent(event);
  return event;
};

const mouseUp = (x, y) => {
  const event = document.createEvent('MouseEvents');
  (event: any).initMouseEvent('mouseup', true, true, window,
    0, 0, 0, x, y, false, false, false, false, 0, null);
  document.dispatchEvent(event);
  return event;
};

test('should throw error without props', async (t) => {
  t.throws(() => mount(<Rnd />));
});

test('should mount', async (t) => {
  const rnd = mount(
    <Rnd default={{ x: 100, y: 100, width: 100, height: 100 }} />,
  );
  t.true(!!rnd);
});

test('should call onDragStart when start dragging', async (t) => {
  const onDragStart = spy();
  const rnd = mount(
    <Rnd
      default={{ x: 100, y: 100, width: 100, height: 100 }}
      onDragStart={onDragStart}
    />,
  );
  rnd.find('div').at(0).simulate('mousedown');
  t.is(onDragStart.callCount, 1);
  t.is(onDragStart.firstCall.args[0].type, 'mousedown');
  t.is(onDragStart.firstCall.args[1].x, 100);
  t.is(onDragStart.firstCall.args[1].y, 100);
});

test('should call onDrag when dragging', async (t) => {
  const onDrag = spy();
  const rnd = mount(
    <Rnd
      default={{ x: 100, y: 100, width: 100, height: 100 }}
      onDrag={onDrag}
    />,
  );
  rnd.find('div').at(0).simulate('mousedown');
  mouseMove(200, 220);
  mouseUp(100, 120);
  t.is(onDrag.callCount, 1);
});

test('should call onDragStop when drag stop', async (t) => {
  const onDragStop = spy();
  const rnd = mount(
    <Rnd
      default={{ x: 100, y: 100, width: 100, height: 100 }}
      onDragStop={onDragStop}
    />,
  );
  rnd.find('div').at(0).simulate('mousedown');
  mouseMove(200, 220);
  mouseUp(100, 120);
  t.is(onDragStop.callCount, 1);
});
