const path = require("path");
const webpack = require("webpack");
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');



 const  devConfig= {
  /*入口*/
  entry: {
    app: ["react-hot-loader/patch", path.join(__dirname, "src/index.js")],
   
  },

  output: {
     /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
    filename: "[name].[hash].js",
 
  },
  devtool: "inline-source-map",

  module: {
    rules: [
     
      {
        test: /\.css$/,
        use: [
          "style-loader", 
          "css-loader"
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.less$/,
        use: [
         'style-loader', // creates style nodes from JS strings
           'css-loader', // translates CSS into CommonJS
          'less-loader' // compiles Less to CSS
        ]
      }
     
    ]
  },
  resolve: {
    alias: {
      "~": path.join(__dirname, "src/")
    }
  },

  devServer: {
    hot: true,
    port: 8080,
    host: "0.0.0.0", //允许在同ip局域网下，移动端打开页,
    contentBase: path.join(__dirname, "./dist"),
    historyApiFallback: true //404页面重定向到index.html
    // proxy: {
    //     "/api": "http://localhost:3000"
    //   },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new MiniCssExtractPlugin({
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: 'css/[name].css',
    //   chunkFilename: 'css/[id].css',
    // }),
  ],

  


  mode: "development"
};




module.exports = merge({
  customizeArray(a, b, key) {
      /*entry.app不合并，全替换*/
      if (key === 'entry.app') {
          return b;
      }
      return undefined;
  }
})(commonConfig, devConfig);
