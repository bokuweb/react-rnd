import common from './prod.common';

export default Object.assign({}, common, {
  output: {
    file: 'lib/index.js',
    format: 'es',
  },
});
