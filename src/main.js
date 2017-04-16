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
  const { default: Rnd } = (await import('./components/rnd'));
  ReactDOM.render(
    <AppContainer>
      <div className="test" style={{width: '1000px', height: '600px', background: 'blue',margin: '100px'}}>
      <div className="stest" style={{width: '800px', height: '600px', background: 'red',margin: '200px'}}>
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
        bounds=".test"
      >
        Draggable
      </Rnd>
      </div>
      </div>
    </AppContainer>,
    root,
  );
};
render();
if (module.hot) module.hot.accept('./components/rnd', render);
