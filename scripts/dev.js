// Rollup plugins.

import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

export default {
  dest: 'build/index.js',
  entry: 'src/index.js',
  format: 'iife',
  moduleName: 'Example',
  plugins: [
    babel({
      babelrc: true,
      exclude: 'node_modules/**',
      presets: [['es2015', { modules: false }], 'react'],
      plugins: ['external-helpers', 'transform-class-properties'],
    }),
    cjs({
      exclude: 'node_modules/process-es6/**',
      include: [
        'node_modules/fbjs/**',
        'node_modules/object-assign/**',
        'node_modules/react/**',
        'node_modules/react-dom/**',
        'node_modules/prop-types/**',
        'node_modules/lodash.isequal/**',
        'node_modules/create-react-class/**',
        'node_modules/performance-now/**',
        'node_modules/raf/**',
      ],
    }),
    globals(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    resolve({
      browser: true,
      main: true,
    }),
  ],
  globals: {
    react: 'React',
    're-resizable': 'Resizable',
    'react-draggable': 'Draggable',
  },
  sourceMap: true,
};
