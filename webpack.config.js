var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  entry: {
    app: './app/index.js'
  },

  resolve: {
    root: __dirname
  },

  output: {
    path: __dirname + '/public',
    filename: 'js/[name].js'
  },

  node: {
    fs: 'empty'
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'css?sourceMap!' +
          'sass?sourceMap'
        ),
        exclude: /node_modules|dist/
      },
      {
        test: /\.json$/,
        include: path.join(__dirname, 'node_modules', 'pixi.js'),
        loader: 'json',
      },
      {
        test: /\.js$/,
        exclude: /node_modules|dist/,
        loaders: ['babel?stage=0', 'eslint']
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('css/app.css')
  ],

  eslint: {
    configFile: '.eslintrc'
  }
};
