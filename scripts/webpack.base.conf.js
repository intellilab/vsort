const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const { isDev, isProd, styleRule, resolve } = require('./utils');

const DIST = 'dist';
// const extractSVG = isProd;

const defaultStyleOptions = {
  loaders: ['postcss-loader'],
};

const baseConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output: {
    path: resolve(DIST),
    publicPath: '',
    filename: '[name].js',
  },
  resolve: {
    // Tell webpack to look for peer dependencies in `node_modules`
    // when packages are linked from outside directories
    modules: [resolve('node_modules')],
    extensions: ['.js'],
    alias: {
      '#': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [resolve('src'), resolve('test')],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        }],
        exclude: [resolve('src/resources/icons')],
      },
      {
        test: /\.svg$/,
        use: [{
          loader: 'svg-sprite-loader',
          options: {
            // extract: extractSVG,
          },
        }],
        include: [resolve('src/resources/icons')],
      },
      // CSS modules: src/**/*.module.css
      styleRule({ ...defaultStyleOptions, modules: true }, {
        test: /\.module\.css$/,
        exclude: [resolve('node_modules')],
      }),
      // normal CSS files: src/**/*.css
      styleRule({ ...defaultStyleOptions }, {
        exclude: [
          /\.module\.css$/,
          resolve('node_modules'),
        ],
      }),
      // library CSS files: node_modules/**/*.css
      Object.assign(styleRule(), {
        include: [resolve('node_modules')],
      }),
    ],
  },
  plugins: [
    isProd && new MiniCssExtractPlugin(),
    // extractSVG && new SpriteLoaderPlugin(),
  ].filter(Boolean),
};

module.exports = baseConfig;
