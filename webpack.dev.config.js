const { resolve } = require('path')
const CopyWebpackPlugin=require('copy-webpack-plugin')
const MiniCSSExtractPlugin=require('mini-css-extract-plugin')
const config = {
  entry: './client/main.jsx',
  mode: 'development',
  output: {
    filename: 'js/[name].bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'eval-source-map',
  target: 'web',
  devServer: {
hot: true,
contentBase: resolve(__dirname, 'dist'),
port: 3080,
host: 'localhost',
index: 'index.html',
overlay: {
  warnings: false,
  errors: true
},
    proxy: [
      {
        context: ['/api', '/auth', '/socket.io'],
        target: `http://localhost:${process.env.PORT || 8090}`,
        secure: false,
        changeOrigin: true,
        ws: true
      }
    ]
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: [
          {
            loader: MiniCSSExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [

    new MiniCSSExtractPlugin({
      filename: 'css/main.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${__dirname}/client/index.html`,
          to: 'index.html'
        }
      ]
    })
  ]
}

module.exports = config