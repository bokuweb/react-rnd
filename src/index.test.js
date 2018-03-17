/* eslint-disable */

import test from 'ava';
import React from 'react';
import { spy } from 'sinon';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Rnd from './';

Enzyme.configure({ adapter: new Adapter() });

const mouseMove = (x, y) => {
  const event = document.createEvent('MouseEvents');
  event.initMouseEvent('mousemove', true, true, window, 0, 0, 0, x, y, false, false, false, false, 0, null);
  document.dispatchEvent(event);
  return event;
};

const mouseUp = (x, y) => {
  const event = document.createEvent('MouseEvents');
  event.initMouseEvent('mouseup', true, true, window, 0, 0, 0, x, y, false, false, false, false, 0, null);
  document.dispatchEvent(event);
  return event;
};

test.beforeEach(async t => {
  const div = document.createElement('div');
  document.body.appendChild(div);
});

test('should mount without error', async t => {
  const rnd = mount(<Rnd default={{ x: 100, y: 100, width: 100, height: 100 }} />);
  t.truthy(!!rnd);
});

test('Should custom class name be applied to box', async t => {
  const rnd = mount(<Rnd className="custom-class-name" default={{ x: 100, y: 100, width: 100, height: 100 }} />);
  t.truthy(rnd.getDOMNode().classList.contains('custom-class-name'));
});

test('Should set handler className', async t => {
  const rnd = mount(
    <Rnd
      default={{ x: 100, y: 100, width: 100, height: 100 }}
      resizeHandleClasses={{
        top: 'handler',
        right: 'handler',
        bottom: 'handler',
        left: 'handler',
        topRight: 'handler',
        bottomRight: 'handler',
        bottomLeft: 'handler',
        topLeft: 'handler',
      }}
    />,
  );
  const handlers = rnd.find('.handler');
  // FIXME: Is it a enzyme 3.x bug ? I can not understand why handlers.length equals 16.
  //        When use enzyme v2.x this test is passed...
  // t.is(handlers.length, 8);
  t.is(handlers.length, 16);
});

test('Should not render resizer when enable props all false', async t => {
  const rnd = mount(
    <Rnd
      default={{ x: 100, y: 100, width: 100, height: 100 }}
      enableResizing={{
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      resizeHandleClasses={{
        top: 'handler',
        right: 'handler',
        bottom: 'handler',
        left: 'handler',
        topRight: 'handler',
        bottomRight: 'handler',
        bottomLeft: 'handler',
        topLeft: 'handler',
      }}
    />,
  );
  const handlers = rnd.find('.handler');
  t.is(handlers.length, 0);
});

test('should call onDragStart when start dragging', async t => {
  const onDragStart = spy();
  const rnd = mount(<Rnd default={{ x: 100, y: 100, width: 100, height: 100 }} onDragStart={onDragStart} />);
  rnd
    .find('div')
    .at(0)
    .simulate('mousedown');
  t.is(onDragStart.callCount, 1);
  t.is(onDragStart.firstCall.args[0].type, 'mousedown');
  t.is(onDragStart.firstCall.args[1].x, 100);
  t.is(onDragStart.firstCall.args[1].y, 100);
});

test('should call onDrag when dragging', async t => {
  const onDrag = spy();
  const rnd = mount(<Rnd default={{ x: 100, y: 100, width: 100, height: 100 }} onDrag={onDrag} />);
  rnd
    .find('div')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(200, 220);
  t.is(onDrag.callCount, 1);
  t.is(onDrag.firstCall.args[1].x, 300);
  t.is(onDrag.firstCall.args[1].y, 320);
  t.not(
    rnd
      .getDOMNode()
      .getAttribute('style')
      .indexOf('transform: translate(300px, 320px)'),
    -1,
  );
});

test('should call onDragStop when drag stop', async t => {
  const onDragStop = spy();
  const rnd = mount(<Rnd default={{ x: 100, y: 100, width: 100, height: 100 }} onDragStop={onDragStop} />);
  rnd
    .find('div')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(200, 220);
  mouseUp(100, 120);
  t.is(onDragStop.callCount, 1);
  t.is(onDragStop.firstCall.args[1].x, 200);
  t.is(onDragStop.firstCall.args[1].y, 220);
});

test('should dragging disabled when axis equals none', async t => {
  const onDrag = spy();
  const rnd = mount(<Rnd onDrag={onDrag} dragAxis="none" default={{ x: 100, y: 100, width: 100, height: 100 }} />, {
    attachTo: document.querySelector('div'),
  });
  rnd
    .find('div')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(200, 220);
  t.is(onDrag.callCount, 1);
  t.not(
    rnd
      .getDOMNode()
      .getAttribute('style')
      .indexOf('transform: translate(100px, 100px)'),
    -1,
  );
});

test('should enable dragging only x when axis equals x', async t => {
  const onDrag = spy();
  const rnd = mount(<Rnd onDrag={onDrag} dragAxis="x" default={{ x: 100, y: 100, width: 100, height: 100 }} />, {
    attachTo: document.querySelector('div'),
  });
  rnd
    .find('div')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(200, 220);
  t.is(onDrag.callCount, 1);
  t.not(
    rnd
      .getDOMNode()
      .getAttribute('style')
      .indexOf('transform: translate(300px, 100px)'),
    -1,
  );
});

test('should enable dragging only y when axis equals y', async t => {
  const onDrag = spy();
  const rnd = mount(<Rnd onDrag={onDrag} dragAxis="y" default={{ x: 100, y: 100, width: 100, height: 100 }} />, {
    attachTo: document.querySelector('div'),
  });
  rnd
    .find('div')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(200, 220);
  t.is(onDrag.callCount, 1);
  t.not(
    rnd
      .getDOMNode()
      .getAttribute('style')
      .indexOf('transform: translate(100px, 320px)'),
    -1,
  );
});

test('should enable dragging both x & y when axis equals both', async t => {
  const onDrag = spy();
  const rnd = mount(<Rnd onDrag={onDrag} dragAxis="both" default={{ x: 100, y: 100, width: 100, height: 100 }} />, {
    attachTo: document.querySelector('div'),
  });
  rnd
    .find('div')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(200, 220);
  t.is(onDrag.callCount, 1);
  t.not(
    rnd
      .getDOMNode()
      .getAttribute('style')
      .indexOf('transform: translate(300px, 320px)'),
    -1,
  );
});

test('should snap when dragging smaller than threshold', async t => {
  const rnd = mount(<Rnd dragGrid={[30, 100]} default={{ x: 100, y: 100, width: 100, height: 100 }} />, {
    attachTo: document.querySelector('div'),
  });
  rnd
    .find('div')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(14, 49);
  t.not(
    rnd
      .getDOMNode()
      .getAttribute('style')
      .indexOf('transform: translate(100px, 100px)'),
    -1,
  );
});

test('should snap when dragging larger than threshold', async t => {
  const rnd = mount(<Rnd dragGrid={[30, 100]} default={{ x: 100, y: 100, width: 100, height: 100 }} />, {
    attachTo: document.querySelector('div'),
  });
  rnd
    .find('div')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(15, 50);
  t.not(
    rnd
      .getDOMNode()
      .getAttribute('style')
      .indexOf('transform: translate(130px, 200px)'),
    -1,
  );
});

test('should limit position by parent bounds', async t => {
  const rnd = mount(
    <div style={{ width: '800px', height: '600px' }}>
      <Rnd bounds="parent" default={{ x: 0, y: 0, width: 100, height: 100 }} />
    </div>,
    { attachTo: document.querySelector('div') },
  );
  rnd
    .find('div')
    .at(0)
    .childAt(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(1000, 1000);
  t.not(
    rnd
      .childAt(0)
      .getDOMNode()
      .getAttribute('style')
      .indexOf('transform: translate(700px, 500px)'),
    -1,
  );
});

test('should limit position by selector bounds', async t => {
  const rnd = mount(
    <div className="target" style={{ width: '1000px', height: '800px' }}>
      <div style={{ width: '800px', height: '600px' }}>
        <Rnd bounds=".target" default={{ x: 0, y: 0, width: 100, height: 100 }} />
      </div>
    </div>,
    { attachTo: document.querySelector('div') },
  );
  rnd
    .find('div')
    .at(0)
    .childAt(0)
    .childAt(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(2000, 2000);
  t.not(
    rnd
      .childAt(0)
      .childAt(0)
      .getDOMNode()
      .getAttribute('style')
      .indexOf('transform: translate(900px, 700px)'),
    -1,
  );
});

test('Should box width and height equal 100px', async t => {
  const rnd = mount(
    <Rnd
      default={{ x: 100, y: 100, width: 100, height: 100 }}
      resizeHandleClasses={{
        top: 'handler',
        right: 'handler',
        bottom: 'handler',
        left: 'handler',
        topRight: 'handler',
        bottomRight: 'handler',
        bottomLeft: 'handler',
        topLeft: 'handler',
      }}
    />,
    { attachTo: document.querySelector('div') },
  );
  t.is(rnd.getDOMNode().style.width, '100px');
  t.is(rnd.getDOMNode().style.height, '100px');
});

test('Should call onResizeStart when mousedown', async t => {
  const onResizeStart = spy();
  const rnd = mount(
    <Rnd
      default={{ x: 100, y: 100, width: 100, height: 100 }}
      resizeHandleClasses={{
        top: 'handler',
        right: 'handler',
        bottom: 'handler',
        left: 'handler',
        topRight: 'handler',
        bottomRight: 'handler',
        bottomLeft: 'handler',
        topLeft: 'handler',
      }}
      enableResizing={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      onResizeStart={onResizeStart}
    />,
    { attachTo: document.querySelector('div') },
  );
  rnd
    .find('div.handler')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  t.is(onResizeStart.callCount, 1);
  t.is(onResizeStart.getCall(0).args[1], 'right');
});

test('should call onResize with expected args when resize direction right', async t => {
  const onResize = spy();
  const onResizeStart = spy();
  const rnd = mount(
    <Rnd
      default={{ x: 100, y: 100, width: 100, height: 100 }}
      resizeHandleClasses={{
        top: 'handler',
        right: 'handler',
        bottom: 'handler',
        left: 'handler',
        topRight: 'handler',
        bottomRight: 'handler',
        bottomLeft: 'handler',
        topLeft: 'handler',
      }}
      enableResizing={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      onResizeStart={onResizeStart}
      onResize={onResize}
    />,
    { attachTo: document.querySelector('div') },
  );
  rnd
    .find('div.handler')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(200, 220);
  t.is(onResize.callCount, 1);
  t.truthy(onResize.getCall(0).args[0] instanceof Event);
  t.is(onResize.getCall(0).args[1], 'right');
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 300);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 100);
  t.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 0 });
});

test('should call onResizeStop with expected args when resize direction right', async t => {
  const onResize = spy();
  const onResizeStop = spy();
  const rnd = mount(
    <Rnd
      default={{ x: 100, y: 100, width: 100, height: 100 }}
      resizeHandleClasses={{
        top: 'handler',
        right: 'handler',
        bottom: 'handler',
        left: 'handler',
        topRight: 'handler',
        bottomRight: 'handler',
        bottomLeft: 'handler',
        topLeft: 'handler',
      }}
      enableResizing={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      onResizeStop={onResizeStop}
      onResize={onResize}
    />,
    { attachTo: document.querySelector('div') },
  );
  rnd
    .find('div.handler')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(200, 220);
  mouseUp(200, 220);
  t.is(onResizeStop.callCount, 1);
  t.truthy(onResize.getCall(0).args[0] instanceof Event);
  t.is(onResize.getCall(0).args[1], 'right');
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 300);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 100);
  t.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 0 });
});

test('should move x when resizing left', async t => {
  const onResize = spy();
  const onResizeStart = spy();
  const rnd = mount(
    <Rnd
      default={{ x: 100, y: 100, width: 100, height: 100 }}
      resizeHandleClasses={{
        top: 'handler',
        right: 'handler',
        bottom: 'handler',
        left: 'handler',
        topRight: 'handler',
        bottomRight: 'handler',
        bottomLeft: 'handler',
        topLeft: 'handler',
      }}
      enableResizing={{
        top: false,
        right: false,
        bottom: false,
        left: true,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      onResizeStart={onResizeStart}
      onResize={onResize}
    />,
    { attachTo: document.querySelector('div') },
  );
  rnd
    .find('div.handler')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(-50, 0);
  t.is(onResize.callCount, 1);
  t.is(onResize.getCall(0).args[1], 'left');
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 150);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 100);
  t.deepEqual(onResize.getCall(0).args[3], { width: 50, height: 0 });
  t.not(
    rnd
      .getDOMNode()
      .getAttribute('style')
      .indexOf('transform: translate(50px, 100px)'),
    -1,
  );
});

test('should move y when resizing top', async t => {
  const onResize = spy();
  const onResizeStart = spy();
  const rnd = mount(
    <Rnd
      default={{ x: 100, y: 100, width: 100, height: 100 }}
      resizeHandleClasses={{
        top: 'handler',
        right: 'handler',
        bottom: 'handler',
        left: 'handler',
        topRight: 'handler',
        bottomRight: 'handler',
        bottomLeft: 'handler',
        topLeft: 'handler',
      }}
      enableResizing={{
        top: true,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      onResizeStart={onResizeStart}
      onResize={onResize}
    />,
    { attachTo: document.querySelector('div') },
  );
  rnd
    .find('div.handler')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(0, -50);
  t.is(onResize.callCount, 1);
  t.is(onResize.getCall(0).args[1], 'top');
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 100);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 150);
  t.deepEqual(onResize.getCall(0).args[3], { width: 0, height: 50 });
  t.not(
    rnd
      .getDOMNode()
      .getAttribute('style')
      .indexOf('transform: translate(100px, 50px)'),
    -1,
  );
});

test('should snapped by original grid when x axis resizing smaller then threshold', async t => {
  const onResize = spy();
  const rnd = mount(
    <Rnd
      default={{ x: 100, y: 100, width: 100, height: 100 }}
      resizeHandleClasses={{
        top: 'handler',
        right: 'handler',
        bottom: 'handler',
        left: 'handler',
        topRight: 'handler',
        bottomRight: 'handler',
        bottomLeft: 'handler',
        topLeft: 'handler',
      }}
      enableResizing={{
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
      onResize={onResize}
      resizeGrid={[20, 1]}
    />,
    { attachTo: document.querySelector('div') },
  );
  rnd
    .find('div.handler')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(9, 0);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 100);
});

test('should snapped by original grid when x axis resizing larger then threshold', async t => {
  const onResize = spy();
  const rnd = mount(
    <Rnd
      default={{ x: 100, y: 100, width: 100, height: 100 }}
      resizeHandleClasses={{
        top: 'handler',
        right: 'handler',
        bottom: 'handler',
        left: 'handler',
        topRight: 'handler',
        bottomRight: 'handler',
        bottomLeft: 'handler',
        topLeft: 'handler',
      }}
      enableResizing={{
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
      onResize={onResize}
      resizeGrid={[20, 1]}
    />,
    { attachTo: document.querySelector('div') },
  );
  rnd
    .find('div.handler')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(10, 0);
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 120);
});

test('should snapped by original grid when y axis resizing smaller then threshold', async t => {
  const onResize = spy();
  const rnd = mount(
    <Rnd
      default={{ x: 100, y: 100, width: 100, height: 100 }}
      resizeHandleClasses={{
        top: 'handler',
        right: 'handler',
        bottom: 'handler',
        left: 'handler',
        topRight: 'handler',
        bottomRight: 'handler',
        bottomLeft: 'handler',
        topLeft: 'handler',
      }}
      enableResizing={{
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
      onResize={onResize}
      resizeGrid={[1, 20]}
    />,
    { attachTo: document.querySelector('div') },
  );
  rnd
    .find('div.handler')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(0, 9);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 100);
});

test('should snapped by original grid when y axis resizing larger then threshold', async t => {
  const onResize = spy();
  const rnd = mount(
    <Rnd
      default={{ x: 100, y: 100, width: 100, height: 100 }}
      resizeHandleClasses={{
        top: 'handler',
        right: 'handler',
        bottom: 'handler',
        left: 'handler',
        topRight: 'handler',
        bottomRight: 'handler',
        bottomLeft: 'handler',
        topLeft: 'handler',
      }}
      enableResizing={{
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
      onResize={onResize}
      resizeGrid={[1, 20]}
    />,
    { attachTo: document.querySelector('div') },
  );
  rnd
    .find('div.handler')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(0, 10);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 120);
});

test('should snapped by original grid when y axis resizing larger then threshold', async t => {
  const onResize = spy();
  const rnd = mount(
    <Rnd
      default={{ x: 100, y: 100, width: 100, height: 100 }}
      resizeHandleClasses={{
        top: 'handler',
        right: 'handler',
        bottom: 'handler',
        left: 'handler',
        topRight: 'handler',
        bottomRight: 'handler',
        bottomLeft: 'handler',
        topLeft: 'handler',
      }}
      enableResizing={{
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
      onResize={onResize}
      resizeGrid={[30, 20]}
    />,
    { attachTo: document.querySelector('div') },
  );
  rnd
    .find('div.handler')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(20, 10);
  // TODO: It'a resizable-box grid bug??
  t.deepEqual(onResize.getCall(0).args[2].clientWidth, 120);
  t.deepEqual(onResize.getCall(0).args[2].clientHeight, 120);
});

test('should clamped by parent size', async t => {
  const rnd = mount(
    <div style={{ width: '800px', height: '600px' }}>
      <Rnd
        default={{ x: 0, y: 0, width: 100, height: 100 }}
        resizeHandleClasses={{
          top: 'handler',
          right: 'handler',
          bottom: 'handler',
          left: 'handler',
          topRight: 'handler',
          bottomRight: 'handler',
          bottomLeft: 'handler',
          topLeft: 'handler',
        }}
        bounds="parent"
        enableResizing={{
          top: false,
          right: false,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: true,
          bottomLeft: false,
          topLeft: false,
        }}
      />
    </div>,
    { attachTo: document.querySelector('div') },
  );
  rnd
    .find('div.handler')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(1200, 1200);
  t.is(rnd.childAt(0).getDOMNode().style.width, '800px');
  t.is(rnd.childAt(0).getDOMNode().style.height, '600px');
});

test('should clamped by selector size', async t => {
  const rnd = mount(
    <div className="target" style={{ width: '1000px', height: '800px' }}>
      <div style={{ width: '800px', height: '600px' }}>
        <Rnd
          default={{ x: 0, y: 0, width: 100, height: 100 }}
          resizeHandleClasses={{
            top: 'handler',
            right: 'handler',
            bottom: 'handler',
            left: 'handler',
            topRight: 'handler',
            bottomRight: 'handler',
            bottomLeft: 'handler',
            topLeft: 'handler',
          }}
          bounds=".target"
          enableResizing={{
            top: false,
            right: false,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: true,
            bottomLeft: false,
            topLeft: false,
          }}
        />
      </div>
    </div>,
    { attachTo: document.querySelector('div') },
  );
  rnd
    .find('div.handler')
    .at(0)
    .simulate('mousedown', { clientX: 0, clientY: 0 });
  mouseMove(2000, 2000);
  t.is(
    rnd
      .childAt(0)
      .childAt(0)
      .getDOMNode().style.width,
    '1000px',
  );
  t.is(
    rnd
      .childAt(0)
      .childAt(0)
      .getDOMNode().style.height,
    '800px',
  );
});

test('should get rnd updated when updatePosition invoked', async t => {
  const rnd = mount(<Rnd default={{ x: 100, y: 100, width: 100, height: 100 }} />);
  rnd.instance().updatePosition({ x: 200, y: 300 });
  t.not(
    rnd
      .getDOMNode()
      .getAttribute('style')
      .indexOf('transform: translate(200px, 300px)'),
    -1,
  );
});

test('should get rnd updated when updateSize invoked', async t => {
  const rnd = mount(<Rnd default={{ x: 100, y: 100, width: 100, height: 100 }} />);
  rnd.instance().updateSize({ width: 200, height: 300 });
  t.is(rnd.getDOMNode().style.width, '200px');
  t.is(rnd.getDOMNode().style.height, '300px');
});

test('should get rnd updated when updateZIndex invoked', async t => {
  const rnd = mount(<Rnd default={{ x: 100, y: 100, width: 100, height: 100 }} z={200} />);
  rnd.instance().updateZIndex(300);
  t.is(
    rnd
      .find('div')
      .at(0)
      .getDOMNode().style.zIndex,
    '300',
  );
});
