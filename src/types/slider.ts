/*
 * @Author: xujun
 * @Date: 2020-04-20 14:53:35
 * @LastEditTime: 2020-04-20 14:53:46
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/types/slider.ts
 * @Description: 轮播图类型
 */
export interface StateInterface {
  slider: HTMLBaseElement | null
  sliderGroup: HTMLBaseElement | null
  dots: Array<undefined>
  currentPageIndex: number
}