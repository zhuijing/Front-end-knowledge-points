<template lang="html">
  <div class="pushi-banner" v-if="slides.length > 0 || hasBannerVideo">
    <video-play v-if="hasBannerVideo && isKeep"></video-play>
    <swiper v-if="!hasBannerVideo && isKeep" :options="bannerOption" @slideChange="slideChange" ref="bannerSwiper">
      <!-- slides -->
      <swiper-slide v-for="slide in slides">
        <a class="pp-banner--img" :href="bannerUrl">
          <img :src="slide" alt="">
        </a>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination row-all-center" slot="pagination" v-if="slides.length > 1"></div>
    </swiper>
    <!-- 渐变层 -->
    <div class="banner-gradient" v-if="!hasBannerVideo"></div>
    <div class="banner-bottom"></div>
    <img class="banner-water" src="../../assets/image/bannerwater.png" v-if="!hasBannerVideo && !isShowPower">
    <!-- 查看更多 -->
    <a v-if="!hasBannerVideo && activityDetails.head_img.url"  :href="activityDetails.head_img.url" class="banner-tip2 row-all-center">{{ $t('common.more') }} ></a>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import videoPlay from 'components/Common/videoPlay'
export default {
  components: {
    'video-play': videoPlay,
  },
  data() {
    return {
      bannerOption: {
        slidesPerView: 'auto',
        spaceBetween: 8,
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      activeIndex: 0,
      isKeep: false,
    }
  },
  computed: {
    ...mapState(['activityDetails']),
    swiper() {
      return this.$refs.bannerSwiper.swiper
    },
    bannerUrl() {
      return this.activityDetails.head_img.url || 'javascript:;'
    },
    isShowPower() {
      return (this.activityDetails.is_sell & 268435456) > 0
    },
    slides() {
      let headObj = this.activityDetails.head_img;
      return headObj ? headObj.headImgs : [];
    },
    hasBannerVideo() {
      const media = this.activityDetails.media_url
      if (!media) return false
      return (media.mediaUrl && media.location === 1 && (this.activityDetails.is_sell & 32768) > 0)
    }
  },
  watch: {
    activityDetails(n, m) {

      let head = this.activityDetails.head_img
      if (head) {
        let isAutoPlay = (head.loopPlay && head.headImgs.length > 1)
        let delay = head.playInterval
        this.bannerOption.autoplay = isAutoPlay ? {delay: delay * 1000} : false
      }
      // this.removeVideoAttribute()
    }
  },
  mounted() {
    // this.playerOptions.width = document.body.clientWidth
  },
  activated() {
    let head = this.activityDetails.head_img
    if (head) {
      let isAutoPlay = (head.loopPlay && head.headImgs.length > 1)
      let delay = head.playInterval
      this.bannerOption.autoplay = isAutoPlay ? {delay: delay * 1000} : false
    }
    this.isKeep = true;
  },
  deactivated() {
    this.isKeep = false;
  },
  methods: {
    slideChange() {
      this.activeIndex = this.swiper.activeIndex
    },
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';

.pushi-banner {
  width: 100%;
  // height: 3.44rem;
  // margin: 0.32rem 0 0 0.2rem;
  position: relative;
  .banner-water {
    width: 2rem;
    height: 0.6rem;
    position: absolute;
    left: 0;
    bottom: 0.24rem;
    z-index: 2;
  }
  .swiper-container {
    .swiper-wrapper {
      display: flex;
      align-items: center;
    }
    .pp-banner--img {
      display: block;
      font-size: 0;
      img {
        width: 100%;
      }
    }
  }

  .swiper-pagination-bullet {
    background-color: #fff;
  }
  .swiper-pagination {
    font-size: 0;
    text-align: left;
    left: 0rem;
    bottom: 0.5rem;
  }
  .swiper-pagination-bullet-active {
    width: 0.3rem !important;
    border-radius: 0.05rem !important;
  }
  .swiper-pagination-bullet {
    width: 0.08rem;
    height: 0.08rem;
    background-color: #fff;
    opacity: 1;
    margin: 0 0.04rem !important;
  }
  .banner-tip2 {
    width: 1.62rem;
    height: 0.6rem;
    position: absolute;
    right: 0;
    bottom: 0.24rem;
    color: #fff;
    font-size: 0.24rem;
    z-index: 2;
    background-color: rgba(0,0,0,.3);
  }
  .banner-water {
    width: 2rem;
    height: 0.6rem;
    display: block;
    position: absolute;
    left: 0;
    bottom: 0.24rem;
  }
  .banner-gradient {
    width: 100%;
    height: 0.8rem;
    position: absolute;
    right: 0;
    bottom: -0.01rem;
    z-index: 2;
    @include blackwhite-background-gradient();
  }
  .banner-bottom {
    width: 100%;
    height: 0.28rem;
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 2;
    @include background-theme-color()
  }
}
</style>
