const webpack = require('webpack')
const { resolve } = require('path')

const dirRoot = resolve(__dirname)
const dirSource = resolve(dirRoot, 'src')
const dirOutput = resolve(dirRoot, 'dist')

module.exports = () => ({
  target: 'node',
  context: dirSource,
  entry: {
    'tests': resolve(dirSource, 'test/index.js')
  },
  output: {
    path: dirOutput,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
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
    new webpack.NoErrorsPlugin()
  ]
})
