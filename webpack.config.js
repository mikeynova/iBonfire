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
          options: {
            presets: ['es2015', 'react', 'stage-1']
          }
        }
      }
    ]
  }
}
