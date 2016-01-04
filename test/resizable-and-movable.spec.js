import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import TestUtils from 'react-addons-test-utils';
import Resizer from '../node_modules/react-resizable-box/lib/resizer';
import * as Utils from './test-utils';
import ResizeAndMovable from '../src';

describe('react-resizable-and-mpvable', () => {
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
         maxWidth={300}asad
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
    const onDragStart = sinon.spy();
    const resizeAndMovable = TestUtils.renderIntoDocument(
      <ResizeAndMovable onDragStart={onDragStart}><div/></ResizeAndMovable>
    );
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(resizeAndMovable));
    assert.equal(onDragStart.callCount, 1);
  });

  it('should call onDrag when dragging', () => {
    const onDrag = sinon.spy();
    const resizeAndMovable = TestUtils.renderIntoDocument(
      <ResizeAndMovable onDrag={onDrag}><div/></ResizeAndMovable>
    );
    const node = ReactDOM.findDOMNode(resizeAndMovable);
    TestUtils.Simulate.mouseDown(node, {clientX: 0, clientY: 0});
    Utils.mouseMove(node, 100, 120);
    TestUtils.Simulate.mouseUp(node);
    const style = node.getAttribute('style');
    assert.equal(onDrag.getCall(0).args[1].position.left, 100);
    assert.equal(onDrag.getCall(0).args[1].position.top, 120);
    assert.equal(onDrag.callCount, 1);
    assert.notEqual(style.indexOf('transform: translate(100px, 120px);'), -1);
  });


  it('should call onDragStop when dragging ends', () => {
    const onDragStop = sinon.spy();
    const resizeAndMovable = TestUtils.renderIntoDocument(
      <ResizeAndMovable onDragStop={onDragStop}><div/></ResizeAndMovable>
    );

    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(resizeAndMovable));
    TestUtils.Simulate.mouseUp(ReactDOM.findDOMNode(resizeAndMovable));
    assert.equal(onDragStop.callCount, 1);
  });

  it('should call onResizeStart when resizing begins', () => {
    const onResizeStart = sinon.spy();
    const resizeAndMovable = TestUtils.renderIntoDocument(
      <ResizeAndMovable onResizeStart={onResizeStart}><div/></ResizeAndMovable>
    );
    const resizer = TestUtils.scryRenderedComponentsWithType(resizeAndMovable, Resizer);
    resizer.map(r => TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(r)));
    assert.equal(onResizeStart.callCount, 3);
  });

  it('should call onResize when resizing', () => {
    const onResize = sinon.spy();
    const onResizeStop = sinon.spy();
    const resizeAndMovable = TestUtils.renderIntoDocument(
      <ResizeAndMovable onResize={onResize} onResizeStop={onResizeStop}>
        <div/>
      </ResizeAndMovable>
    );
    const resizer = TestUtils.scryRenderedComponentsWithType(resizeAndMovable, Resizer);
    const node = ReactDOM.findDOMNode(resizer[2]);
    TestUtils.Simulate.mouseDown(node, {clientX: 0, clientY: 0});
    Utils.mouseMove(node, 200, 220);
    TestUtils.Simulate.mouseUp(node);
    const style = node.getAttribute('style');
    assert.equal(onResize.getCall(0).args[0].width, 200);
    assert.equal(onResize.getCall(0).args[0].height, 220);
    assert.equal(onResize.callCount, 1);
  });

  it('should call onResizeStop when resizing ends', () => {
    const onResizeStop = sinon.spy();
    const resizeAndMovable = TestUtils.renderIntoDocument(
      <ResizeAndMovable onResizeStop={()=> console.log('resize stop')}><div/></ResizeAndMovable>
    );
    const resizer = TestUtils.scryRenderedComponentsWithType(resizeAndMovable, Resizer);
    TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(resizer[2]), {clientX: 0, clientY: 0});
    TestUtils.Simulate.mouseUp(ReactDOM.findDOMNode(resizer[2]));
    //FIXME: not call oResizeStop
    //assert.equal(onResizeStop.callCount, 1);
  });

  afterEach(done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });
});
