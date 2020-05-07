<template>
  <scroll class="listview" ref="scrollRef" :probeType="3" :listenScroll="true" @scroll="onScroll">
    <ul>
      <li v-for="(group, index) in data" class="list-group" :data-index="index">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li class="list-group-item" v-for="item in group.items">
            <img class="avatar" v-lazy="item.avatar" :alt="item.name" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li class="item" :class="{ current: hightLightIndex === index }" v-for="(item, index) in shortcutList" :data-index="index">
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixedRef">
      <h1 class="fixed-title">{{ fixedTitle }}</h1>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script lang="ts">
import { computed, watchEffect, ref, onMounted } from 'vue'
import Scroll from '@/base/scroll/scroll.vue'
import Loading from '@/base/loading/loading.vue'

import { SingerMapData } from '@/components/singer/helpers/getSingers'
import { getData } from '../../common/js/dom'
import BScroll, { Position } from 'better-scroll'

import getHightlightIndex from './helpers/getHightlightIndex'

interface scrollRef {
  scroller: BScroll
}

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30

export default {
  name: 'ListView',
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  components: {
    Scroll,
    Loading
  },
  setup(props) {
    const scrollRef = ref<scrollRef| null>(null)
    const listGroupRef = ref<HTMLBaseElement[]>([])
    const fixedRef = ref<BaseElement>(null)
    const listHeight = ref<number[]>([])

    const calculateHeight = () => {
      const list = listGroupRef
      let height = 0
      listHeight.value.push(height)
      for (let i = 0; i < list.value.length; i++) {
        let item = list.value[i]
        height += item.clientHeight
        listHeight.value.push(height)
      }
    }

    watchEffect(() => {
      if (props.data.length !== 0 || !listGroupRef.value.length) {
        listGroupRef.value = Array.from(document.querySelectorAll('.list-group'))
        calculateHeight()
      }
    })

    const shortcutList = computed(() => {
      return (props.data as SingerMapData[]).map(group => group.title.slice(0, 1))
    })

    const touch = {
      y1: 0,
      y2: 0,
      anchorIndex: ''
    }

    let scrollY = ref(0)

    const onScroll = (pos: Position) => {
      requestAnimationFrame(() => {
        scrollY.value = pos.y

        for (let i = 0; i < listHeight.value.length - 1; i++) {
          let height1 = listHeight.value[i]
          let height2 = listHeight.value[i + 1]
          if (-pos.y >= height1 && -pos.y < height2) {
            const diff = height2 + pos.y
            const fixedTop = (diff > 0 && diff < TITLE_HEIGHT) ? diff - TITLE_HEIGHT : 0
            fixedRef.value!.style.transform = `translate3d(0,${fixedTop}px,0)`
          }
        }
      })
    }

    const onShortcutTouchStart = (e: TouchEvent) => {
      const anchorIndex = getData(e.target as Element, 'index') || ''
      const firstTouch = e.touches[0]
      if (!(firstTouch.target as HTMLBaseElement).classList.contains('item')) return
      touch.y1 = firstTouch.pageY 
      touch.anchorIndex = anchorIndex
      scrollRef.value!.scroller.scrollToElement(listGroupRef.value[Number(anchorIndex)], 0)
    }

    const onShortcutTouchMove = (e: TouchEvent) => {
      const firstTouch = e.touches[0]
      touch.y2 = firstTouch.pageY
      const delta = Math.floor((touch.y2 - touch.y1)/ ANCHOR_HEIGHT)
      const anchorIndex = Number(touch.anchorIndex) + delta
      scrollRef.value!.scroller.scrollToElement(listGroupRef.value[anchorIndex > 22 ? 22 : anchorIndex], 0)
    }

    const hightLightIndex = getHightlightIndex(listGroupRef)

    const fixedTitle = computed(() => {
      if (scrollY.value > 0) return ''
      return (props.data as SingerMapData[])[hightLightIndex.value]?.title ?? ''
    })

    return {
      scrollRef,
      fixedRef,
      shortcutList,
      hightLightIndex,
      fixedTitle,
      onScroll,
      onShortcutTouchStart,
      onShortcutTouchMove
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"

.listview
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  background: $color-background
  .list-group
    padding-bottom: 30px
    .list-group-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
    .list-group-item
      display: flex
      align-items: center
      padding: 20px 0 0 30px
      .avatar
        width: 50px
        height: 50px
        border-radius: 50%
      .name
        margin-left: 20px
        color: $color-text-l
        font-size: $font-size-medium
  .list-shortcut
    position: absolute
    z-index: 30
    right: 0
    top: 50%
    transform: translateY(-50%)
    width: 20px
    padding: 20px 0
    border-radius: 10px
    text-align: center
    background: $color-background-d
    font-family: Helvetica
    .item
      padding: 3px
      line-height: 1
      color: $color-text-l
      font-size: $font-size-small
      &.current
        color: $color-theme
  .list-fixed
    position: absolute
    top: 0
    left: 0
    width: 100%
    .fixed-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>