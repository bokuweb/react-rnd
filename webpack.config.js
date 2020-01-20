// Copyright 2018 Google LLC.
// SPDX-License-Identifier: Apache-2.0

const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: {
    main: "./src"
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.js",
  },
  
  module: {
    rules: [
      {
        test: /\.css$/, 
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: "[name].css", allChunks: true}),
    new HtmlWebpackPlugin({template: "./src/index.html"})
  ]
}