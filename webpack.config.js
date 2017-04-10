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
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js?$/, loader: 'babel-loader', exclude: /(node_modules)/, query: {presets: ['react', 'es2015']}},
      {test: /(\.css|\.scss)$/, loaders: ['style-loader', 'css-loader', 'sass-loader']}
    ]
  }
}
