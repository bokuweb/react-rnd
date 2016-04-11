module.exports = config => {
  config.set({

    basePath: '',

    frameworks: ['mocha', 'browserify'],

    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      'test/*.js',
    ],

    exclude: [
    ],

    browserify: {
      debug: true,
      extensions: ['.js'],
      transform: [
        require('babelify').configure({
          plugins: ['babel-plugin-espower'],
        }),
      ],
    },

    preprocessors: {
      'test/*.js': ['browserify'],
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS'],

    singleRun: true,
  })
}
