const webpack = require('webpack')
const { resolve } = require('path')

const dirRoot = resolve(__dirname)
const dirSource = resolve(dirRoot, 'src')
const dirOutput = resolve(dirRoot, 'dist')

const libs = [
  'react',
  'react-dom',
]

module.exports = () => ({
  context: dirSource,
  entry: {
    client: resolve(dirSource, 'index.js'),
    vendor: libs
  },
  output: {
    path: dirOutput,
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  resolve: {
    modules: [dirRoot, 'node_modules'],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  ],
  devServer: {
    contentBase: dirOutput,
    historyApiFallback: true
  },
  devtool: 'source-map'
})
