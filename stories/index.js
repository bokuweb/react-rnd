import React from 'react';
import { storiesOf } from '@storybook/react';
import './styles.css';

import BoundsAndOffset from './bounds-and-offset';
import Basic from './basic';
import Multi from './multiple';
import BoundsParent from './bounds-parent';
import SizePercentage from './size-percentage';
import SizeAndPosition from './size-and-position';
import MaxSizeWithPercent from './max-size-with-percent';
// import Sandbox from './sandbox';

storiesOf('react-rnd', module)
  .add('bounds and offset', () => <BoundsAndOffset />)
  .add('basic', () => <Basic />)
  .add('bound parent', () => <BoundsParent />)
  .add('bound multiple', () => <Multi />)
  .add('size percentage', () => <SizePercentage />)
  .add('max size with percent', () => <MaxSizeWithPercent />)
  .add('use size and position instaead of default', () => <SizeAndPosition />);
