/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/first */
/* eslint-disable no-shadow */

import 'babel-polyfill';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';

const root = document.querySelector('.main');

const render = async () => {
  const { default: Rnd } = (await import('./components/'));
  ReactDOM.render(
    <AppContainer>
      <Rnd
        style={{ background: '#ccc' }}
        default={{
          x: 0,
          y: 0,
          width: 320,
          height: 200,
        }}
        minWidth={200}
        minHeight={100}
      >
        Draggable
      </Rnd>
    </AppContainer>,
    root,
  );
};
render();
if (module.hot) module.hot.accept('./components/', render);
