const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');



 const commonConfig = {
  /*入口*/
  entry: {
    app: [path.join(__dirname, "src/index.js")],
    vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
  },
  /*输出到dist文件夹，输出文件名字为bundle.js*/
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "js/[name].[hash].js",
    chunkFilename: 'js/[name].[chunkhash].js'
  },

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
        test: /\.(png|jpg|gif)$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 8192
            }
        }]
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/"
          }
        },
        {
          loader: "image-webpack-loader"
        }
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
   new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(__dirname, 'src/index.html'),
   }),


  ],


};


module.exports= commonConfig 