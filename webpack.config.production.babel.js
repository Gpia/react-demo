import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import cssnano from 'cssnano';
import theme from './src/theme';

const { ANALYZE } = process.env;
const resolve = dir => path.resolve(__dirname, dir);

const config = {
  entry: resolve('src/index.js'),
  output: {
    path: resolve('dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].async.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[local]__[hash:base64:5]',
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
          MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
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

if (ANALYZE) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

export default config;
