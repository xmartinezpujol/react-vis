const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  DEPLOY: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
};

module.exports = {
  entry: {
    app: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
            options: { minimize: false },
          },
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: paths.DEPLOY,
    publicPath: '/',
  },
};
