import shell from 'shelljs'
import path from 'path'
import ora from 'ora'
import webpack from 'webpack'
import webpackAppConfig from './webpack.prod.conf'
import webpackEmbedConfig from './webpack.embed.conf'
import webpackEmbedLegacyConfig from './webpack.embed-legacy.conf'
import webpackCheckConfig from './webpack.check.conf'

const distRoot = path.resolve(__dirname, '../dist')

const spinner = ora('building for production...')
spinner.start()

shell.rm('-rf', distRoot)
shell.mkdir('-p', `${distRoot}/assets`)
shell.cp('-R', 'static/', `${distRoot}/assets`)

;[
  webpackAppConfig,
  webpackEmbedConfig,
  webpackEmbedLegacyConfig,
  webpackCheckConfig
]
.forEach(webpackConfig =>
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
  })
)
