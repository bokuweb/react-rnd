import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

export default {
  input: 'src/index.js',
  plugins: [
    babel({
      plugins: ['external-helpers'],
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  ],
  sourcemap: true,
  exports: 'named',
  name: 'react-rnd',
  external: ['react', 're-resizable', 'react-draggable', 'react-dom'],
  globals: {
    react: 'React',
    're-resizable': 'Resizable',
    'react-draggable': 'Draggable',
    'react-dom': 'ReactDOM',
  },
};
