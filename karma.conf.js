const path = require('path');

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'src/**/*.test.js',
    ],

    preprocessors: {
      'src/**/*.test.js': ['webpack'],
    },

    webpack: {
      devtool: 'inline-source-map',
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: path.resolve(__dirname, 'node_modules'),
          },
          {
            test: /\.json$/,
            loader: 'json-loader',
          },
        ],
      },
    },

    webpackServer: {
      noInfo: true,
    },

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-nightmare',
      'karma-mocha-reporter',
    ],

    nightmareOptions: {
      width: 800,
      height: 560,
      show: false,
    },

    reporters: ['mocha'],
    port: 9876,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Nightmare'],
    singleRun: true,
  });
};
