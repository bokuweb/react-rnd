(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom'), require('react-draggable'), require('re-resizable')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom', 'react-draggable', 're-resizable'], factory) :
  (factory((global['react-rnd'] = {}),global.React,global.ReactDOM,global.Draggable,global.Resizable));
}(this, (function (exports,React,reactDom,Draggable,Resizable) { 'use strict';

  Draggable = Draggable && Draggable.hasOwnProperty('default') ? Draggable['default'] : Draggable;
  Resizable = Resizable && Resizable.hasOwnProperty('default') ? Resizable['default'] : Resizable;

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var resizableStyle = {
    width: 'auto',
    height: 'auto',
    display: 'inline-block',
    position: 'absolute',
    top: 0,
    left: 0
  };

  var Rnd = function (_React$Component) {
    inherits(Rnd, _React$Component);

    function Rnd(props) {
      classCallCheck(this, Rnd);

      var _this = possibleConstructorReturn(this, (Rnd.__proto__ || Object.getPrototypeOf(Rnd)).call(this, props));

      _this.state = {
        z: props.z,
        original: {
          x: 0,
          y: 0
        },
        bounds: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        maxWidth: props.maxWidth,
        maxHeight: props.maxHeight,
        isMounted: false
      };
      _this.onResizeStart = _this.onResizeStart.bind(_this);
      _this.onResize = _this.onResize.bind(_this);
      _this.onResizeStop = _this.onResizeStop.bind(_this);
      _this.onDragStart = _this.onDragStart.bind(_this);
      _this.onDrag = _this.onDrag.bind(_this);
      _this.onDragStop = _this.onDragStop.bind(_this);
      _this.getMaxSizesFromProps = _this.getMaxSizesFromProps.bind(_this);
      return _this;
    }

    createClass(Rnd, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (this.props.z !== nextProps.z) {
          this.setState({ z: nextProps.z });
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.setParentPosition();
      }
    }, {
      key: 'getParentSize',
      value: function getParentSize() {
        return this.resizable.getParentSize();
      }
    }, {
      key: 'getMaxSizesFromProps',
      value: function getMaxSizesFromProps() {
        var maxWidth = typeof this.props.maxWidth === 'undefined' ? Number.MAX_SAFE_INTEGER : this.props.maxWidth;
        var maxHeight = typeof this.props.maxHeight === 'undefined' ? Number.MAX_SAFE_INTEGER : this.props.maxHeight;
        return { maxWidth: maxWidth, maxHeight: maxHeight };
      }
    }, {
      key: 'getSelfElement',
      value: function getSelfElement() {
        if (!this) return null;
        return reactDom.findDOMNode(this);
      }
    }, {
      key: 'setParentPosition',
      value: function setParentPosition() {
        var element = this.getSelfElement();
        if (element instanceof Element) {
          var parent = element.parentNode;
          if (!parent || typeof window === 'undefined') return;
          if (!(parent instanceof HTMLElement)) return;
          if (getComputedStyle(parent).position !== 'static') {
            this.setState({ isMounted: true });
            return;
          }
          parent.style.position = 'relative';
          this.setState({ isMounted: true });
        }
      }
    }, {
      key: 'onDragStart',
      value: function onDragStart(e, data) {
        if (this.props.onDragStart) {
          this.props.onDragStart(e, data);
        }
        if (!this.props.bounds) return;
        var parent = this.resizable && this.resizable.parentNode;
        var target = this.props.bounds === 'parent' ? parent : document.querySelector(this.props.bounds);
        if (!(target instanceof HTMLElement) || !(parent instanceof HTMLElement)) {
          return;
        }
        var targetRect = target.getBoundingClientRect();
        var targetLeft = targetRect.left;
        var targetTop = targetRect.top;
        var parentRect = parent.getBoundingClientRect();
        var parentLeft = parentRect.left;
        var parentTop = parentRect.top;
        var left = targetLeft - parentLeft;
        var top = targetTop - parentTop;
        if (!this.resizable) return;
        this.setState({
          bounds: {
            top: top,
            right: left + (target.offsetWidth - this.resizable.size.width),
            bottom: this.props._freeBottomBounds // eslint-disable-line
            ? 2147483647 : top + (target.offsetHeight - this.resizable.size.height),
            left: left
          }
        });
      }
    }, {
      key: 'onDrag',
      value: function onDrag(e, data) {
        if (this.props.onDrag) {
          this.props.onDrag(e, data);
        }
      }
    }, {
      key: 'onDragStop',
      value: function onDragStop(e, data) {
        if (this.props.onDragStop) {
          this.props.onDragStop(e, data);
        }
      }
    }, {
      key: 'onResizeStart',
      value: function onResizeStart(e, dir, refToElement) {
        e.stopPropagation();
        this.setState({
          original: { x: this.draggable.state.x, y: this.draggable.state.y }
        });
        if (this.props.bounds) {
          var parent = this.resizable && this.resizable.parentNode;
          var target = this.props.bounds === 'parent' ? parent : document.querySelector(this.props.bounds);
          var self = this.getSelfElement();
          if (self instanceof Element && target instanceof HTMLElement && parent instanceof HTMLElement) {
            var _getMaxSizesFromProps = this.getMaxSizesFromProps(),
                _maxWidth = _getMaxSizesFromProps.maxWidth,
                _maxHeight = _getMaxSizesFromProps.maxHeight;

            var parentSize = this.getParentSize();
            if (_maxWidth && typeof _maxWidth === 'string') {
              if (_maxWidth.endsWith('%')) {
                var ratio = Number(_maxWidth.replace('%', '')) / 100;
                _maxWidth = parentSize.width * ratio;
              } else if (_maxWidth.endsWith('px')) {
                _maxWidth = Number(_maxWidth.replace('px', ''));
              }
            }
            if (_maxHeight && typeof _maxHeight === 'string') {
              if (_maxHeight.endsWith('%')) {
                var _ratio = Number(_maxHeight.replace('%', '')) / 100;
                _maxHeight = parentSize.width * _ratio;
              } else if (_maxHeight.endsWith('px')) {
                _maxHeight = Number(_maxHeight.replace('px', ''));
              }
            }
            var selfRect = self.getBoundingClientRect();
            var selfLeft = selfRect.left;
            var selfTop = selfRect.top;
            var targetRect = target.getBoundingClientRect();
            var targetLeft = targetRect.left;
            var targetTop = targetRect.top;
            if (/left/i.test(dir) && this.resizable) {
              var max = selfLeft - targetLeft + this.resizable.size.width;
              this.setState({ maxWidth: max > Number(_maxWidth) ? _maxWidth : max });
            }
            if (/right/i.test(dir)) {
              var _max = target.offsetWidth + (targetLeft - selfLeft);
              this.setState({ maxWidth: _max > Number(_maxWidth) ? _maxWidth : _max });
            }
            if (/top/i.test(dir) && this.resizable) {
              var _max2 = selfTop - targetTop + this.resizable.size.height;
              this.setState({
                maxHeight: _max2 > Number(_maxHeight) ? _maxHeight : _max2
              });
            }
            if (/bottom/i.test(dir)) {
              var _max3 = target.offsetHeight + (targetTop - selfTop);
              this.setState({
                maxHeight: _max3 > Number(_maxHeight) ? _maxHeight : _max3
              });
            }
          }
        } else {
          this.setState({
            maxWidth: this.props.maxWidth,
            maxHeight: this.props.maxHeight
          });
        }
        if (this.props.onResizeStart) {
          this.props.onResizeStart(e, dir, refToElement);
        }
      }
    }, {
      key: 'onResize',
      value: function onResize(e, direction, refToResizableElement, delta) {
        var x = void 0;
        var y = void 0;
        if (/left/i.test(direction)) {
          x = this.state.original.x - delta.width;
          this.draggable.setState({ x: x });
        }
        if (/top/i.test(direction)) {
          y = this.state.original.y - delta.height;
          this.draggable.setState({ y: y });
        }
        if (this.props.onResize) {
          this.props.onResize(e, direction, refToResizableElement, delta, {
            x: x || this.draggable.state.x,
            y: y || this.draggable.state.y
          });
        }
      }
    }, {
      key: 'onResizeStop',
      value: function onResizeStop(e, direction, refToResizableElement, delta) {
        var _getMaxSizesFromProps2 = this.getMaxSizesFromProps(),
            maxWidth = _getMaxSizesFromProps2.maxWidth,
            maxHeight = _getMaxSizesFromProps2.maxHeight;

        this.setState({ maxWidth: maxWidth, maxHeight: maxHeight });
        if (this.props.onResizeStop) {
          var _position = {
            x: this.draggable.state.x,
            y: this.draggable.state.y
          };
          this.props.onResizeStop(e, direction, refToResizableElement, delta, _position);
        }
      }
    }, {
      key: 'updateSize',
      value: function updateSize(size) {
        if (!this.resizable) return;
        this.resizable.updateSize({ width: size.width, height: size.height });
      }
    }, {
      key: 'updatePosition',
      value: function updatePosition(position) {
        this.draggable.setState(position);
      }
    }, {
      key: 'updateZIndex',
      value: function updateZIndex(z) {
        this.setState({ z: z });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var cursorStyle = this.props.disableDragging || this.props.dragHandleClassName ? { cursor: 'normal' } : { cursor: 'move' };
        var innerStyle = _extends({}, resizableStyle, {
          zIndex: this.state.z
        }, cursorStyle, this.props.style);
        // HACK: Wait for setting relative to parent element, if props.absolutePos was not set ( SSR need initial render ). 
        if (!this.state.isMounted && !this.props.hasOwnProperty("absolutePos")) return React.createElement('div', null);
        var maxHeight = this.props._freeBottomBounds ? 2147483647 : this.state.maxHeight; // eslint-disable-line
        return React.createElement(
          Draggable,
          {
            ref: function ref(c) {
              _this2.draggable = c;
            },
            handle: this.props.dragHandleClassName,
            defaultPosition: this.props.default,
            onStart: this.onDragStart,
            onDrag: this.onDrag,
            onStop: this.onDragStop,
            axis: this.props.dragAxis,
            disabled: this.props.disableDragging,
            grid: this.props.dragGrid,
            bounds: this.props.bounds ? this.state.bounds : undefined,
            position: this.props.position,
            enableUserSelectHack: this.props.enableUserSelectHack,
            cancel: this.props.cancel
          },
          React.createElement(
            Resizable,
            _extends({}, this.props.extendsProps, {
              className: this.props.className,
              ref: function ref(c) {
                _this2.resizable = c;
              },
              defaultSize: this.props.default,
              size: this.props.size,
              enable: this.props.enableResizing,
              onResizeStart: this.onResizeStart,
              onResize: this.onResize,
              onResizeStop: this.onResizeStop,
              style: innerStyle,
              minWidth: this.props.minWidth,
              minHeight: this.props.minHeight,
              maxWidth: this.state.maxWidth,
              maxHeight: maxHeight,
              grid: this.props.resizeGrid,
              handleWrapperClass: this.props.resizeHandleWrapperClass,
              handleWrapperStyle: this.props.resizeHandleWrapperStyle,
              lockAspectRatio: this.props.lockAspectRatio,
              lockAspectRatioExtraWidth: this.props.lockAspectRatioExtraWidth,
              lockAspectRatioExtraHeight: this.props.lockAspectRatioExtraHeight,
              handleStyles: this.props.resizeHandleStyles,
              handleClasses: this.props.resizeHandleClasses
            }),
            this.props.children
          )
        );
      }
    }]);
    return Rnd;
  }(React.Component);

  Rnd.defaultProps = {
    maxWidth: Number.MAX_SAFE_INTEGER,
    maxHeight: Number.MAX_SAFE_INTEGER,
    onResizeStart: function onResizeStart() {},
    onResize: function onResize() {},
    onResizeStop: function onResizeStop() {},
    onDragStart: function onDragStart() {},
    onDrag: function onDrag() {},
    onDragStop: function onDragStop() {}
  };

  exports.default = Rnd;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=react-rnd.umd.js.map
