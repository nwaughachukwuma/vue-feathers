import path from 'path'
import utils from './utils'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FriendlyErrors from 'friendly-errors-webpack-plugin'

const distRoot = path.resolve(__dirname, '../dist')

export default {
  context: path.resolve(__dirname, "../"),
  entry: {
    'assets/js/app': ['./build/dev-client', './src/main.js']
  },
  output: {
    path: distRoot,
    publicPath: '/',
    filename: '[name].js'
  },
  devtool: '#eval-source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json', '.pug', '.sass', '.yaml'],
    alias: {
      'vue': 'vue/dist/vue.js',
      'src': path.resolve(__dirname, '../src'),
      'img': path.resolve(__dirname, '../src/img'),
    }
  },
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      favicon: './src/img/favicon.ico',
      inject: true,
      chunksSortMode: 'dependency'
    }),
    new FriendlyErrors()
  ],
  module: {
    rules: [
      ...utils.styleLoaders({
        sourceMap: true,
        extract: false
      }),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: utils.cssLoaders({
            sourceMap: true,
            extract: false
          }),
          postcss: [
            autoprefixer({
              browsers: ['last 2 versions']
            })
          ]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.pug?$/,
        loader: 'pug-loader'
      }
    ]
  }
}
