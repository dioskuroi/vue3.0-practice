/*
 * @Author: xujun
 * @Date: 2020-04-20 13:36:29
 * @LastEditTime: 2020-04-27 13:58:48
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/src/base/slider/helpers/slider.ts
 * @Description: Slider class
 */
import { reactive } from 'vue'
import BScroll from 'better-scroll'
import { addClass } from '@/common/js/dom'

interface StateInterface {
  dots: Array<undefined>
  currentPageIndex: number
}
interface SliderClass {
  slider?: HTMLBaseElement
  sliderGroup?: HTMLBaseElement
  state: StateInterface
  option: SliderOption
}

export interface SliderOption {
  loop: boolean
  autoPlay: boolean
  interval: number
}
export default class Slider implements SliderClass {
  public state: StateInterface
  public option: SliderOption
  public slider?: HTMLBaseElement
  public sliderGroup?: HTMLBaseElement

  private _childrenLen = 0
  private _playTimer?: number
  private _resizeTimer?: number
  private _bScroll?: BScroll
  private _defaultInitOption: SliderOption = { 
    loop : true, 
    interval : 3000, 
    autoPlay : true 
  }

  constructor(option: Partial<SliderOption> = {}) {
    this.state = reactive({
      dots: [],
      currentPageIndex: 0
    })
    this.option = Object.assign(this._defaultInitOption, option)

    this._handleScrollEnd = this._handleScrollEnd.bind(this)
    this._handleResize = this._handleResize.bind(this)
  }

  // 初始化轮播图
  init(slider: HTMLBaseElement, sliderGroup: HTMLBaseElement): void {
    this.slider = slider
    this.sliderGroup = sliderGroup

    this.setSliderWidth()
    
    this._bScroll = new BScroll(this.slider, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: this.option.loop,
        threshold: 0.3,
        speed: 400
      }
    })
  
    this.state.dots = new Array(this._childrenLen)
  
    if (this.option.autoPlay) {
      this.play()
    }
  
    this._bScroll.on('scrollEnd', this._handleScrollEnd)
  
    this.observeResize()
  }

  // 设置轮播图宽度
  setSliderWidth(isResize?: boolean): void {
    const children = this.sliderGroup!.children
    let width = 0
    let sliderWidth = this.slider!.clientWidth
    this._childrenLen = children.length
    for (let i = 0; i < this._childrenLen; i++) {
      const child = children[i] as HTMLBaseElement
      addClass(child, 'slider-item')
      child.style.width = sliderWidth + 'px'
      width += sliderWidth
    }
  
    if (this.option.loop && !isResize) {
      width += sliderWidth * 2
    }
    this.sliderGroup!.style.width = width + 'px'
  }
  // 监听窗口变化
  observeResize(): void {
    window.addEventListener('resize', this._handleResize)
  }

  // 取消监听
  unobserveResize(): void {
    window.removeEventListener('resize', this._handleResize)
  }

  play(): void {
    if (this._playTimer) {
      clearTimeout(this._playTimer)
    }
    this._playTimer = setTimeout(() => {
      this._bScroll!.next()
    }, this.option.interval);
  }

  destroy(): void {
    this.unobserveResize()
    this._bScroll!.off('scrollEnd', this._handleScrollEnd)
    this._bScroll!.destroy()
    this._playTimer && clearTimeout(this._playTimer)
    this._resizeTimer && clearTimeout(this._resizeTimer)
  }

  private _handleScrollEnd(): void {
    let pageIndex = this._bScroll!.getCurrentPage().pageX
    this.state.currentPageIndex = pageIndex

    if (this.option.autoPlay) {
      this.play()
    }
  }

  private _handleResize(): void {
    clearTimeout(this._resizeTimer)
    this._resizeTimer = setTimeout(() => {
      if (this._bScroll!.isInTransition) {
        let pageIndex = this._bScroll!.getCurrentPage().pageX
        this.state.currentPageIndex = pageIndex

        if (this.option.autoPlay) {
          this.play()
        }
      } else {
        if (this.option.autoPlay) {
          this.play()
        }
      }
      this.setSliderWidth(true)
      this._bScroll!.refresh()
    }, 60)
  }
}
