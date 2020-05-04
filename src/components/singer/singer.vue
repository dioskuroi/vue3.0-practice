<!--
 * @Author: xujun
 * @Date: 2020-04-17 14:59:05
 * @LastEditTime: 2020-04-17 14:59:31
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/components/singer/singer.vue
 * @Description: singer compoennts
 -->
<template>
  <div class="singer">
    <list-view :data="singers"></list-view>
  </div>
</template>

<script lang="ts">
import ListView from '@/base/list-view/list-view.vue'

import getSingers from './helpers/getSingers'
export default {
  name: 'Singer',
  components: {
    ListView
  },
  setup() {
    const singers = getSingers()

    return {
      singers
    }
  }
}
</script>

<style lang="stylus" scoped>
  .singer
    position fixed
    top 88px
    bottom 0
    width 100%
</style>