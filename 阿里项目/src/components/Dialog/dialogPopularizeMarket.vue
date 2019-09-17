<template lang="html">
  <div class="popularize-market" v-if="firstShow">
    <span v-show="visible" class="close col-all-center" @click="close"><i class="iconfont iconchahao-quanping"></i></span>
    <van-popup class="dialog-popularize" v-model="visible" @close="close">
      <div class="popularize-wrapper col-start-center" ref="popularize">
        <h3 class="flex-none">{{ popularizeObj.name }}</h3>
        <div class="scroll-content flex-auto">
          <img :src="popularizeObj.big_img" alt="">
          <p v-html="popularizeObj.description"></p>
        </div>
        <a v-if="popularizeObj.url" :href="popularizeObj.url" class="button flex-none ellipsis">{{ popularizeObj.title || '立即前往'}}</a>
      </div>
    </van-popup>
    <div class="popularize-float col-all-center" v-show="!visible && popularizeObj.name" @click="showPopularize">
      <p class="row-all-center"><span class="ellipsis2">{{ popularizeObj.name }}</span><i class="iconfont icongengduo1"></i></p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { replaceReturn } from 'utils/tool'
import api from 'api/api'
import Cookies from 'js-cookie'
const ACTIVITYNO = Cookies.get("activity_no")

export default {
  data() {
    return {
      visible: false,
      popularizeObj: {},
      firstShow: true
    }
  },
  created() {
    this.getGustList()
  },
  computed: {
    ...mapState(['activityDetails', 'popularizeShow']),

  },
  watch: {
    popularizeShow: {
      handler(n) {
        this.visible = n.market
      },
      deep: true
    },
    $route(n, o) {
      if ((n.name === 'list' || n.name === 'listpp') && (['start', '/'].includes(o.name))) {
        this.getGustList()
      }
    }
  },
  methods: {
    ...mapMutations(['UPDATE_POPULARIZE']),
    getGustList() {
      api
      .getGuestBrand({
        activityNo: ACTIVITYNO
      })
      .then(res => {
        this.popularizeObj = res.result.market_popup

        if (this.popularizeObj.name) {
          this.popularizeObj.description = replaceReturn(this.popularizeObj.description)
          let localPopularize = localStorage.getItem('popularize_market') || "[]";
          localPopularize = JSON.parse(localPopularize)

          let isExist = localPopularize.includes(ACTIVITYNO)
          if (isExist) {
            if (res.result.market_popup.action === 0) {
              this.firstShow = false
            } else {
              this.UPDATE_POPULARIZE({pic: this.popularizeShow.pic, market: true})
              let index = localPopularize.indexOf(ACTIVITYNO)
              index > -1 ? localPopularize.splice(index, 1) : null
              localStorage.setItem('popularize_market', JSON.stringify(localPopularize));
            }
          } else {
            console.log('djfkdsjfksd');
            this.UPDATE_POPULARIZE({pic: this.popularizeShow.pic, market: true})
            if (res.result.market_popup.action === 0) {
              localPopularize.push(ACTIVITYNO)
              localStorage.setItem('popularize_market', JSON.stringify(localPopularize));
            }
          }
        }
      })
    },
    showPopularize() {
      this.visible = true
    },
    close() {
      this.visible = false
    },
  }
}
</script>

<style lang="scss">
@import "assets/scss/index.scss";
.popularize-market {
  .close {
    width: .56rem;
    height: .56rem;
    position: fixed;
    right: .3rem;
    top: .3rem;
    z-index: 110000;
    .iconfont {
      color: #fff;
      font-size: .32rem;
    }
  }
  .dialog-popularize {
    width: 6.86rem;
    max-height: 80vh;
    border-radius: .16rem;
    overflow: hidden;
    @include title-color();
    @include background-color();

    .popularize-wrapper {
      max-height: 80vh;
      padding: .48rem .32rem;
      h3 {
        font-size: .4rem;
      }
      .scroll-content {
        width: 100%;
        margin: .32rem 0 .4rem;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        img {
          max-width: 100%;
        }
        p {
          font-size: .28rem;
          text-align: left;
        }
      }
      .button {
        width: 100%;
        line-height: .72rem;
        padding: 0 .42rem;
        font-size: .36rem;
        border-radius: .36rem;
        @include title-color();
        @include text-auxiliary-background-color();
        // @include text-card-color();
      }
    }

  }
  .popularize-float {
    width: 1.66rem;
    height: 1.38rem;
    background-image: url(../../assets/image/popularize-bg.png);
    background-size: contain;
    color: #fff;
    font-size: .24rem;
    position: fixed;
    left: 0;
    bottom: 1.8rem;
    z-index: 100;
    span {
      width: 1.12rem;
      padding: 0 0 0 .1rem;
      text-align: left;
    }
    .iconfont {
      font-weight: 700;
      font-size: .54rem;
      transform: translateX(-.1rem);
    }
  }
}
</style>
