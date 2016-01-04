import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import * as Utils from './test-utils';
import ResizeAndMovable from '../src';

describe('', () => {
  describe('props', () => {
    it('should have default properties', () => {
      const resizeAndMovable = TestUtils.renderIntoDocument(
        <ResizeAndMovable><div/></ResizeAndMovable>
      );
      assert.equal(resizeAndMovable.props.x, 0);
      assert.equal(resizeAndMovable.props.y, 0);
      assert.equal(resizeAndMovable.props.width, 100);
      assert.equal(resizeAndMovable.props.height, 100);
      assert.equal(resizeAndMovable.props.minWidth, undefined);
      assert.equal(resizeAndMovable.props.minHeight, undefined);
      assert.equal(resizeAndMovable.props.maxWidth, undefined);
      assert.equal(resizeAndMovable.props.maxHeight, undefined);
      assert.equal(resizeAndMovable.props.zIndex, 100);
      assert.equal(resizeAndMovable.props.customClass, '');
      assert.equal(typeof resizeAndMovable.props.onDragStart, 'function');
      assert.equal(typeof resizeAndMovable.props.onDrag, 'function');
      assert.equal(typeof resizeAndMovable.props.onDragStop, 'function');
      assert.equal(typeof resizeAndMovable.props.onResizeStart, 'function');
      assert.equal(typeof resizeAndMovable.props.onResize, 'function');
      assert.equal(typeof resizeAndMovable.props.onResizeStop, 'function');
    });
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
         customStyle={{background:"#333", textAlign:"center"}}
         width={50}
         height={50}
         minWidth={100}
         minHeight={120}
         maxWidth={300}
         maxHeight={320}
         zIndex={1000}
         onDragStart={onDragStart}
         onDrag={onDrag}
         onDragStop={onDragStop}
         onResizeStart={onResizeStart}
         onResize={onResize}
         onResizeStop={onResizeStop}>
        <div/>
      </ResizeAndMovable>
    );
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
  });

  it('should call onDragStart when dragging begins', () => {
    let called = false;
    const resizeAndMovable = TestUtils.renderIntoDocument(
      <ResizeAndMovable onDragStart={() => called = true}><div/></ResizeAndMovable>
    );
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(resizeAndMovable));
    assert.equal(called, true);
  });


  afterEach(done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });
});
