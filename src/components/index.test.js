import React from 'react';
import assert from 'assert';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import Rnd from './';

const mouseMove = (x, y) => {
  const event = document.createEvent('MouseEvents');
  event.initMouseEvent('mousemove', true, true, window,
    0, 0, 0, x, y, false, false, false, false, 0, null);
  document.dispatchEvent(event);
  return event;
};

const mouseUp = (x, y) => {
  const event = document.createEvent('MouseEvents');
  event.initMouseEvent('mouseup', true, true, window,
    0, 0, 0, x, y, false, false, false, false, 0, null);
  document.dispatchEvent(event);
  return event;
};

describe('', () => {
  it('should mount without error', () => {
    const rnd = mount(
      <Rnd default={{ x: 100, y: 100, width: 100, height: 100 }} />,
    );
    assert(!!rnd);
  });

  it('should call onDragStart when start dragging', () => {
    const onDragStart = spy();
    const rnd = mount(
      <Rnd
        default={{ x: 100, y: 100, width: 100, height: 100 }}
        onDragStart={onDragStart}
      />,
    );
    rnd.find('div').at(0).simulate('mousedown');
    assert.equal(onDragStart.callCount, 1);
    assert.equal(onDragStart.firstCall.args[0].type, 'mousedown');
    assert.equal(onDragStart.firstCall.args[1].x, 100);
    assert.equal(onDragStart.firstCall.args[1].y, 100);
  });

  it('should call onDrag when dragging', () => {
    const onDrag = spy();
    const rnd = mount(
      <Rnd
        default={{ x: 100, y: 100, width: 100, height: 100 }}
        onDrag={onDrag}
      />,
      { attachTo: document.body },
    );
    rnd.find('div').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
    mouseMove(200, 220);
    assert.equal(onDrag.callCount, 1);
    assert.equal(onDrag.firstCall.args[1].x, 300);
    assert.equal(onDrag.firstCall.args[1].y, 320);
    assert.notEqual(rnd.getDOMNode().getAttribute('style').indexOf('transform: translate(300px, 320px)'), -1);
  });

  it('should call onDragStop when drag stop', () => {
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
    assert.equal(onDragStop.callCount, 1);
  });
});
