/*
 * @Author: xujun
 * @Date: 2020-04-17 14:21:27
 * @LastEditTime: 2020-04-20 13:21:02
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/common/js/dom.ts
 * @Description: dom 操作方法
 */
export function hasClass(el: Element, className: string): boolean {
  return el.classList.contains(className)
}

export function addClass(el: Element, className: string): void {
  el.classList.add(className)
}

export function getData(el: Element, name: string, val?: string): null | void | string {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

let elementStyle = document.createElement('div').style

interface TransformName {
  webkit: string
  Moz: string
  O: string
  ms: string
  standard: string
}

let vendor = (() => {
  let transformNames: TransformName = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  let key: keyof TransformName
  for ( key in transformNames) {
    if (elementStyle[transformNames[key] as any] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style: string): string | boolean {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
