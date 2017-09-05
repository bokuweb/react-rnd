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

describe('rbd', () => {
  beforeEach(() => {
    const div = document.createElement('div');
    document.body.appendChild(div);
  });


  describe('mount', () => {
    it('should mount without error', () => {
      const rnd = mount(
        <Rnd default={{ x: 100, y: 100, width: 100, height: 100 }} />,
      );
      assert(!!rnd);
    });
  });

  describe('props', () => {
    it('Should custom class name be applied to box', () => {
      const rnd = mount(
        <Rnd
          className="custom-class-name"
          default={{ x: 100, y: 100, width: 100, height: 100 }}
        />,
      );
      assert(rnd.getDOMNode().classList.contains('custom-class-name'));
    });

    it('Should set handler className', () => {
      const rnd = mount(
        <Rnd
          default={{ x: 100, y: 100, width: 100, height: 100 }}
          resizeHandlerClasses={{
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
      assert.equal(handlers.length, 8);
    });

    it('Should not render resizer when enable props all false', () => {
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
          resizeHandlerClasses={{
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
      assert.equal(handlers.length, 0);
    });
  });

  describe('drag', () => {
    describe('callcack', () => {
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
        rnd.find('div').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(200, 220);
        mouseUp(100, 120);
        assert.equal(onDragStop.callCount, 1);
        assert.equal(onDragStop.firstCall.args[1].x, 200);
        assert.equal(onDragStop.firstCall.args[1].y, 220);
      });
    });

    describe('axis', () => {
      it('should dragging disabled when axis equals none', () => {
        const onDrag = spy();
        const rnd = mount(
          <Rnd
            onDrag={onDrag}
            dragAxis="none"
            default={{ x: 100, y: 100, width: 100, height: 100 }}
          />,
          { attachTo: document.querySelector('div') },
        );
        rnd.find('div').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(200, 220);
        assert.equal(onDrag.callCount, 1);
        assert.notEqual(rnd.getDOMNode().getAttribute('style').indexOf('transform: translate(100px, 100px)'), -1);
      });

      it('should enable dragging only x when axis equals x', () => {
        const onDrag = spy();
        const rnd = mount(
          <Rnd
            onDrag={onDrag}
            dragAxis="x"
            default={{ x: 100, y: 100, width: 100, height: 100 }}
          />,
          { attachTo: document.querySelector('div') },
        );
        rnd.find('div').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(200, 220);
        assert.equal(onDrag.callCount, 1);
        assert.notEqual(rnd.getDOMNode().getAttribute('style').indexOf('transform: translate(300px, 100px)'), -1);
      });

      it('should enable dragging only y when axis equals y', () => {
        const onDrag = spy();
        const rnd = mount(
          <Rnd
            onDrag={onDrag}
            dragAxis="y"
            default={{ x: 100, y: 100, width: 100, height: 100 }}
          />,
          { attachTo: document.querySelector('div') },
        );
        rnd.find('div').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(200, 220);
        assert.equal(onDrag.callCount, 1);
        assert.notEqual(rnd.getDOMNode().getAttribute('style').indexOf('transform: translate(100px, 320px)'), -1);
      });

      it('should enable dragging both x & y when axis equals both', () => {
        const onDrag = spy();
        const rnd = mount(
          <Rnd
            onDrag={onDrag}
            dragAxis="both"
            default={{ x: 100, y: 100, width: 100, height: 100 }}
          />,
          { attachTo: document.querySelector('div') },
        );
        rnd.find('div').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(200, 220);
        assert.equal(onDrag.callCount, 1);
        assert.notEqual(rnd.getDOMNode().getAttribute('style').indexOf('transform: translate(300px, 320px)'), -1);
      });
    });

    describe('grid', () => {
      it('should snap when dragging smaller than threshold', () => {
        const rnd = mount(
          <Rnd
            dragGrid={[30, 100]}
            default={{ x: 100, y: 100, width: 100, height: 100 }}
          />,
          { attachTo: document.querySelector('div') },
        );
        rnd.find('div').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(14, 49);
        assert.notEqual(rnd.getDOMNode().getAttribute('style').indexOf('transform: translate(100px, 100px)'), -1);
      });

      it('should snap when dragging larger than threshold', () => {
        const rnd = mount(
          <Rnd
            dragGrid={[30, 100]}
            default={{ x: 100, y: 100, width: 100, height: 100 }}
          />,
          { attachTo: document.querySelector('div') },
        );
        rnd.find('div').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(15, 50);
        assert.notEqual(rnd.getDOMNode().getAttribute('style').indexOf('transform: translate(130px, 200px)'), -1);
      });
    });

    describe('bounds', () => {
      it('should limit position by parent bounds', () => {
        const rnd = mount(
          <div style={{ width: '800px', height: '600px' }}>
            <Rnd
              bounds="parent"
              default={{ x: 0, y: 0, width: 100, height: 100 }}
            />
          </div>,
          { attachTo: document.querySelector('div') },
        );
        rnd.find('div').at(0).childAt(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(1000, 1000);
        assert.notEqual(rnd.childAt(0).getDOMNode().getAttribute('style').indexOf('transform: translate(700px, 500px)'), -1);
      });

      it('should limit position by selector bounds', () => {
        const rnd = mount(
          <div className="target" style={{ width: '1000px', height: '800px' }}>
            <div style={{ width: '800px', height: '600px' }}>
              <Rnd
                bounds=".target"
                default={{ x: 0, y: 0, width: 100, height: 100 }}
              />
            </div>
          </div>,
          { attachTo: document.querySelector('div') },
        );
        rnd.find('div').at(0).childAt(0).childAt(0)
          .simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(2000, 2000);
        assert.notEqual(rnd.childAt(0).childAt(0).getDOMNode().getAttribute('style')
          .indexOf('transform: translate(900px, 700px)'), -1);
      });
    });
  });

  describe('resize', () => {
    describe('callback and size', () => {
      it('Should box width and height equal 100px', () => {
        const rnd = mount(
          <Rnd
            default={{ x: 100, y: 100, width: 100, height: 100 }}
            resizeHandlerClasses={{
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
        assert.equal(rnd.childAt(0).getDOMNode().style.width, '100px');
        assert.equal(rnd.childAt(0).getDOMNode().style.height, '100px');
      });

      it('Should call onResizeStart when mousedown', () => {
        const onResizeStart = spy();
        const rnd = mount(
          <Rnd
            default={{ x: 100, y: 100, width: 100, height: 100 }}
            resizeHandlerClasses={{
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
        rnd.find('div.handler').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        assert.equal(onResizeStart.callCount, 1);
        assert.equal(onResizeStart.getCall(0).args[1], 'right');
      });

      it('should call onResize with expected args when resize direction right', () => {
        const onResize = spy();
        const onResizeStart = spy();
        const rnd = mount(
          <Rnd
            default={{ x: 100, y: 100, width: 100, height: 100 }}
            resizeHandlerClasses={{
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
        rnd.find('div.handler').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(200, 220);
        assert.equal(onResize.callCount, 1);
        assert(onResize.getCall(0).args[0] instanceof Event);
        assert.equal(onResize.getCall(0).args[1], 'right');
        assert.deepEqual(onResize.getCall(0).args[2].clientWidth, 300);
        assert.deepEqual(onResize.getCall(0).args[2].clientHeight, 100);
        assert.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 0 });
      });

      it('should call onResizeStop with expected args when resize direction right', () => {
        const onResize = spy();
        const onResizeStop = spy();
        const rnd = mount(
          <Rnd
            default={{ x: 100, y: 100, width: 100, height: 100 }}
            resizeHandlerClasses={{
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
        rnd.find('div.handler').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(200, 220);
        mouseUp(200, 220);
        assert.equal(onResizeStop.callCount, 1);
        assert(onResize.getCall(0).args[0] instanceof Event);
        assert.equal(onResize.getCall(0).args[1], 'right');
        assert.deepEqual(onResize.getCall(0).args[2].clientWidth, 300);
        assert.deepEqual(onResize.getCall(0).args[2].clientHeight, 100);
        assert.deepEqual(onResize.getCall(0).args[3], { width: 200, height: 0 });
      });

      it('should move x when resizing left', () => {
        const onResize = spy();
        const onResizeStart = spy();
        const rnd = mount(
          <Rnd
            default={{ x: 100, y: 100, width: 100, height: 100 }}
            resizeHandlerClasses={{
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
        rnd.find('div.handler').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(-50, 0);
        assert.equal(onResize.callCount, 1);
        assert.equal(onResize.getCall(0).args[1], 'left');
        assert.deepEqual(onResize.getCall(0).args[2].clientWidth, 150);
        assert.deepEqual(onResize.getCall(0).args[2].clientHeight, 100);
        assert.deepEqual(onResize.getCall(0).args[3], { width: 50, height: 0 });
        assert.notEqual(rnd.getDOMNode().getAttribute('style').indexOf('transform: translate(50px, 100px)'), -1);
      });

      it('should move y when resizing top', () => {
        const onResize = spy();
        const onResizeStart = spy();
        const rnd = mount(
          <Rnd
            default={{ x: 100, y: 100, width: 100, height: 100 }}
            resizeHandlerClasses={{
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
        rnd.find('div.handler').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(0, -50);
        assert.equal(onResize.callCount, 1);
        assert.equal(onResize.getCall(0).args[1], 'top');
        assert.deepEqual(onResize.getCall(0).args[2].clientWidth, 100);
        assert.deepEqual(onResize.getCall(0).args[2].clientHeight, 150);
        assert.deepEqual(onResize.getCall(0).args[3], { width: 0, height: 50 });
        assert.notEqual(rnd.getDOMNode().getAttribute('style').indexOf('transform: translate(100px, 50px)'), -1);
      });
    });

    describe('grid', () => {
      it('should snapped by original grid when x axis resizing smaller then threshold', () => {
        const onResize = spy();
        const rnd = mount(
          <Rnd
            default={{ x: 100, y: 100, width: 100, height: 100 }}
            resizeHandlerClasses={{
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
        rnd.find('div.handler').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(9, 0);
        assert.deepEqual(onResize.getCall(0).args[2].clientWidth, 100);
      });

      it('should snapped by original grid when x axis resizing larger then threshold', () => {
        const onResize = spy();
        const rnd = mount(
          <Rnd
            default={{ x: 100, y: 100, width: 100, height: 100 }}
            resizeHandlerClasses={{
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
        rnd.find('div.handler').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(10, 0);
        assert.deepEqual(onResize.getCall(0).args[2].clientWidth, 120);
      });

      it('should snapped by original grid when y axis resizing smaller then threshold', () => {
        const onResize = spy();
        const rnd = mount(
          <Rnd
            default={{ x: 100, y: 100, width: 100, height: 100 }}
            resizeHandlerClasses={{
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
        rnd.find('div.handler').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(0, 9);
        assert.deepEqual(onResize.getCall(0).args[2].clientHeight, 100);
      });

      it('should snapped by original grid when y axis resizing larger then threshold', () => {
        const onResize = spy();
        const rnd = mount(
          <Rnd
            default={{ x: 100, y: 100, width: 100, height: 100 }}
            resizeHandlerClasses={{
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
        rnd.find('div.handler').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(0, 10);
        assert.deepEqual(onResize.getCall(0).args[2].clientHeight, 120);
      });

      it('should snapped by original grid when y axis resizing larger then threshold', () => {
        const onResize = spy();
        const rnd = mount(
          <Rnd
            default={{ x: 100, y: 100, width: 100, height: 100 }}
            resizeHandlerClasses={{
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
        rnd.find('div.handler').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(20, 10);
        // TODO: It'a resizable-box grid bug??
        assert.deepEqual(onResize.getCall(0).args[2].clientWidth, 120);
        assert.deepEqual(onResize.getCall(0).args[2].clientHeight, 120);
      });
    });

    describe('bounds', () => {
      it('should clamped by parent size', () => {
        const rnd = mount(
          <div style={{ width: '800px', height: '600px' }}>
            <Rnd
              default={{ x: 0, y: 0, width: 100, height: 100 }}
              resizeHandlerClasses={{
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
        rnd.find('div.handler').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(1200, 1200);
        assert.equal(rnd.childAt(0).childAt(0).getDOMNode().style.width, '800px');
        assert.equal(rnd.childAt(0).childAt(0).getDOMNode().style.height, '600px');
      });

      it('should clamped by selector size', () => {
        const rnd = mount(
          <div className="target" style={{ width: '1000px', height: '800px' }}>
            <div style={{ width: '800px', height: '600px' }}>
              <Rnd
                default={{ x: 0, y: 0, width: 100, height: 100 }}
                resizeHandlerClasses={{
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
        rnd.find('div.handler').at(0).simulate('mousedown', { clientX: 0, clientY: 0 });
        mouseMove(2000, 2000);
        assert.equal(rnd.childAt(0).childAt(0).childAt(0).getDOMNode().style.width, '1000px');
        assert.equal(rnd.childAt(0).childAt(0).childAt(0).getDOMNode().style.height, '800px');
      });
    });
  });

  describe('method', () => {
    it('should get rnd updated when updatePosition invoked', () => {
      const rnd = mount(
        <Rnd
          default={{ x: 100, y: 100, width: 100, height: 100 }}
        />,
      );
      rnd.instance().updatePosition({ x: 200, y: 300 });
      assert.notEqual(rnd.getDOMNode().getAttribute('style').indexOf('transform: translate(200px, 300px)'), -1);
    });

    it('should get rnd updated when updateSize invoked', () => {
      const rnd = mount(
        <Rnd
          default={{ x: 100, y: 100, width: 100, height: 100 }}
        />,
      );
      rnd.instance().updateSize({ width: 200, height: 300 });
      assert.equal(rnd.childAt(0).getDOMNode().style.width, '200px');
      assert.equal(rnd.childAt(0).getDOMNode().style.height, '300px');
    });

    it('should get rnd updated when updateZIndex invoked', () => {
      const rnd = mount(
        <Rnd
          default={{ x: 100, y: 100, width: 100, height: 100 }}
          z={200}
        />,
      );
      rnd.instance().updateZIndex(300);
      assert.equal(rnd.find('div').at(0).getDOMNode().style.zIndex, 300);
    });
  });
});
