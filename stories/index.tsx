import React from "react";
import { storiesOf } from "@storybook/react";
import "./styles.css";

import Bare from "./bare/bare";

import BasicUncontrolled from "./basic/uncontrolled";
import BasicControlled from "./basic/controlled";

import ScaleParentUnControlled from "./scale/parent-uncontrolled";
import ScaleWindowUnControlled from "./scale/window-uncontrolled";
import ScaleBodyUnControlled from "./scale/body-uncontrolled";

import BasicMultiUncontrolled from "./basic/multi-uncontrolled";
import BasicMultiControlled from "./basic/multi-controlled";

import BoundsParentUncontrolled from "./bounds/parent-uncontrolled";
import BoundsParentControlled from "./bounds/parent-controlled";
import BoundsSelectorUncontrolled from "./bounds/selector-uncontrolled";
import BoundsSelectorControlled from "./bounds/selector-controlled";
import BoundsWindowControlled from "./bounds/window-controlled";
import BoundsBodyControlled from "./bounds/body-controlled";

import SizePercentUncontrolled from "./size/size-percent-uncontrolled";
import SizePercentControlled from "./size/size-percent-controlled";

import Callbacks from "./callback/callbacks";

import Cancel from "./cancel/cancel";

import SandboxBodySizeToMaxWidth from "./sandbox/bodysize-to-maxwidth";
import SandboxLockAspectRatioWithBounds from "./sandbox/lock-aspect-ratio-with-bounds";

import LockAspectRatioBasic from "./lock-aspect-ratio/basic";

storiesOf("bare", module).add("bare", () => <Bare />);

storiesOf("basic", module)
  .add("uncontrolled", () => <BasicUncontrolled />)
  .add("controlled", () => <BasicControlled />)
  .add("multi uncontrolled", () => <BasicMultiUncontrolled />)
  .add("multi controlled", () => <BasicMultiControlled />);

storiesOf("bounds", module)
  .add("parent uncontrolled", () => <BoundsParentUncontrolled />)
  .add("parent controlled", () => <BoundsParentControlled />)
  .add("selector uncontrolled", () => <BoundsSelectorUncontrolled />)
  .add("selector controlled", () => <BoundsSelectorControlled />)
  .add("window controlled", () => <BoundsWindowControlled />)
  .add("body controlled", () => <BoundsBodyControlled />);

storiesOf("scale", module)
  .add("with parent boundary", () => <ScaleParentUnControlled />)
  .add("with body boundary", () => <ScaleBodyUnControlled />)
  .add("with window boundary", () => <ScaleWindowUnControlled />);

storiesOf("size", module)
  .add("percent uncontrolled", () => <SizePercentUncontrolled />)
  .add("percent controlled", () => <SizePercentControlled />);

storiesOf("callbacks", module).add("callback", () => <Callbacks />);

storiesOf("cancel", module).add("cancel", () => <Cancel />);

storiesOf("sandbox", module)
  .add("body size apply to maxwidth", () => <SandboxBodySizeToMaxWidth />)
  .add("lock aspect ratio with bounds", () => <SandboxLockAspectRatioWithBounds />);

storiesOf("ratio", module).add("lock aspect ratio", () => <LockAspectRatioBasic />);
