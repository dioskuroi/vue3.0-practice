/*
 * @Author: xujun
 * @Date: 2020-04-22 11:05:21
 * @LastEditTime: 2020-04-22 11:06:19
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/index.d.ts
 * @Description: 通用类型
 */

import { Ref as VueRef, ComputedRef as VueComputedRef } from 'vue'

// 全局声明
declare global {
  type BaseElement = HTMLBaseElement | null
  type Ref<T> = VueRef<T>
  type ComputedRef<T> = VueComputedRef<T>
  interface ResponseInterface<T> {
    code: number
    data: T
  }
}
