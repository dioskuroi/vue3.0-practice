<!--
 * @Author: xujun
 * @Date: 2020-04-20 10:18:30
 * @LastEditTime: 2020-04-21 16:24:04
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/base/slider/slider.vue
 * @Description: 轮播图组件
 -->

<template>
  <div class="slider" ref="sliderRef">
    <div class="slider-group" ref='sliderGroupRef'>
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class="{ active: currentPageIndex === index }"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, onUnmounted, nextTick, reactive, toRefs } from 'vue'
import Slider, { SliderOption } from './helpers/slider'
import BScroll from 'better-scroll'

interface StateInterface {
  sliderRef: HTMLBaseElement | null
  sliderGroupRef: HTMLBaseElement | null
}

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
      sliderRef: null,
      sliderGroupRef: null
    })
    const slider = new Slider(props as SliderOption)

    onMounted(async() => {
      await nextTick()
      const { sliderRef, sliderGroupRef } = state
      slider.init(sliderRef!, sliderGroupRef!)
    })

    onUnmounted(() => {
      slider.destroy()
    })

    return {
      ...toRefs(state),
      ...toRefs(slider.state)
    }
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