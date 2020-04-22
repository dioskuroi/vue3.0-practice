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
    }
  },
  setup(props) {
    const wrapperRef = ref<BaseElement>(null)
    
    const scroller = initScroller(wrapperRef, { 
      probeType: props.probeType as number, 
      click: props.click as boolean
    })

    return {
      wrapperRef
    }
  }
}
</script>

<style lang="stylus">

</style>