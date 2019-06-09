const path = require('path');

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /.*\.(ts|tsx|js|jsx)$/,
    loader: require.resolve('babel-loader'),
  });

  config.resolve.extensions.push('.ts', '.tsx', '.js', '.jsx');

  return config;
};