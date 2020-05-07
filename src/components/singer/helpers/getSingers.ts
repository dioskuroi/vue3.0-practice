import { ref, onMounted } from 'vue'
import { ERR_OK } from '@/api/config'
import { getSingerList } from '@/api/singer'
import Singer from '@/common/js/singer'

interface SingerMap {
  [propName: string]: SingerMapData
}

export interface SingerMapData {
  title: string
  items: Singer[]
}

interface SingerData {
  Fsinger_mid: string
  Fsinger_name: string,
  Findex: string
}

interface DataInterface {
  list: SingerData[]
}

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default function (): Ref<SingerMapData[]> {
  const singers = ref<SingerMapData[]>([])

  function normalizeSinger(list: SingerData[]): SingerMapData[] {
    const map: SingerMap = {
      hot: {
        title: HOT_NAME,
        items: []
      }
    }
    
    list.forEach((singer, index) => {
      if (index < HOT_SINGER_LEN) {
        map.hot.items.push(new Singer({
          id: singer.Fsinger_mid,
          name: singer.Fsinger_name
        }))
      }
      const key = singer.Findex
      if (!map[key]) {
        map[key] = {
          title: key,
          items: []
        }
      }

      map[key].items.push(new Singer({
        id: singer.Fsinger_mid,
        name: singer.Fsinger_name
      }))
    })
    // 排序
    const hot: SingerMapData[] = []
    const ret: SingerMapData[] = []
    for (let key in map) {
      const val = map[key]
      if (val.title.match(/[a-zA-Z]/)) {
        ret.push(val)
      } else if (val.title === HOT_NAME) {
        hot.push(val)
      }
    }
    // 升序
    ret.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
    
    return hot.concat(ret)
  }

  async function getSingers(): Promise<void> {
    try {
      const { code, data } = await getSingerList<ResponseInterface<DataInterface>>()
      if (code !== ERR_OK) return
      singers.value = normalizeSinger(data.list)
      
    } catch (error) {
      console.error(error)
    }
  }

  onMounted(() => {
    getSingers()
  })

  return singers
}