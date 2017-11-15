import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackConfig from './webpack.conf'
import makeDevMiddleware from 'webpack-dev-middleware'
import makeHotMiddleware from 'webpack-hot-middleware'
import connectHistoryFallback from 'connect-history-api-fallback'

// default port where dev server listens for incoming traffic
const port = 8080

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = makeDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = makeHotMiddleware(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// handle fallback for HTML5 history API
app.use(connectHistoryFallback())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

devMiddleware.waitUntilValid(function () {
  console.log('> Listening on port ' + port + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

})
