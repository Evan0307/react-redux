const path = require("path");
const webpack = require("webpack");
 const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const commonConfig = require('./webpack.common.config.js');

const prodConfig = {
 
  devtool: "cheap-module-source-map",

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader","postcss-loader"]
      },
     
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, // creates style nodes from JS strings
          "css-loader?modules&localIdentName=[local]-[hash:base64:5]", // translates CSS into CommonJS
          "postcss-loader",
          "less-loader" // compiles Less to CSS
        ]
      }
     
    ]
  },
  
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].[contenthash:7].css",
      chunkFilename: "css/[id].[contenthash:7].css"
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      // manifest就是我们第一步中打包出来的json文件
      manifest: require('./public/dll_static/vendor-manifest.json'),
    }),
    new AddAssetHtmlPlugin([
      {
          // 要添加到编译中的文件的绝对路径，以及生成的HTML文件。支持globby字符串
          filepath: require.resolve(path.resolve(__dirname, 'public/dll_static/vendor.js')),
          // 文件输出目录
          outputPath: 'vendor',
          // 脚本或链接标记的公共路径
          publicPath: 'vendor'
      }
  ]),
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    
   
  ],

  mode: "production"
};



module.exports = merge(commonConfig, prodConfig);