/*
 * @Author: xujun
 * @Date: 2020-04-22 10:16:53
 * @LastEditTime: 2020-04-22 13:57:12
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/base/scroll/helpers/init-scroller.ts
 * @Description: 初始化 scroller
 */

import BScroll, { BsOption } from 'better-scroll'
import { ref, nextTick, onMounted, Ref, onUnmounted } from 'vue'

type Scroller = BScroll | null

export default function (
  wrapperRef: Ref<BaseElement>, 
  option?: Partial<BsOption>
): Ref<Scroller> {
  const scroller = ref<Scroller>(null)

  onMounted(async () => {
    if (!wrapperRef.value) return
    await nextTick()
    scroller.value = new BScroll(wrapperRef.value, option)
  })

  onUnmounted(() => {
    scroller.value?.destroy()
  })

  return scroller
}