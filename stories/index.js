import React from 'react';
import { storiesOf } from '@storybook/react';
import './styles.css';

import Basic from './basic';
import Multi from './multiple';
import BoundsParent from './bounds-parent';
import SizePercentage from './size-percentage';
// import Sandbox from './sandbox';

storiesOf('react-rnd', module)
  .add('basic', () => <Basic />)
  .add('bound parent', () => <BoundsParent />)
  .add('bound multiple', () => <Multi />)
  .add('size percentage', () => <SizePercentage />);
