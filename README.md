<p align="center"><img src ="https://github.com/bokuweb/react-rnd/blob/master/logo.png?raw=true" /></p>

<p align="center">A resizable and draggable component for React.</p>

<p align="center"><a href="https://circleci.com/gh/bokuweb/react-rnd/tree/master">
<img src="https://circleci.com/gh/bokuweb/react-rnd/tree/master.svg?style=svg" alt="Build Status" /></a>
<a href="https://www.npmjs.com/package/react-rnd">
<img src="https://img.shields.io/npm/v/react-rnd.svg" alt="Build Status" /></a>
<a href="https://www.npmjs.com/package/react-rnd">
<img src="https://img.shields.io/npm/dm/react-rnd.svg" /></a>
<a href="https://greenkeeper.io/">
<img src="https://badges.greenkeeper.io/bokuweb/react-rnd.svg" /></a>
<a href="https://github.com/prettier/prettier">
<img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" /></a>
</p>

## Table of Contents

* [Screenshot](#Screenshot)
* [Live Demo](#live-demo)
  * [Storybook](#storybook)
  * [CodeSandbox](#codesandbox)
* [Install](#install)
* [Usage](#usage)
* [Props](#props)
* [Instance API](#instance-api)
  * [updateSize(size: { width: number | string, height: number | string }): void](#updateSize-void)
  * [updatePosition({ x: number, y: number }): void](#updatePosition-void)
  * [updateZIndex(z: number): void](#upgradeZIndex-void)
* [Test](#test)
* [Related](#related)
* [Changelog](#changelog)
* [License](#license)


## Screenshot

<p align="center">
  <img src="https://raw.githubusercontent.com/bokuweb/react-rnd/master/screenshot.gif" />
</p>

https://codesandbox.io/s/q9onxj77j6

## Live Demo

### Storybook

TODO:

### CodeSandbox

[CodeSandbox(with default)](https://codesandbox.io/s/y3997qply9)    
[CodeSandbox(with size and position)](https://codesandbox.io/s/my4kjly94x)    


## Install

- use npm

```sh
npm i -S react-rnd
```

- use yarn

```sh
yarn add react-rnd
```

## Usage

### Example with `default`

``` javascript
<Rnd
  default={{
    x: 0,
    y: 0,
    width: 320,
    height: 200,
  }}
>
  Rnd
</Rnd>
```

### Example with `position` and `size`

``` javascript
<Rnd
  size={{ width: this.state.width,  height: this.state.height }}
  position={{ x: this.state.x, y: this.state.y }}
  onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
  onResize={(e, direction, ref, delta, position) => {
    this.setState({
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      ...position,
    });
  }}
>
  001
</Rnd>
```

## Props

#### `default: { x: number; y: number;  width?: number | string;  height?: number | string; };`

The `width` and `height` property is used to set the default size of the component.
For example, you can set `300`, `'300px'`, `50%`.
If omitted, set `'auto'`.

The `x` and `y` property is used to set the default position of the component.

#### `size?: { width: (number | string), height: (number | string) };`

The `size` property is used to set size of the component.
For example, you can set 300, '300px', 50%.

Use `size` if you need to control size state by yourself.

#### `position?: { x: number, y: number };`

The `position` property is used to set position of the component.
Use `position` if you need to control size state by yourself.

see, following example.

``` javascript
<Rnd
  size={{ width: this.state.width,  height: this.state.height }}
  position={{ x: this.state.x, y: this.state.y }}
  onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
  onResize={(e, direction, ref, delta, position) => {
    this.setState({
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      ...position,
    });
  }}
>
  001
</Rnd>
```

#### `className?: string;`

The `className` property is used to set the custom `className` of the component.

#### `style?: { [key: string]: string };`

The `style` property is used to set the custom `style` of the component.

#### `minWidth?: number | string;`

The `minWidth` property is used to set the minimum width of the component.
For example, you can set `300`, `'300px'`, `50%`.

#### `minHeight?: number | string;`

The `minHeight` property is used to set the minimum height of the component.
For example, you can set `300`, `'300px'`, `50%`.

#### `maxWidth?: number | string;`

The `maxWidth` property is used to set the maximum width of the component.
For example, you can set `300`, `'300px'`, `50%`.

#### `maxHeight?: number | string`;

The `maxHeight` property is used to set the maximum height of the component.
For example, you can set `300`, `'300px'`, `50%`.

#### `z?: number;`

The `z` property is used to set the zIndex of a component.

#### `resizeGrid?: [number, number];`

The `resizeGrid` property is used to specify the increments that resizing should snap to. Defaults to `[1, 1]`.

#### `dragGrid?: [number, number];`

The `dragGrid` property is used to specify the increments that moving should snap to. Defaults to `[1, 1]`.

#### `lockAspectRatio?: boolean | number;`

The `lockAspectRatio` property is used to lock aspect ratio.
Set to `true` to lock the aspect ratio based on the initial size.
Set to a numeric value to lock a specific aspect ratio (such as `16/9`).
If set to numeric, make sure to set initial height/width to values with correct aspect ratio.
If omitted, set `false`.

#### `lockAspectRatioExtraWidth?: number;`

The `lockAspectRatioExtraWidth` property enables a resizable component to maintain an aspect ratio plus extra width.
For instance, a video could be displayed 16:9 with a 50px side bar.
If omitted, set `0`.

#### `lockAspectRatioExtraHeight?: number;`

The `lockAspectRatioExtraHeight` property enables a resizable component to maintain an aspect ratio plus extra height.
For instance, a video could be displayed 16:9 with a 50px header bar.
If omitted, set `0`.

#### `dragHandleClassName?: string;`

Specifies a selector to be used as the handle that initiates drag.
Example: '.handle'.

#### `resizeHandleStyles?: HandleStyles;`

The `resizeHandleStyles` property is used to override the style of one or more resize handles.
Only the axis you specify will have its handle style replaced.
If you specify a value for `right` it will completely replace the styles for the `right` resize handle,
but other handle will still use the default styles.

``` javascript

type Style = { [key: string]: string | number };

export type HandleStyles = {
  bottom?: Style,
  bottomLeft?: Style,
  bottomRight?: Style,
  left?: Style,
  right?: Style,
  top?: Style,
  topLeft?: Style,
  topRight?: Style
}
```

#### `resizeHandleClasses?: HandleClasses;`

The `resizeHandleClasses` property is used to set the className of one or more resize handles.

``` javascript
type HandleClasses = {
  bottom?: string;
  bottomLeft?: string;
  bottomRight?: string;
  left?: string;
  right?: string;
  top?: string;
  topLeft?: string;
  topRight?: string;
}
```

#### `resizeHandleWrapperClass?: string;`

The `resizeHandleWrapperClass` property is used to set css class name of resize handle wrapper(`span`) element.

#### `resizeHandleWrapperStyle?: Style;`

The `resizeHandleWrapperStyle` property is used to set css class name of resize handle wrapper(`span`) element.

#### `enableResizing?: ?Enable;`

The `enableResizing` property is used to set the resizable permission of the component.

The permission of `top`, `right`, `bottom`, `left`, `topRight`, `bottomRight`, `bottomLeft`, `topLeft` direction resizing.
If omitted, all resizer are enabled.
If you want to permit only right direction resizing, set `{ top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }`.

``` javascript
export type Enable = {
  bottom?: boolean;
  bottomLeft?: boolean;
  bottomRight?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  topLeft?: boolean;
  topRight?: boolean;
}
```

#### `disableDragging?: boolean;`

The `disableDragging` property disables dragging completely.

#### `cancel?: string;`

The `cancel` property disables specifies a selector to be used to prevent drag initialization (e.g. `.body`).

#### `extendsProps?: { [key: string]: any };`

This property is used to pass the other props to the component.

e.g.

``` javascript
const extendsProps = {
  data-foo: 'foo',
  onMouseOver: () => {},
};

<Rnd extendsProps={extendsProps} />
```

#### `dragAxis?: 'x' | 'y' | 'both' | 'none'`

The direction of allowed movement (dragging) allowed ('x','y','both','none').

#### `bounds?: string;`

Specifies movement boundaries. Accepted values:
 - `parent` restricts movement within the node's offsetParent
    (nearest node with position relative or absolute), or
 - Selector, like `.fooClassName`.


#### `enableUserSelectHack?: boolean;`

By default, we add 'user-select:none' attributes to the document body    
to prevent ugly text selection during drag. If this is causing problems    
for your app, set this to `false`.    


## Callback

#### `onResizeStart?: RndResizeStartCallback;`

`RndResizeStartCallback` type is below.

``` javascript
export type RndResizeStartCallback = (
  e: SyntheticMouseEvent<HTMLDivElement> | SyntheticTouchEvent<HTMLDivElement>,
  dir: ResizeDirection,
  refToElement: React.ElementRef<'div'>,
) => void;
```

Calls when resizable component resize start.

#### `onResize?: RndResizeCallback;`

`RndResizeCallback` type is below.

``` javascript
export type RndResizeCallback = (
  e: MouseEvent | TouchEvent,
  dir: ResizeDirection,
  refToElement: React.ElementRef<'div'>,
  delta: ResizableDelta,
  position: Position,
) => void;
```

Calls when resizable component resizing.

#### `onResizeStop?: RndResizeCallback;`

`RndResizeCallback` type is below.

``` javascript
export type RndResizeCallback = (
  e: MouseEvent | TouchEvent,
  dir: ResizeDirection,
  refToElement: React.ElementRef<'div'>,
  delta: ResizableDelta,
  position: Position,
) => void;
```

Calls when resizable component resize stop.

#### `onDragStart: DraggableEventHandler;`

Callback called on dragging start.

``` javascript
type DraggableData = {
  node: HTMLElement,
  x: number,
  y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number
};

type DraggableEventHandler = (
  e: SyntheticMouseEvent | SyntheticTouchEvent, data: DraggableData,
) => void | false;
```

#### `onDrag: DraggableEventHandler;`

`onDrag` called with the following parameters:

``` javascript
type DraggableData = {
  node: HTMLElement,
  x: number,
  y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number
};

type DraggableEventHandler = (
  e: SyntheticMouseEvent | SyntheticTouchEvent, data: DraggableData,
) => void | false;
```

#### `onDragStop: DraggableEventHandler;`

`onDragStop` called on dragging stop.


``` javascript
type DraggableData = {
  node: HTMLElement,
  x: number,
  y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number
};

type DraggableEventHandler = (
  e: SyntheticMouseEvent | SyntheticTouchEvent, data: DraggableData,
) => void | false;
```

## Instance API


#### `updateSize(size: { width: string | number, height: string | number })`

Update component size.
For example, you can set `300`, `'300px'`, `50%`.

- for example

``` js
class YourComponent extends Component {

  ...

  update() {
    this.rnd.updateSize({ width: 200, height: 300 });
  }

  render() {
    return (
      <Rnd ref={c => { this.rnd = c; }} ...rest >
        example
      </Rnd>
    );
  }
  ...
}
```

#### `updatePosition({ x: number, y: number }): void`

Update component position.
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
      <Rnd ref={c => { this.rnd = c; }} ...rest >
        example
      </Rnd>
    );
  }

  ...
}
```

#### `updateZIndex(z: number): void`

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
      <Rnd ref={c => { this.rnd = c; }} ...rest>
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

## Contribute

If you have a feature request, please add it as an issue or make a pull request.

If you have a bug to report, please reproduce the bug in [WebpackBin](https://www.webpackbin.com/bins/-Ku4nRhImIfnt9N08lGu) to help us easily isolate it.

## Changelog

#### v7.4.2

fix: `isMounted` and `(!this.state.isMounted) return <div />` line #356

#### v7.4.1

- fix: Fixed Array.from error in IE11

#### v7.4.0

- fix: add `enableUserSelectHack?: boolean;`.

#### v7.3.1

- chore(deps): upgrade deps
- chore(deps): upgrade lint and remove unused state
- chore(deps): install prettier

#### v7.3.0

- chore(deps): upgrade re-resizable

#### v7.2.0

Support for cancel feature of react-draggable #206

#### v7.1.5

Fixed a issue #199 Add enableUserSelectHack props to react-draggable

#### v7.1.4

Fixed a issue #188 maxWidth and maxHeight props don't respect after resize

#### v7.1.3

Fixed a bug, `extendProps` is not passed correctly.
Fixed a bug, `bounds` is not work correctly. (#162)

#### v7.1.1 / v7.1.2

- Add internal props.

#### v7.1.0

- Add `size`.
- Add `position`.

#### v7.0.0

- Add `default` instead of `x`, `y`, `width`, `height`.
- Add `resizeHandleWrapperClass` and `resizeHandleWrapperStyle`.

#### v6.0.1

- Remove unnecessary types.

#### v6.0.0

- Use rollup.
- Support % min/max size.
- Change props, remove `default` and add `x`, `y`, `width`, `height`.
- Rename `dragHandlersXXXX` and `resizeHandlersXXXX` props to `dragHandleXXXX` and `resizeHandleXXXX`.

#### v5.1.3

- Fix cursor style, set `normal` to cursor style when `dragHandlerClassName` is not empty.

#### v5.1.2

- Add position `relative` when component will update.

#### v5.1.1

- Add `top: 0`, `left: 0`.
- Add position `relative` when parent position equals `static`.

#### v5.1.0

- Update dependencies(`react-draggable v3`, `flow-bin v0.53`, and other...)

#### v5.0.9

- Fix bug new `z` props is not applied to state.

#### v5.0.8

- Add `extendsProps`. #129

#### v5.0.7

- Add `disableDragging` props.

#### v5.0.6

- Fix flow error.

#### v5.0.5

- Add index.js.flow

#### v5.0.4

- Fix Issue #117.

#### v5.0.3

- Fix `updateZIndex`.
- Fix `updateSize`.
- Fix left and top bounds.

#### v5.0.2

- Fix argument events #100

#### v5.0.1

- Fix example
- Update README

#### v5.0.0

- Fix resize bounds.
- Modify API.
- Use original `react-draggable`.


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

Copyright (c) 2017 bokuweb

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
