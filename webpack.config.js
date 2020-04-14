module.exports = {
  entry: [
    './client/index.js'
  ],
  mode: 'development',
  output: {
    path: __dirname + '/client/dist',
    filename: "bundle.js"
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/, 
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
}
