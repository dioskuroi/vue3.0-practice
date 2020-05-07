/*
 * @Author: xujun
 * @Date: 2020-04-20 09:56:53
 * @LastEditTime: 2020-04-21 15:41:22
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/components/recommend/helpers/recommendHook.ts
 * @Description: 轮播图数据结构
 */
import { ref, onMounted } from 'vue'
import { getRecommend } from '@/api/recommend'
import { ERR_OK } from '@/api/config'

interface Recommend {
  linkUrl: string
  picUrl: string
}

export default function (): Ref<Recommend[]> {
  const recommendList = ref<Recommend[]>([])

  async function listRecommend (): Promise<void> {
    try {
      const { code, data } = await getRecommend()
      if (code !== ERR_OK) return 
      recommendList.value = data.slider
    } catch (error) {
      console.error(error)
    }
  }

  onMounted(() => {
    listRecommend()
  })
  
  return recommendList
}
