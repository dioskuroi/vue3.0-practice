/*
 * @Author: xujun
 * @Date: 2020-04-20 09:56:53
 * @LastEditTime: 2020-04-20 10:12:54
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/components/recommend/helpers/recommendHook.ts
 * @Description: 轮播图数据结构
 */
import { ref } from 'vue'
import { getRecommend } from '@/api/recommend'
import { ERR_OK } from '@/api/config'

type Recommend = any

type RecommendList = Array<Recommend>

const recommendList = ref<RecommendList>([])

async function listRecommend (): Promise<void> {
  try {
    const { code, data } = await getRecommend()
    if (code !== ERR_OK) return 
    recommendList.value = data.slider
  } catch (error) {
    console.error(error)
  }
}

export default {
  recommendList,
  listRecommend
}