module.exports = {
  presets: [
    "@babel/preset-typescript",
    '@babel/preset-env',
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-transform-modules-commonjs",
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ],
};
