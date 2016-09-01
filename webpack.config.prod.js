import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV' : JSON.stringify('production')
};

export default {
  debug: false,
  noInfo: false,
  entry:  './src/index',
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel'], exclude: /node_modules/},
      {test: /(\.css)$/, loader: ExtractTextPlugin.extract("css?sourceMap"), exclude: /node_modules/},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file', exclude: /node_modules/},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000', exclude: /node_modules/},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream', exclude: /node_modules/},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml', exclude: /node_modules/},
    ]
  }
};
