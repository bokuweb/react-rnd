import React from "react";
import { storiesOf } from "@storybook/react";
import "./styles.css";

import BasicUncontrolled from "./basic/uncontrolled";
import BasicControlled from "./basic/controlled";

import BoundsParentUncontrolled from "./bounds/parent-uncontrolled";
import BoundsParentControlled from "./bounds/parent-controlled";

storiesOf("basic", module)
  .add("uncontrolled", () => <BasicUncontrolled />)
  .add("controlled", () => <BasicControlled />);

storiesOf("bounds", module)
  .add("uncontrolled", () => <BoundsParentUncontrolled />)
  .add("controlled", () => <BoundsParentControlled />);
