const webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/App'
  },
  output: {
    filename: 'public/build/bundle.js',
    sourceMapFilename: 'public/build/bundle.map.js'
  },
  devtool: '#source-map',
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: true,
        drop_console: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ] : [],
  module: {
    loaders: [
      {test: /\.js?$/, loader: 'babel-loader', exclude: /(node_modules)/, query: {presets: ['react', 'es2015']}},
      {test: /(\.css|\.scss)$/, loaders: ['style-loader', 'css-loader', 'sass-loader']}
    ]
  }
}
