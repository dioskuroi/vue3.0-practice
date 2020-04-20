/*
 * @Author: xujun
 * @Date: 2020-04-17 11:16:33
 * @LastEditTime: 2020-04-17 14:56:05
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/shims-vue.d.ts
 * @Description: 
 */
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// declare module 'vue' {
//   interface Vue {
//     use: () => Vue
//   }
// }