const path = require("path");
const webpack = require("webpack");
 const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
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
  resolve: {
    alias: {
      "~": path.join(__dirname, "src/")
    }
  },

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].[contenthash:7].css",
      chunkFilename: "css/[id].[contenthash:7].css"
    }),
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new UglifyJSPlugin()
  ],

  mode: "production"
};



module.exports = merge(commonConfig, prodConfig);