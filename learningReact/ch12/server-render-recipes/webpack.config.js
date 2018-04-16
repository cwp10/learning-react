var webpack = require("webpack")
var path = require("path")

module.exports = {
  entry: "./index-client.js",
  output: {
    path: path.join(__dirname, 'assets'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'stage-0', 'react']
        }
      }
    ]
  }
}