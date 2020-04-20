<!--
 * @Author: xujun
 * @Date: 2020-04-17 14:59:05
 * @LastEditTime: 2020-04-20 11:57:52
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/components/recommend/recommend.vue
 * @Description: singer compoennts
 -->
<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper">
        <m-slider v-if="recommendList.length">
          <div v-for="item in recommendList">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" alt="推荐图片" />
            </a>
          </div>
        </m-slider>
      </div>
      <div class="recomment-list">
        <div class="list-title">热门歌单推荐</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MSlider from '../../base/slider/slider.vue'

import { onMounted } from 'vue'
import recommendHook from './helpers/recommendHook'
export default {
  name: 'Recommend',
  components: {
    MSlider
  },
  setup() {
    const { recommendList, listRecommend } = recommendHook
    onMounted(() => {
      listRecommend()
    })

    return {
      recommendList
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>