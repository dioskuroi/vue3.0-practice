/*
 * @Author: xujun
 * @Date: 2020-04-22 14:12:52
 * @LastEditTime: 2020-04-22 14:38:49
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/directive/index.ts
 * @Description: 通用指令
 */

import { App } from 'vue'

interface LazyLoadOption {
  defaultImg: string
}
// * 懒加载
export const lazyLoad = ({ directive }: App, { defaultImg }: LazyLoadOption) => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const { target } = entry
      const src = target.getAttribute('data-src')
      target.setAttribute('src', src!)
      observer.unobserve(target)
    })
  })

  directive('lazy', (el: HTMLImageElement, { value }) => {
    el.setAttribute('src', defaultImg)
    el.setAttribute('data-src', value)
    observer.observe(el)
  })
}