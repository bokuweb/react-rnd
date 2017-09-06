import React from 'react';
import { storiesOf } from '@storybook/react';
import './styles.css';

import Basic from './basic';
import Multi from './multiple';
import BoundsParent from './bounds-parent';

storiesOf('react-rnd', module)
  .add('basic', () => <Basic />)
  .add('bound parent', () => <BoundsParent />)
  .add('bound multiple', () => <Multi />);
