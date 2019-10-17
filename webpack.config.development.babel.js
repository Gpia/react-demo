// support: scss, less, hot-loader, mock, test

import webpack from 'webpack';
import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import bodyParser from 'body-parser';
import theme from './src/theme';
import MockData from './mock';

const resolve = dir => path.resolve(__dirname, dir);
const isNoMock = () => process.env.NO_MOCK === 'true';

export default {
  entry: resolve('src/index.js'),
  output: {
    path: resolve('dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].async.js',
  },
  devtool: 'source-map',
  devServer: {
    // security issue: invalid host header
    // disableHostCheck: true,
    contentBase: resolve('dist'),
    host: '0.0.0.0',
    port: 8080, // 端口号
    open: true,
    hot: true,
    overlay: {
      errors: true,
    },
    stats: {
      children: false,
      chunks: false,
      assets: false,
      modules: false,
    },
    before(app) {
      if (isNoMock()) {
        return;
      }
      // 返回模拟请求数据
      Object.keys(MockData).forEach(key => {
        const [type, url] = key.split(' ');
        const method = type.toLowerCase();
        app.use(url, bodyParser.json());
        app[method](url, MockData[key]);
      });
    },
    proxy: {
      '/tianji': {
        // 代理所有以 /tianji 开头的请求到 本地的 8093 端口。用于本地开发、测试使用。
        target: 'http://127.0.0.1:8093/',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: ['react-hot-loader/babel', 'dva-hmr'],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: theme,
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      {
        from: resolve('public'),
      },
    ]),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      src: resolve('src'),
      components: resolve('src/components'),
      containers: resolve('src/containers'),
      common: resolve('src/common'),
      assets: resolve('src/assets'),
      css: resolve('src/assets/css'),
      iconfont: resolve('src/assets/iconfont'),
      services: resolve('src/services'),
      utils: resolve('src/utils'),
    },
  },
};
