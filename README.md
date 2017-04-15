# react-rnd

[![Greenkeeper badge](https://badges.greenkeeper.io/bokuweb/react-rnd.svg)](https://greenkeeper.io/)

Resizable and draggable component for React.

[![Build Status](https://img.shields.io/travis/bokuweb/react-rnd.svg?style=flat-square)](https://travis-ci.org/bokuweb/react-rnd)
[![Version](https://img.shields.io/npm/v/react-rnd.svg?style=flat-square)](https://www.npmjs.com/package/react-rnd)
[![npm](https://img.shields.io/npm/dm/react-rnd.svg?style=flat-square)]()
[![Code Climate](https://img.shields.io/codeclimate/github/bokuweb/react-rnd/badges/gpa.svg?style=flat-square)](https://codeclimate.com/github/bokuweb/react-rnd)
[![License](https://img.shields.io/npm/l/react-rnd.svg?style=flat-square)](https://github.com/bokuweb/react-rnd#license)

## Demo

![screenshot](https://raw.githubusercontent.com/bokuweb/react-rnd/master/screenshot.gif)
   
See demo: [http://bokuweb.github.io/react-rnd/](http://bokuweb.github.io/react-rnd/)  
demo Code: [https://github.com/bokuweb/react-rnd/blob/master/docs/src/example.js](https://github.com/bokuweb/react-rnd/blob/master/docs/src/example.js)  


## Installation

```sh
npm i react-rnd
```

## Overview

### Basic

``` javascript
<Rnd
  ref={c => { this.rnd = c; }}
  initial={{
    x: window.innerWidth / 2 - 200,
    y: window.innerHeight / 2 - 80,
    width: 400,
    height: 160,
  }}
  style={style}
  minWidth={300}
  minHeight={160}
  maxWidth={800}
  maxHeight={300}
  bounds={'parent'}
>
  <span className="box">
    resize and drag me!!
  </span>
</Rnd>
```

## Properties

#### `initial: PropTypes.shape({width: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]), height: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]), x: PropTypes.number, y: PropTypes.number }),`
  
The `width` and `height` property is used to set the size of a component.   
The `x` and `y` property is used to set the initial position of the component.   
  
  
    
#### `minWidth: PropTypes.number`

The `minWidth` property is used to set the minimum width of a component.
  
  
  
#### `minHeight: PropTypes.number`

The `minHeight` property is used to set the minimum height of a component.
  
  
  
#### `maxWidth: PropTypes.number`

The `maxWidth` property is used to set the maximum width of a component.
  
  
  
#### `maxHeight: PropTypes.number`

The `maxheight` property is used to set the maximum height of a component.
  
  
  
#### `className: PropTypes.string`

The `className` property is used to set the custom `className` of a component.
  
  
  
#### `style: Proptypes.object`

The `style` property is used to set the custom `style` of a component.
  
  
  
#### `resizerHandleStyle: PropTypes.shape({ top: PropTypes.object, right: PropTypes.object, bottom: PropTypes.object, left: PropTypes.object, topRight: PropTypes.object, bottomRight: PropTypes.object, bottomLeft: PropTypes.object, topLeft: PropTypes.object })`

The `resizerHandleStyle` property is used to override the style of one or more resize handles.
Only the axis you specify will have its handle style replaced.
If you specify a value for `right` it will completely replace the styles for the `right` resize handle,
but other handle will still use the default styles.
  
  
  
#### `isResizable: PropTypes.shape({ top: PropTypes.bool, right: PropTypes.bool, bottom: PropTypes.bool, left: PropTypes.bool, topRight: PropTypes.bool, bottomRight: PropTypes.bool, bottomLeft: PropTypes.bool, topLeft: PropTypes.bool })`

The `isResizable` property is used to set the resizable permission of a resizable component.

The permission of `top`, `right`, `bottom`, `left`, `topRight`, `bottomRight`, `bottomLeft`, `topLeft` direction resizing.
If omitted, all resizer are enabled.
If you want to permit only right direction resizing, set `{ top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }`. 
  
  
  
#### `onClick: PropTypes.func`

Calls when resizable component clicked.
  
  
  
#### `onTouchStart: PropTypes.func`

Calls when resizable component touched.
  
  
  
#### `onDoubleClick: PropTypes.func`

Calls when resizable component double clicked.
  
  
  
#### `onResizeStart: PropTypes.func`

Calls when resizable component resize starts.
Calls back with (`direction: string`, `styleSize: object`, `clientSize: object`, `event: object`)

- direction: `top`, `right`, `bottom`, `left`, `topRight`, `bottomRight`, `bottomLeft`, and `topLeft`.
- styleSize: `{ width, height }`
  - this argument is {width, height} of getComputedStyle.
- clientSize: `{ width, height }`
  - this argument is `clientWidth` and `clientHeight`.
- event: `mouse down event`
  
  
  
#### `onResize: PropTypes.func`

Calls when resizable component resize.
Calls back with (`direction: string`, `styleSize: object`, `clientSize: object`, `delta: object`, `newPos: object`)

- direction: `top`, `right`, `bottom`, `left`, `topRight`, `bottomRight`, `bottomLeft`, and `topLeft`.
- styleSize: `{ width, height }`
  - this argument is {width, height} of getComputedStyle.
- clientSize: `{ width, height }`
  - this argument is `clientWidth` and `clientHeight`.
- delta: `{ width, height }`
  - this delta width and height by resize. 
- newPos: `{ x, y }`
  - new position of the element.
  
For example, when `<Resizable width={100} height={200} style={{ padding: '20px'}} onResize={...} />` mounted and resize 'right' 20px, this callback is called with `('right', { width: 120, height: 200 }, { width: 160, height: 240 }, {width: 20, height: 0})`
  
  
  
#### `onResizeStop: PropTypes.func`

Calls back with (`direction: string`, `styleSize: object`, `clientSize: object`, `delta: object`)

- direction: `top`, `right`, `bottom`, `left`, `topRight`, `bottomRight`, `bottomLeft`, and `topLeft`.
- styleSize: `{ width, height }`
  - this argument is {width, height} of getComputedStyle.
- clientSize: `{ width, height }`
  - this argument is `clientWidth` and `clientHeight`.
- delta: `{ width, height }`
  - this delta width and height by resize. 
  
For example, when `<Resizable width={100} height={200} style={{ padding: '20px'}} onResize={...} />` mounted and resize 'right' 20px, this callback is called with `('right', { width: 120, height: 200 }, { width: 160, height: 240 }, {width: 20, height: 0}, {x: 20, y: 0})`
  
  
  
#### `moveAxis: PropTypes.string`

The direction of allowed movement (dragging) allowed ('x','y','both','none').
  
  
  
#### `lockAspectRatio: PropTypes.bool`

The `lockAspectRatio` property is used to lock aspect ratio.
If ommited, set `false`.
  
  
  
#### `onDragStart: PropTypes.func`

Callback called on dragging start.   
  
  
  
#### `onDrag: PropTypes.func`

Callback called on resizing.   
`onDrag` called with the following parameters:

``` javascript
(
 event: Event,
 ui:{
      deltaX: number, deltaY: number,
      node: Node
      position:
      {
        left: number, top: number
      }
   }
)
```
  
  
  
#### `onDragStop: PropTypes.func`

Callback called on dragging stop.
`onDragStop` called with the following parameters:

``` javascript
(
 event: Event,
 ui:{
      deltaX: number, deltaY: number,
      node: Node
      position:
      {
        left: number, top: number
      }
   }
)
```
  
  
  
#### `bounds: PropTypes.oneOfType([PropTypes.object, PropTypes.string])`

Specifies movement boundaries. Accepted values:
 - `parent` restricts movement within the node's offsetParent
    (nearest node with position relative or absolute), or
 - An object with `left, top, right, and bottom` properties.
   These indicate how far in each direction the draggable
   can be moved.
  
  
  
#### `dragHandlerClassName: PropTypes.string`

Specifies a selector to be used as the handle that initiates drag.
Example: '.handle'.
  
  
  
#### `zIndex: PropTypes.number`

The `zIndex` property is used to set the zindex of a component.
  
  
  
#### `resizeGrid: PropTypes.arrayOf(PropTypes.number)`

The `resizeGrid` property is used to specify the increments that resizing should snap to. Defaults to `[1, 1]`.
  
  
  
#### `moveGrid: PropTypes.arrayOf(PropTypes.number)`

The `moveGrid` property is used to specify the increments that moving should snap to. Defaults to `[1, 1]`.
  
  
## Methods

#### `updateSize({ width: number, height: number })`

Update component size.
`grid` ,`max/minWidth`, `max/minHeight` props is ignored, when this method called.

- for example

``` js
class YourComponent extends Component {

  ...
  
  update() {
    this.rnd.updateSize({ width: 200, height: 300 });
  }
  
  render() {
    return (
      <Rnd ref={c => { this.rnd = c; }}>
        example
      </Rnd>
    );
  }

  ...
}
```
  
#### `updatePosition({ x: number, x: number })`

Update component size.
`grid` `bounds` props is ignored, when this method called.

- for example

``` js
class YourComponent extends Component {

  ...
  
  update() {
    this.rnd.updatePosition({ x: 200, y: 300 });
  }
  
  render() {
    return (
      <Rnd ref={c => { this.rnd = c; }}>
        example
      </Rnd>
    );
  }

  ...
}
```  

#### `updateZIndex(zIndex: number)`

Update component z-index.

- for example

``` js
class YourComponent extends Component {

  ...
  
  update() {
    this.rnd.updateZIndex(200);
  }
  
  render() {
    return (
      <Rnd ref={c => { this.rnd = c; }}>
        example
      </Rnd>
    );
  }

  ...
}
```
  
  
## Test

``` sh
npm t
```

## Changelog

#### v4.2.1

- Added `updateZIndex`, method to updated component `zIndex` state.

#### v4.2.0

- Pass the new position in the onResizeStop callback #60


#### v4.1.0

- Pass the new position along in the resize callback #55


#### v4.0.1

- Fix style props to applt zIndex chaned.

#### v4.0.0

- Rename `react-rnd`.
- Remove `canUpdatePositionByParent` property.
- Remove `canUpdateSizeByParent` property.
- Remove `initiAsResizing` property.
- Change `x`, `y`, `width` and `height` property to `initial`.
- Add `updateSize`, `updatePosition`, method to updated conponent state.
- Add `lockAspectRatio` property to lock aspect ratio when resizing.

#### v3.0.0

- Add `canUpdatePositionByParent` property.

#### v2.0.0

- Fix bug, resize and grid not work properly.

#### v1.2.0

- Add `grid` props to snap grid. (thanks @paulyoung)
- Fix bug, moveAxis not work properly.


#### v1.1.3

- Fix situations when on dragStop you wanted to revert to 0,0 position #39
- Add `canUpdateSizeByParent` props #38

#### v1.1.2

- Add object.assign transform

#### v1.1.0

- Add add module exports plugin for `require`

#### v1.0.1

- Bug fix

#### v1.0.0

- Support react v15.x
- Support left, top resizer
- Remove start props, use width, height, x, and y.

#### v0.5.3

- Add handle selector

## License

The MIT License (MIT)

Copyright (c) 2016 @Bokuweb

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
