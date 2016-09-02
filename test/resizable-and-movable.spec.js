import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import TestUtils from 'react-addons-test-utils';
import Resizer from '../node_modules/react-resizable-box/lib/resizer';
import Rnd from '../src';

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

describe('react-resizable-and-mpvable', () => {
  let div;
  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should have default properties', () => {
    const rnd = TestUtils.renderIntoDocument(
      <Rnd />
    );
    assert.equal(rnd.props.initial.x, 0);
    assert.equal(rnd.props.initial.y, 0);
    assert.equal(rnd.props.initial.width, 100);
    assert.equal(rnd.props.initial.height, 100);
    assert.equal(rnd.props.minWidth, undefined);
    assert.equal(rnd.props.minHeight, undefined);
    assert.equal(rnd.props.maxWidth, undefined);
    assert.equal(rnd.props.maxHeight, undefined);
    assert.equal(rnd.props.bounds, undefined);
    assert.equal(rnd.props.zIndex, 100);
    assert.equal(rnd.props.lockAspectRatio, false);
    assert.equal(rnd.props.className, '');
    assert.deepEqual(rnd.props.style, { boxSizing: 'border-box' });
    assert.equal(rnd.props.dragHandlerClassName, '');
    assert.deepEqual(rnd.props.isResizable, {
      top: true,
      right: true,
      bottom: true,
      left: true,
      topRight: true,
      bottomRight: true,
      bottomLeft: true,
      topLeft: true,
    });
    assert.equal(rnd.props.moveAxis, 'both');
    assert.deepEqual(rnd.props.moveGrid, [1, 1]);
    assert.deepEqual(rnd.props.resizeGrid, [1, 1]);
    assert.equal(typeof rnd.props.onDragStart, 'function');
    assert.equal(typeof rnd.props.onDrag, 'function');
    assert.equal(typeof rnd.props.onDragStop, 'function');
    assert.equal(typeof rnd.props.onResizeStart, 'function');
    assert.equal(typeof rnd.props.onResize, 'function');
    assert.equal(typeof rnd.props.onResizeStop, 'function');
  });

  it('should call onDragStart when dragging begins', () => {
    const onDragStart = sinon.spy();
    const resizeAndMovable = TestUtils.renderIntoDocument(
      <Rnd onDragStart={onDragStart} />
    );
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(resizeAndMovable));
    assert.equal(onDragStart.callCount, 1);
  });

  it('should call onDrag when dragging', () => {
    const onDrag = sinon.spy();
    const resizeAndMovable = ReactDOM.render(
      <Rnd onDrag={onDrag} />,
      document.querySelector('body > div')
    );
    const node = ReactDOM.findDOMNode(resizeAndMovable);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(100, 120);
    mouseUp(100, 120);
    const style = node.getAttribute('style');
    assert.equal(onDrag.callCount, 1);
    assert.equal(onDrag.getCall(0).args[1].position.left, 100);
    assert.equal(onDrag.getCall(0).args[1].position.top, 120);
    assert.notEqual(style.indexOf('transform: translate(100px, 120px);'), -1);
  });

  it('should call onDragStop when dragging ends', () => {
    const onDragStop = sinon.spy();
    const resizeAndMovable = TestUtils.renderIntoDocument(
      <Rnd onDragStop={onDragStop} />
    );
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(resizeAndMovable));
    mouseUp(100, 120);
    assert.equal(onDragStop.callCount, 1);
  });

  it('should call onResizeStart when resizing begins', () => {
    const onResizeStart = sinon.spy();
    const resizeAndMovable = TestUtils.renderIntoDocument(
      <Rnd onResizeStart={onResizeStart} />
    );
    const resizer = TestUtils.scryRenderedComponentsWithType(resizeAndMovable, Resizer);
    resizer.map(r => TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(r)));
    assert.equal(onResizeStart.callCount, 8);
  });

  it('should call onResize when resizing', () => {
    const onResize = sinon.spy();
    const onResizeStop = sinon.spy();
    const resizeAndMovable = TestUtils.renderIntoDocument(
      <Rnd onResize={onResize} onResizeStop={onResizeStop} />
    );
    const resizer = TestUtils.scryRenderedComponentsWithType(resizeAndMovable, Resizer);
    const node = ReactDOM.findDOMNode(resizer[5]);
    TestUtils.Simulate.mouseDown(node, { clientX: 0, clientY: 0 });
    mouseMove(200, 220);
    mouseUp(200, 220);
    assert.equal(onResize.getCall(0).args[1].width, 200);
    assert.equal(onResize.getCall(0).args[1].height, 220);
    assert.equal(onResize.callCount, 1);
  });

  it('should call onResizeStop when resizing end', () => {
    const onResizeStop = sinon.spy();
    const resizeAndMovable = TestUtils.renderIntoDocument(
      <Rnd onResizeStop={onResizeStop} />
    );
    const resizer = TestUtils.scryRenderedComponentsWithType(resizeAndMovable, Resizer);
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(resizer[5]), { clientX: 0, clientY: 0 });
    mouseUp(200, 220);
    assert.equal(onResizeStop.callCount, 1);
  });
});
