/*
 * @Author: xujun
 * @Date: 2020-04-17 14:21:27
 * @LastEditTime: 2020-04-17 16:22:34
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/common/js/jsonp.ts
 * @Description: jsonp setting
 */
import originJsonp from 'jsonp'
type StringObj = { 
  [propName: string]: any 
}
export default function jsonp<T>(url: string, data: StringObj, option: any): Promise<T> {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err: any, data: T) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param(data: StringObj): string {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
