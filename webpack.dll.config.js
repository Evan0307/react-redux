const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: {
      // 依赖的库数组
      vendor: [
        'react-redux',
        'redux',
        'redux-thunk',
        'react',
        'react-dom',
        'react-router-dom',
      ]
    },
    output: {
      path: path.join(__dirname, 'public/dll_static'),
      filename: '[name].js',
      library: '_dll_[name]',
    },
    plugins: [
        new CleanWebpackPlugin(),
      new webpack.DllPlugin({
        // DllPlugin的name属性需要和libary保持一致
        name: '_dll_[name]',
        path: path.join(__dirname, 'public/dll_static', '[name]-manifest.json'),
        // context需要和webpack.config.js保持一致
        context: __dirname,
      }),
    ],
    mode : 'production'
}