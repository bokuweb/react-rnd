# react-resizable-and-movable

Resizable and movable component for React.

[![Build Status](https://travis-ci.org/bokuweb/react-resizable-and-movable.svg?branch=master)](https://travis-ci.org/bokuweb/react-resizable-and-movable)
[![License](http://img.shields.io/npm/l/object.assign.svg)](https://github.com/bokuweb/react-resizable-box#license)

## Demo

![screenshot](https://raw.githubusercontent.com/bokuweb/react-resazable-and-movable/master/screenshot.gif)
See demo: [http://bokuweb.github.io/react-resizable-and-movable](http://bokuweb.github.io/react-resizable-and-movable)

## Important Note

This is an alpha release. Use with caution and hope.

## Installation

```sh
npm i react-resizable-and-movable
```

## Overview

### Basic

``` javascript
      <ResizableAndMovable
         start={{x:20, y:20, width:200, height:200}}
        <p>Example</p>
      </ResizableAndMovable>
```

### With min/max width/height and callbacks

``` javascript
      <ResizableAndMovable
         start={{x:20, y:20, width:200, height:200}}
         minWidth={200}
         minHeight={200}
         maxWidth={300}
         maxHeight={300}
         onResizeStart={() => console.log('resize start')}
         onResize={size => console.log(size)}
         onResizeStop={size => console.log('resize stop')}
         onDragStart={() => console.log('drag start')}
         onDrag={(e, ui) => {
           console.dir(ui);
           console.log(e);
         }}
         onDragStop={(e, ui) => console.log('drag stop')} >
        <p>Example</p>
        <p>start 200px x 200px</p>
        <p>min 200px x 200px</p>
        <p>max 300px x 300px</p>
      </ResizableAndMovable>
```
## Properties

#### start {x: number, y:number, width:number, height:number}

Specifies the `x` ,`y`, `width` and `height` that the component should start at.


#### minWidth {number}

Specifies the minimum width of the component.
This is generally not necessary to use.

#### minHeight {number}

Specifies the minimum height of the component.
This is generally not necessary to use.

#### maxWidth {number}

Specifies the maximum width of the component.
This is generally not necessary to use.

#### maxHeight {number}

Specifies the maximum height of the component.
This is generally not necessary to use.

#### customClass {string}

The css class set on the component.
This is generally not necessary to use.

#### customStyle {object}

The css style set on the component.
This is generally not necessary to use.

#### onClick {func}

Callback called on component clicked.

#### onTouchStart {func}

Callback called on component touched.

#### onResizeStart {func}

Callback called on resize start.   

#### onResize {func}

Callback called on resizing.   
Receives the box size `{width: number, height: number}` as argument.

#### onResizeStop {func}

Callback called on resize stop.
Receives the box size `{width: number, height: number}` as argument.

#### onDrageStart {func}

Callback called on dragging start.   

#### onDrage {func}

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

#### onDrageStop {func}

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

## Test

``` sh
npm t
```

## License

The MIT License (MIT)

Copyright (c) 2016 @Bokuweb

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
