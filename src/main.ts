/*
 * @Author: xujun
 * @Date: 2020-04-17 11:16:33
 * @LastEditTime: 2020-04-17 15:37:20
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/main.ts
 * @Description: 项目入口文件
 */

import { createApp } from 'vue';
import App from './App.vue'

import router from './router'

import fastclick from 'fastclick'
import 'common/stylus/index.styl'

fastclick.attach(document.body)

createApp(App)
  .use(router)
  .mount('#app')
