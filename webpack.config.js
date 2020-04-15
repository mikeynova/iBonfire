const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './client/index.js',
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
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
        // loaders: ['babel-loader'],

      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  plugins: [
    //will automatically inject bundle js into ./dist/index.html
    new HTMLWebpackPlugin()
]
}
