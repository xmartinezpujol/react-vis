const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    port: 3001,
    compress: true,
    historyApiFallback: true,
    contentBase: './dist',
  },
});
