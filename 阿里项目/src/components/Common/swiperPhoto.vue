<template lang="html">
  <div class="swiper-photo">
    <swiper
    :options="swiperOption"
    ref="photoSwiper"
    @slideChangeTransitionEnd="slideChangeTransitionEnd"
    @slideChange="slideChange"
    v-longpress="downRecord"
    >
      <!-- <swiper-slide class="col-all-center"></swiper-slide> -->
    </swiper>
  </div>
</template>

<script>
import { clickRecord } from 'utils/tool'
import PinchZoom from 'pinch-zoom-js'

export default {
  name: 'swiper-photo',
  props: {
    picList: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number
    }
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 15,
        lazy: {
          loadPrevNext: true,
          loadPrevNextAmount: 1
        },
        virtual: {
          slides: [],
          renderSlide: function(slide, index) {
            return `<div class="swiper-slide">
                      <div class="zoom row-all-center" style="height: 100vh;">
                        <img class="drag" src="${slide.big_img}" alt="" />
                      </div>
                    </div>`
          }
        }
      },
      zoomOption: {
        draggableUnzoomed: false,
        minZoom: 1
      },
      pz: null,
      // photos: [],

      maskDom: '',
      wrapDom: ''
    }
  },
  computed: {
    swiper() {
      return this.$refs.photoSwiper.swiper
    },
    isZoom() {
      if (this.pz) {
        return this.pz.zoomFactor > 1 ? true : false
      }
    },
    filterPicList() {
      return this.picList.filter((item) => {
        return item.big_img
      })
    }
  },
  watch: {
    isZoom(n) {
      if (n) {
        this.onZoom()
      }
    }
  },
  mounted() {
    this.wrapDom = document.querySelector('.swiper-photo')
    this.swiper.virtual.appendSlide(this.filterPicList)
    this.swiper.update()
    this.swiper.slideTo(1, 0, true)
    this.swiper.slideTo(this.activeIndex, 0, true)
    this.getPinch()
  },
  methods: {
    slideChangeTransitionEnd() {
      this.getPinch()
    },
    // slideNextTransitionEnd() {
    //   this.getPinch()
    // },
    slideChange() {
      this.$emit('slideChange', this.swiper.activeIndex)
    },
    downRecord() {
      clickRecord('pic_down', this.filterPicList[this.activeIndex].pic_hash);
    },
    getPinch() {
      let activeDom = this.wrapDom.querySelector('.swiper-slide-active')
      let zoom = activeDom.querySelector('.zoom')
      let drag = activeDom.querySelector('.drag')

      setTimeout(() => {
        this.pz = new PinchZoom(zoom, this.zoomOption)
        this.photoDrag(drag)
      }, 100) // 快速切换时触发touchend事件导致大图模式关闭 临时解决方案
    },
    onZoom() {
      this.$emit('onZoom')
    },
    photoDrag(target) {
      // 待优化
      let that = this
      let parentOpacity = 1
      let imgScale = 1
      let dragClose = false

      let iw = target.offsetWidth,
        ih = target.offsetHeight
      let startX = 0
      let startY = 0
      let moveY = 0
      let moveX = 0
      let touchAngle = 0

      target.addEventListener(
        'touchstart',
        function(ev) {
          if (ev.targetTouches.length === 1) {
            target.style.transition = ''
            target.style.webkitTransition = ''
            that.wrapDom.style.transition = ''
            that.wrapDom.style.webkitTransition = ''

            startY = ev.touches[0].clientY
            startX = ev.touches[0].clientX
          }
        },
        false
      )
      target.addEventListener(
        'touchmove',
        function(ev) {
          if (ev.targetTouches.length === 1) {
            moveY = ev.touches[0].clientY - startY
            moveX = ev.touches[0].clientX - startX

            parentOpacity = 1 - Math.abs(moveY) / 500
            imgScale = 1 - Math.abs(moveY) / 500

            // 触摸滑动角度
            touchAngle = Math.abs(moveY / moveX)
            let parent = target.parentNode
            dragClose = parent.style.transform.indexOf('scale(1, 1)') > -1 ? true : false
            if (touchAngle > 1 && dragClose) {
              that.$emit('onDrag', true);
              target.style.webkitTransform =
                'translate(' +
                moveX +
                'px, ' +
                moveY +
                'px) scale(' +
                imgScale +
                ')'
              target.style.transform =
                'translate(' +
                moveX +
                'px, ' +
                moveY +
                'px) scale(' +
                imgScale +
                ')'
              that.wrapDom.style.opacity = parentOpacity
            }
          }
        },
        false
      )
      target.addEventListener('touchend', function(ev) {
        if (touchAngle > 1 && dragClose) {
          if (Math.abs(moveY) > 130) {
            target.style.webkitTransition = 'all .5s'
            target.style.transition = 'all .5s'
            target.style.webkitTransform = 'scale(0)'
            target.style.transform = 'scale(0)'
            // $wrap.fadeOut(200, function() {
            // 	$wrap.remove();
            // });
            // $('.container').off('touchmove');
            setTimeout(function() {
              that.$emit('close')
            }, 200)
          } else {
            target.style.webkitTransform = 'translateY(0) scale(1)'
            target.style.transform = 'translateY(0) scale(1)'
            target.style.webkitTransition = 'all .2s'
            target.style.transition = 'all .2s'
            that.wrapDom.style.opacity = 1
            that.wrapDom.style.webkitTransition = 'all .5s'
            that.wrapDom.style.transition = 'all .5s'
            that.$emit('onDrag', false);
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';

.swiper-photo {
  width: 100%;
  height: 100vh;
  @include blackwhite-background();
  .swiper-container {
    height: 100%;
  }
  .swiper-wrapper {
  }
  .swiper-slide {
    width: 100%;
    height: 100vh;
    .zoom {
      width: 7.5rem;
      -webkit-user-drag: none;
      font-size: 0;
    }
    img {
      width: 7.5rem;
    }
  }
}
</style>
