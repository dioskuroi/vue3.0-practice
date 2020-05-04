/*
 * @Author: xujun
 * @Date: 2020-04-22 10:16:53
 * @LastEditTime: 2020-04-22 13:57:12
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/base/scroll/helpers/init-scroller.ts
 * @Description: 初始化 scroller
 */

import BScroll, { Position } from 'better-scroll'
import { ref, nextTick, onMounted, onUnmounted } from 'vue'

type Scroller = BScroll | null

interface Option {
  probeType: number
  click: boolean
  listenScroll: boolean
  onScroll: (pos: Position) => any
}

export default function (
  wrapperRef: Ref<BaseElement>, 
  option?: Partial<Option>
): Ref<Scroller> {
  const scroller = ref<Scroller>(null)

  onMounted(async () => {
    if (!wrapperRef.value) return
    await nextTick()
    scroller.value = new BScroll(wrapperRef.value, option)
    if (option?.listenScroll) {
      scroller.value.on('scroll', option.onScroll!)
    }
  })

  onUnmounted(() => {
    if (option?.listenScroll) {
      scroller.value?.off('scroll', option.onScroll!)
    }
    scroller.value?.destroy()
  })

  return scroller
}