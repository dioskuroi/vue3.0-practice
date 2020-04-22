<!--
 * @Author: xujun
 * @Date: 2020-04-22 14:46:55
 * @LastEditTime: 2020-04-22 14:56:56
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/base/loading/loading.vue
 * @Description: loading 组件
 -->
<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{ title }}</p>
  </div>
</template>
<script lang="ts">
import { toRefs } from 'vue'
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>
