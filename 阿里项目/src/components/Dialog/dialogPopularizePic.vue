<template lang="html">
  <div class="popularize-pic" v-if="firstShow">
    <span v-show="visible" class="close col-all-center" @click="close"><i class="iconfont iconchahao-quanping"></i></span>
    <van-popup class="dialog-popularize" v-model="visible" @close="close">
      <div class="popularize-wrapper col-start-center" ref="popularize">
        <h3 class="flex-none">{{ popularizeObj.name }}</h3>
        <div class="scroll-content flex-auto">
          <img :src="popularizeObj.big_img" alt="">
          <p v-html="popularizeObj.description"></p>
        </div>
        <a v-if="popularizeObj.url" :href="popularizeObj.url" class="button flex-none ellipsis">{{ popularizeObj.title || '立即前往' }}</a>
      </div>
    </van-popup>
    <!-- <div class="popularize-float col-all-center" v-show="!visible" @click="showPopularize">
      <p class="row-all-center"><span class="ellipsis2">{{ popularizeObj.name }}</span><i class="iconfont icongengduo"></i></p>
    </div> -->
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
      firstShow: true,
      popularizeAction: 0,
    }
  },
  created() {

  },
  computed: {
    ...mapState(['activityDetails', 'popularizeShow', 'bigPhotoObj']),

  },
  watch: {
    bigPhotoObj(n) {
      if (n.show && this.firstShow) {
        this.getGustList()
      }
    },
  },
  methods: {
    // ...mapMutations(['UPDATE_POPULARIZE']),
    getGustList() {
      api
      .getGuestBrand({
        activityNo: ACTIVITYNO
      })
      .then(res => {
        this.popularizeObj = res.result.pic_popup
        if (this.popularizeObj.name) {
          let localPopularize = localStorage.getItem('popularize_pic') || "[]";
          localPopularize = JSON.parse(localPopularize)

          let isExist = localPopularize.includes(ACTIVITYNO)
          if (isExist) {
            if (res.result.pic_popup.action === 0) {
              this.firstShow = false
            } else {
              this.visible = true

              // this.UPDATE_POPULARIZE({pic: true, market: this.popularizeShow.market})
              let index = localPopularize.indexOf(ACTIVITYNO)
              index > -1 ? localPopularize.splice(index, 1) : null
              localStorage.setItem('popularize_pic', JSON.stringify(localPopularize));
            }
          } else {
            this.visible = true
            localPopularize.push(ACTIVITYNO)
            localStorage.setItem('popularize_pic', JSON.stringify(localPopularize));
          }
        }
      })
    },
    close() {
      this.firstShow = false
      // this.UPDATE_POPULARIZE({pic: false, market: this.popularizeShow.market})
    },
  }
}
</script>

<style lang="scss">
@import "assets/scss/index.scss";
.popularize-pic {
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
          text-align: left;
          font-size: .28rem;
        }
      }
      .button {
        width: 100%;
        line-height: .72rem;
        padding: 0 .42rem;
        font-size: .36rem;
        border-radius: .36rem;
        @include text-auxiliary-background-color();
        // @include text-card-color();
      }
    }

  }
}
</style>
