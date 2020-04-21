<!--
 * @Author: xujun
 * @Date: 2020-04-17 14:59:05
 * @LastEditTime: 2020-04-21 16:17:24
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/components/recommend/recommend.vue
 * @Description: singer compoennts
 -->
<template>
  <div class="recommend">
    <div class="recommend-content">
      <div>
        <div v-if="recommendList.length" class="slider-wrapper">
          <div class="slider-content">
            <m-slider>
              <div v-for="item in recommendList">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl">
                </a>
              </div>
            </m-slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item">
              <div class="icon">
                <img width="60" height="60" :src="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MSlider from '../../base/slider/slider.vue'

import { onMounted } from 'vue'
import getRecommendList from './helpers/getRecommendList'
import getDiscList from './helpers/getDiscList'
export default {
  name: 'Recommend',
  components: {
    MSlider
  },
  setup() {
    const recommendList = getRecommendList()
    const discList = getDiscList()

    return {
      recommendList,
      discList
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"

.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .recommend-content
    height: 100%
    overflow: hidden
    .slider-wrapper
      position: relative
      width: 100%
      height: 0
      padding-top: 40%
      overflow: hidden
      .slider-content
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>