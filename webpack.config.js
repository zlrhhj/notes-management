const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname,'./client/src/index.jsx'),
  output: {
    path:path.join(__dirname, 'client/dist'),
    filename: 'bundle.js'
  },
  devtool:"source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client/src'),
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      },
      {
        test: /\.css$/i,
        use:["style-loader", "css-loader"],
      },
      {
          test: /\.(png|svg|jpe?g|gif)$/i,
          type: 'asset/resource',
      }
    ]
  },
}