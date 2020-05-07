/*
 * @Author: xujun
 * @Date: 2020-04-17 11:16:33
 * @LastEditTime: 2020-05-07 09:12:56
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/main.ts
 * @Description: 项目入口文件
 */

import { createApp } from 'vue';
import App from './App.vue'

import router from './router'

import Fastclick from 'fastclick'
import { lazyLoad } from './plugins/lazy-load'
import 'common/stylus/index.styl'

Fastclick(document.body)

createApp(App as any)
  .use(router)
  .use(lazyLoad, {
    defaultImg: require('./common/image/default.png')
  })
  .mount('#app')
