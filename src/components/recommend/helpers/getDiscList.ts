/*
 * @Author: xujun
 * @Date: 2020-04-21 15:30:08
 * @LastEditTime: 2020-04-21 15:47:09
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/components/recommend/helpers/discHook.ts
 * @Description: 推荐列表
 */

import { ref, onMounted } from 'vue'
import { getDiscList } from '@/api/recommend'
import { ERR_OK } from '@/api/config'

interface Disc {
  imgurl: string
  dissname: string
  creator: {
    name: string
  }
}

const discList = ref<Disc[]>([])

async function listDisc (): Promise<void> {
  try {
    const { code, data } = await getDiscList()
    if (code !== ERR_OK) return
    discList.value = data.list
  } catch (error) {
    console.error(error)
  }
}

export default function () {
  onMounted(() => {
    listDisc()
  })

  return discList
}