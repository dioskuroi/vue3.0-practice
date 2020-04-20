/*
 * @Author: xujun
 * @Date: 2020-04-17 14:41:57
 * @LastEditTime: 2020-04-17 16:11:42
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/router/index.ts
 * @Description: router setting
 */
import {
  createRouter,
  createWebHistory,
  // createWebHashHistory,
  // createWebHistory
} from 'vue-router'

import Recommend from '../components/recommend/recommend.vue'
import Rank from '../components/rank/rank.vue'
import Search from  '../components/search/search.vue'
import Singer from '../components/singer/singer.vue'


const routerHistory = createWebHistory()

export default createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend as any
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    }
  ]
})