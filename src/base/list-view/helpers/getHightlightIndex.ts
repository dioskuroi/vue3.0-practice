import { getData } from '@/common/js/dom'
import { watch, onUnmounted, ref } from 'vue'


export default function (elemList: Ref<HTMLBaseElement[]>) {
  const displayList: boolean[] = []

  const findMinIndex = (displayList: boolean[]) => {
    return displayList.indexOf(true)
  }

  let minIndex = ref(0)

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const { target } = entry
      const anchorIndex = getData(target, 'index')
      if (!anchorIndex) return
      const index = Number(anchorIndex)
      if (entry.isIntersecting && !displayList[index]) {
        displayList[index] = true
        minIndex.value = findMinIndex(displayList)
      } else if (!entry.isIntersecting && displayList[index]){
        displayList[index] = false
        minIndex.value = findMinIndex(displayList)
      }
    })
  }, { rootMargin: '-89px 0px 0px 0px' })

  watch(elemList, () => {
    elemList.value.forEach(ele => {
      observer.observe(ele)
    })
  })
  
  onUnmounted(() => {
    elemList.value.forEach(ele => {
      observer.unobserve(ele)
    })
  })

  return minIndex
}