
module.exports = {
  entry:'./src/index.js',
  output: {
    path:'./src',
    filename:'bundle.js'
  },
  devServer: {
    inline: true,
    contentBase: './src',
    historyApiFallback: {
      index: 'index.html'
    },
    port: 3333
  },
  module: {
    loaders: [
      {
        test:/\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }

}
