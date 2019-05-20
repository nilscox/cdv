/* eslint-disable */

const path = require('path');
const webpack = require('webpack');

module.exports = {

  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'assets', 'js', 'dist'),
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      PRODUCTION_URL: 'http://localhost:8000',
      IFRAME_URL: 'http://localhost:8000/popup-iframe.html',
    }),
  ],

};