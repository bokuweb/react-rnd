import React from "react";
import { storiesOf } from "@storybook/react";
import "./styles.css";

import Bare from "./bare/bare";

import BasicUncontrolled from "./basic/uncontrolled";
import BasicControlled from "./basic/controlled";

import BoundsParentUncontrolled from "./bounds/parent-uncontrolled";
import BoundsParentControlled from "./bounds/parent-controlled";

import BoundsSelectorUncontrolled from "./bounds/selector-uncontrolled";
import BoundsSelectorControlled from "./bounds/selector-controlled";

storiesOf("bare", module).add("bare", () => <Bare />);

storiesOf("basic", module)
  .add("uncontrolled", () => <BasicUncontrolled />)
  .add("controlled", () => <BasicControlled />);

storiesOf("bounds", module)
  .add("parent uncontrolled", () => <BoundsParentUncontrolled />)
  .add("parent controlled", () => <BoundsParentControlled />)
  .add("selector uncontrolled", () => <BoundsSelectorUncontrolled />)
  .add("selector controlled", () => <BoundsSelectorControlled />);
