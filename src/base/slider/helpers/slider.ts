/*
 * @Author: xujun
 * @Date: 2020-04-20 13:36:29
 * @LastEditTime: 2020-04-20 16:09:10
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/base/slider/helpers/slider.ts
 * @Description: 初始化轮播图
 */

import BScroll from 'better-scroll'
import { addClass } from '@/common/js/dom'
import { StateInterface } from '@/types/slider'

interface OptionInterface {
  loop: Boolean
  autoPlay: Boolean
  interval: number
}

let playTimer: number | null = null
let resizeTimer: number

let instance: BScroll

// 设置轮播图宽度
const setSliderWidth = (state: StateInterface, option: OptionInterface, isResize?: boolean): number => {
  const children = state.sliderGroup!.children
  let width = 0
  let sliderWidth = state.slider!.clientWidth
  const childrenLen = children.length
  for (let i = 0; i < childrenLen; i++) {
    const child = children[i] as HTMLBaseElement
    addClass(child, 'slider-item')
    child.style.width = sliderWidth + 'px'
    width += sliderWidth
  }

  if (option.loop && !isResize) {
    width += sliderWidth * 2
  }
  state.sliderGroup!.style.width = width + 'px'
  return childrenLen
}

// 处理窗口大小改变
const handleResize = (instance: BScroll, state: StateInterface, option: OptionInterface) => {
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      if (instance.isInTransition) {
        let pageIndex = instance.getCurrentPage().pageX
        state.currentPageIndex = pageIndex

        if (option.autoPlay) {
          play(instance, option.interval)
        }
      } else {
        if (option.autoPlay) {
          play(instance, option.interval)
        }
      }
      setSliderWidth(state, option, true)
      instance.refresh()
    }, 60);
    
  })
}


// 播放
const play = (instance: BScroll, interval: number): void => {
  if (playTimer !== null) {
    clearTimeout(playTimer)
  }
  playTimer = setTimeout(() => {
    instance.next()
  }, interval);
}

// 初始化轮播图
export const initSlider = (state: StateInterface, option: OptionInterface): BScroll => {
  const length = setSliderWidth(state, option)

  instance = new BScroll(state.slider!, {
    scrollX: true,
    scrollY: false,
    momentum: false,
    snap: {
      loop: option.loop as boolean,
      threshold: 0.3,
      speed: 400
    }
  })

  state.dots = new Array(length)


  if (option.autoPlay) {
    play(instance, option.interval)
  }

  instance.on('scrollEnd', () => {
    let pageIndex = instance.getCurrentPage().pageX
    state.currentPageIndex = pageIndex

    if (option.autoPlay) {
      play(instance, option.interval)
    }
  })

  handleResize(instance, state, option)

  return instance
}

export const destroySlider = () => {
  instance.destroy()
  playTimer && clearTimeout(playTimer)
  resizeTimer && clearTimeout(resizeTimer)
}