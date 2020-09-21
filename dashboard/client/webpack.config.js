const AssetsPlugin = require('assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const resolve = relativePath => path.resolve(__dirname, relativePath);

let config = {
  mode: 'development',
  devtool: 'eval',
  entry: {
    'dashboard': resolve('./client.js'),
  },
  output: {
    filename: 'js/[name].[hash].bundle.js',
    chunkFilename: 'js/[name].[hash].chunk.js',
    path: path.resolve(__dirname, '../bff/public/assets'),
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        parser: { system: false },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              syntax: 'postcss-scss',
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]',
          outputPath: 'images/',
          publicPath: '../images/',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'fonts/',
          publicPath: '../fonts/',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].bundle.css',
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['!fonts/*.**', '!vendor/*.**'],
    }),
    new AssetsPlugin({
      filename: './bff/assets.json',
      useCompilerPath: false,
    }),
    require('postcss-import'),
    require('postcss-preset-env'),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      'systemjs$': 'systemjs/dist/system.min.js',
      'microfrontends$': 'microfrontends/Microfrontends.js',
    },
  },
};

module.exports = config;
