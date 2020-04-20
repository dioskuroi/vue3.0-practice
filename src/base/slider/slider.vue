<!--
 * @Author: xujun
 * @Date: 2020-04-20 10:18:30
 * @LastEditTime: 2020-04-20 16:09:26
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/base/slider/slider.vue
 * @Description: 轮播图组件
 -->

<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref='sliderGroup'>
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class="{ active: currentPageIndex === index }"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, onUnmounted, nextTick, reactive, toRefs } from 'vue'
import { initSlider, destroySlider } from './helpers/slider'
import BScroll from 'better-scroll'
import { StateInterface } from '@/types/slider'
export default {
  name: 'Slider',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  setup(props) {
    const state = reactive<StateInterface>({
      slider: null,
      sliderGroup: null,
      dots: [],
      currentPageIndex: 0
    })
    let sliderInstance: BScroll

    onMounted(async() => {
      await nextTick()
      const { slider, sliderGroup } = state
      sliderInstance = initSlider(state, props)
    })

    onUnmounted(() => {
      destroySlider()
    })
    
    return toRefs(state)
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/variable"

.slider
  min-height: 1px
  position relative
  overflow: hidden
  .slider-group
    position: relative
    overflow: hidden
    white-space: nowrap
    .slider-item
      float: left
      box-sizing: border-box
      overflow: hidden
      text-align: center
      a
        display: block
        width: 100%
        overflow: hidden
        text-decoration: none
      img
        display: block
        width: 100%
  .dots
    position: absolute
    right: 0
    left: 0
    bottom: 12px
    transform: translateZ(1px)
    text-align: center
    font-size: 0
    .dot
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background: $color-text-l
      &.active
        width: 20px
        border-radius: 5px
        background: $color-text-ll
</style>