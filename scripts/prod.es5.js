import common from './prod.common';

export default Object.assign({}, common, {
  output: {
    file: 'lib/index.es5.js',
    format: 'cjs',
  },
});
