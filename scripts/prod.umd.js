import common from './prod.common';

export default Object.assign({}, common, {
  output: {
    file: 'lib/react-rnd.umd.js',
    format: 'umd',
  },
});
