const webpack = require('webpack');
const path = require('path');
const Glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'js/main.js': [
      './src/js/main.ts'
    ],
    'css/_init.css': [
      './src/css/_init.scss'
    ],
    'css/main.css': [
      './src/css/main.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, './web/app/themes/clean/assets/'),
    filename: '[name]'
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
    alias: {
        jquery: "jquery/src/jquery"
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
        filename: "[name]",
        disable: process.env.NODE_ENV === "development"
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        zindex: false
      }
    }),
    new CopyWebpackPlugin([
      {
        from: './src/images',
        to: './images',
        force: true
      },
      {
        from: './src/fonts',
        to: './fonts',
        force: true
      }
    ])
  ],
  module: {
    loaders: [
      { 
        test: /\.ts$/, 
        loader: 'ts-loader' 
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader?limit=100000' 
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ],
          fallback: "style-loader"
        })
      }
    ]
  }
};