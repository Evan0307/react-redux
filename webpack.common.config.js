const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });//  手动创建进程池



 function resolve(dir) {
  return path.join(__dirname, dir)
}

 const commonConfig = {
  /*入口*/
  entry: {
    app: [path.join(__dirname, "src/index.js")],
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
        loader: 'happypack/loader?id=happyBabel',
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
          loader: "image-webpack-loader",
          options: {
            disable: true, // webpack@2.x and newer
          },
        }
      ]
    }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'], // 默认不带后缀名字的时候，按这个顺序查找
    modules: [ // 优化模块查找路径
      resolve('src'),
      resolve('node_modules') // 指定node_modules所在位置 当你import 第三方模块时 直接从这个路径下搜索寻找
    ],
    alias: {
      "~": path.join(__dirname, "src/")
    }
  },

  plugins: [
    new HappyPack({
      // 这个HappyPack的“名字”就叫做happyBabel，和楼上的查询参数遥相呼应
      id: 'happyBabel',
      // 指定进程池
      threadPool: happyThreadPool, //共享进程池中的子进程处理任务， 防止资源占用过多
      loaders: ['babel-loader?cacheDirectory'],
      threads : 4 ,// 开启子进程的个数
      verbose: true , // 允许输出日志
    }),
   new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(__dirname, 'src/index.html'), // 如果未指定chunk  会把入口文件的所有 chunk 都动态插入到 html 文件
   }),


  ],


};


module.exports= commonConfig 