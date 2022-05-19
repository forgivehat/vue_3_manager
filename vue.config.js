const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false
})

// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = 'Workers'

module.exports = {
  // ...
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve('src')
      }
    },
    amd: {
      // Cesium源码模块化使用的requireJs
      // 此配置允许webpack友好地在铯中使用require，使webpack打包cesium
      // 告诉Cesium, AMD的webpack版本用来评估要求的声明是不符合标准的toUrl功能
      toUrlUndefined: true
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(cesiumSource, cesiumWorkers),
            to: 'Workers'
          }
        ]
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(cesiumSource, 'Assets'),
            to: 'Assets'
          }
        ]
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(cesiumSource, 'Widgets'),
            to: 'Widgets'
          }
        ]
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(cesiumSource, 'ThirdParty/Workers'),
            to: 'ThirdParty/Workers'
          }
        ]
      }),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('./')
      }),
      // 使Cesium对象实例可在每个js中使用而无须import
      new webpack.ProvidePlugin({
        Cesium: ['cesium/Source/Cesium']
      })
    ],
    module: {
      unknownContextCritical: false,
      unknownContextRegExp: /\/cesium\/cesium\/Source\/Core\/buildModuleUrl\.js/
    }
  },

  chainWebpack(config) {
    // 设置 svg-sprite-loader
    // config 为 webpack 配置对象
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule('svg')
      // 忽略
      .exclude.add(resolve('src/icons'))
      // 结束
      .end()
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule('icons')
      // 正则，解析 .svg 格式文件
      .test(/\.svg$/)
      // 解析的文件
      .include.add(resolve('src/icons'))
      // 结束
      .end()
      // 新增了一个解析的loader
      .use('svg-sprite-loader')
      // 具体的loader
      .loader('svg-sprite-loader')
      // loader 的配置
      .options({
        symbolId: 'icon-[name]'
      })
      // 结束
      .end()
    config
      .plugin('ignore')
      .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },

  devServer: {
    https: false,
    // hotOnly: false,
    proxy: {
      '/api': {
        target: 'https://lianghj.top:8888/api/private/v1/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  css: {
    loaderOptions: {
      sass: {
        // 8版本用prependData (在package.json里看sass版本):
        prependData: `
          @import "@/styles/variables.scss";  // scss文件地址
          @import "@/styles/mixin.scss";     // scss文件地址
        `
      }
    }
  }
}
