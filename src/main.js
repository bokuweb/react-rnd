/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/first */
/* eslint-disable no-shadow */

import 'babel-polyfill';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
// import Hello from './components/Hello';

const root = document.querySelector('.main');

const render = async () => {
  const { default: Hello } = (await import('./components/Hello'));
  ReactDOM.render(
    <AppContainer>
      <Hello>
        <div style={{ background: '#333' }}>Draggable</div>
      </Hello>
    </AppContainer>,
    root,
  );
};
render();
if (module.hot) module.hot.accept('./components/Hello', render);
