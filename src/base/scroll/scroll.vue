<!--
 * @Author: xujun
 * @Date: 2020-04-22 10:10:18
 * @LastEditTime: 2020-04-22 14:02:47
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/base/scroll/scroll.vue
 * @Description: scroll 组件
 -->

<template>
  <div class="wrapper" ref="wrapperRef">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import initScroller from './helpers/init-scroller'
import { Position } from 'better-scroll'
import { ref } from 'vue'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const wrapperRef = ref<BaseElement>(null)
    
    const scroller = initScroller(wrapperRef, { 
      probeType: props.probeType as number, 
      click: props.click as boolean,
      listenScroll: props.listenScroll as boolean,
      onScroll: (pos) => { emit('scroll', pos) }
    })

    return {
      wrapperRef,
      scroller
    }
  }
}
</script>

<style lang="stylus">

</style>