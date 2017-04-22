/* eslint "flowtype/require-valid-file-annotation": 0 */
/* eslint "import/no-commonjs": 0 */

const path = require('path');
const webpack = require('webpack');
const AsyncAwaitPlugin = require('webpack-async-await');

const BASE_PLUGINS = [
  new AsyncAwaitPlugin({}),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  })
];

const rules = [
  {
    test: /\.js$/,
    use: 'babel-loader',
    // include: path.resolve(__dirname, 'src'),
    exclude: /node_modules/,
  }
];

const createEntry = () => {
  if (process.env.NODE_ENV === 'example') {
    return './docs/src/index.js';
  }
  return process.env.NODE_ENV === 'production'
    ? [
      './src/main.js',
    ]
    : [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3333',
      'webpack/hot/only-dev-server',
      './src/main.js',
    ];
};

const createOutput = () => {
  if (process.env.NODE_ENV === 'example') {
    return {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'docs/dist'),
    };
  }
  return {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  };
};

module.exports = () => ({
  entry: createEntry(),
  output: createOutput(),
  devServer: {
    contentBase: 'public/',
    historyApiFallback: true,
    port: 3333,
    hot: true,
  },
  plugins: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'example'
    ? BASE_PLUGINS.concat([
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: false,
        compressor: {
          warnings: false,
        },
        output: {
          comments: false,
        },
      }),
    ])
    : BASE_PLUGINS.concat([
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ]),
  module: { rules },
});
