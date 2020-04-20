/*
 * @Author: xujun
 * @Date: 2020-04-17 11:23:47
 * @LastEditTime: 2020-04-20 09:40:52
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/vue.config.js
 * @Description: vue 配置
 */
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'src': resolve('src'),
        'common': resolve('src/common'),
      }
    }
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://ustbhuangyi.com/music/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  assetsDir: 'static'
}