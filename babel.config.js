/*
 * @Author: xujun
 * @Date: 2020-04-17 13:45:03
 * @LastEditTime: 2020-04-17 13:45:32
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/babel.config.js
 * @Description: babel setting
 */
module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es.promise',
        'es.symbol'
      ]
    }]
  ]
}