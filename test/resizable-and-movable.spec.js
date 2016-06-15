import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import TestUtils from 'react-addons-test-utils';
import Resizer from '../node_modules/react-resizable-box/lib/resizer';
import ResizeAndMovable from '../src';

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
    const resizeAndMovable = TestUtils.renderIntoDocument(
      <ResizeAndMovable />
    );
    assert.equal(resizeAndMovable.props.x, 0);
    assert.equal(resizeAndMovable.props.y, 0);
    assert.equal(resizeAndMovable.props.width, 100);
    assert.equal(resizeAndMovable.props.height, 100);
    assert.equal(resizeAndMovable.props.minWidth, undefined);
    assert.equal(resizeAndMovable.props.minHeight, undefined);
    assert.equal(resizeAndMovable.props.maxWidth, undefined);
    assert.equal(resizeAndMovable.props.maxHeight, undefined);
    assert.equal(resizeAndMovable.props.bounds, undefined);
    assert.equal(resizeAndMovable.props.zIndex, 100);
    assert.equal(resizeAndMovable.props.className, '');
    assert.deepEqual(resizeAndMovable.props.style, {});
    assert.equal(resizeAndMovable.props.dragHandlerClassName, '');
    assert.deepEqual(resizeAndMovable.props.isResizable, {
      top: true,
      right: true,
      bottom: true,
      left: true,
      topRight: true,
      bottomRight: true,
      bottomLeft: true,
      topLeft: true,
    });
    assert.equal(resizeAndMovable.props.moveAxis, 'both');
    assert.deepEqual(resizeAndMovable.props.moveGrid, [1, 1]);
    assert.deepEqual(resizeAndMovable.props.resizeGrid, [1, 1]);
    assert.equal(typeof resizeAndMovable.props.onDragStart, 'function');
    assert.equal(typeof resizeAndMovable.props.onDrag, 'function');
    assert.equal(typeof resizeAndMovable.props.onDragStop, 'function');
    assert.equal(typeof resizeAndMovable.props.onResizeStart, 'function');
    assert.equal(typeof resizeAndMovable.props.onResize, 'function');
    assert.equal(typeof resizeAndMovable.props.onResizeStop, 'function');
  });


  it('should honor props', () => {
    const onDragStart = () => {};
    const onDrag = () => {};
    const onDragStop = () => {};
    const onResizeStart = () => {};
    const onResize = () => {};
    const onResizeStop = () => {};
    const resizeAndMovable = TestUtils.renderIntoDocument(
      <ResizeAndMovable
        style={{ background: '#333', textAlign: 'center' }}
        x={10}
        y={20}
        width={50}
        height={50}
        minWidth={100}
        minHeight={120}
        maxWidth={300}asad
        maxHeight={320}
        zIndex={1000}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragStop={onDragStop}
        onResizeStart={onResizeStart}
        onResize={onResize}
        onResizeStop={onResizeStop}
        className="testClassName"
        isResizable={{
          top: false,
          right: false,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
      />
    );
    assert.equal(resizeAndMovable.props.x, 10);
    assert.equal(resizeAndMovable.props.y, 20);
    assert.equal(resizeAndMovable.props.width, 50);
    assert.equal(resizeAndMovable.props.height, 50);
    assert.equal(resizeAndMovable.props.minWidth, 100);
    assert.equal(resizeAndMovable.props.minHeight, 120);
    assert.equal(resizeAndMovable.props.maxWidth, 300);
    assert.equal(resizeAndMovable.props.maxHeight, 320);
    assert.equal(resizeAndMovable.props.zIndex, 1000);
    assert.equal(resizeAndMovable.props.onDragStart, onDragStart);
    assert.equal(resizeAndMovable.props.onDrag, onDrag);
    assert.equal(resizeAndMovable.props.onDragStop, onDragStop);
    assert.equal(resizeAndMovable.props.className, 'testClassName');
    assert.deepEqual(resizeAndMovable.props.isResizable, {
      top: false,
      right: false,
      bottom: false,
      left: false,
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false,
    });
  });


  it('should call onDragStart when dragging begins', () => {
    const onDragStart = sinon.spy();
    const resizeAndMovable = TestUtils.renderIntoDocument(
      <ResizeAndMovable onDragStart={onDragStart} />
    );
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(resizeAndMovable));
    assert.equal(onDragStart.callCount, 1);
  });

  it('should call onDrag when dragging', () => {
    const onDrag = sinon.spy();
    const resizeAndMovable = ReactDOM.render(
      <ResizeAndMovable onDrag={onDrag} />,
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
      <ResizeAndMovable onDragStop={onDragStop} />
    );
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(resizeAndMovable));
    mouseUp(100, 120);
    assert.equal(onDragStop.callCount, 1);
  });

  it('should call onResizeStart when resizing begins', () => {
    const onResizeStart = sinon.spy();
    const resizeAndMovable = TestUtils.renderIntoDocument(
      <ResizeAndMovable onResizeStart={onResizeStart} />
    );
    const resizer = TestUtils.scryRenderedComponentsWithType(resizeAndMovable, Resizer);
    resizer.map(r => TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(r)));
    assert.equal(onResizeStart.callCount, 8);
  });

  it('should call onResize when resizing', () => {
    const onResize = sinon.spy();
    const onResizeStop = sinon.spy();
    const resizeAndMovable = TestUtils.renderIntoDocument(
      <ResizeAndMovable onResize={onResize} onResizeStop={onResizeStop} />
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
      <ResizeAndMovable onResizeStop={onResizeStop} />
    );
    const resizer = TestUtils.scryRenderedComponentsWithType(resizeAndMovable, Resizer);
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(resizer[5]), { clientX: 0, clientY: 0 });
    mouseUp(200, 220);
    assert.equal(onResizeStop.callCount, 1);
  });
});
