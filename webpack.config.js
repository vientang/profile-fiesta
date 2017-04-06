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
      {
        loader: 'babel',
        test: /\.js?$/,
        exclude: /(node_modules)/,
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}
