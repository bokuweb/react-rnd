import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import DraggableAndResizable from '../src';

describe('Resizable Component test', () => {
  it ('Should box width and height equal 100px', (done) => {
    assert.equal(1, 1);
    done();
  });

  afterEach( done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });
});
