<template lang="html">
  <van-popup class="dialog-listphoto" :overlay="true" v-model="visible" v-if="visible" @close="close">
    <div class="livephoto-wrapper">
      <a class="enter-button" :href="photoInfo.activity_url" v-show="!isPure">前往查看该活动</a>
      <span class="close col-all-center" v-show="!isPure" @click="close"><i class="iconfont iconchahao-quanping"></i></span>
      <swiper-photo
      @close="close"
      @slideChange="slideChange(...arguments)"
      @onZoom="onZoom"
      @onDrag="onDrag(...arguments)"
      :activeIndex="activeIndex"
      :picList="photos"
      @click.native="togglePureMode"
      >
      </swiper-photo>
      <div class="content" v-show="!isPure">
        <div class="info">
          <p class="p1 row-start-center"><span class="span1 ellipsis">{{ photoInfo.pic_name }}</span>{{ `(${ $t('common.longpress') })` }}</p>
          <p class="p2" v-show="hasRetoucher || hasCamer"><span class="span2" v-show="hasCamer">{{ `${ $t('common.photographer') }/${photoInfo.camer}` }}</span><span class="span22" v-show="hasRetoucher">{{ `${$t('common.retoucher')}/${photoInfo.retoucher}` }}</span></p>
        </div>
        <div class="buttons">
          <ul class="row-between-center">
            <li v-if="isWx" class="button-item col-all-center" @click="getShare">
              <i class="iconfont iconfenxiang"></i>
              <span class="button-title">{{ $t('common.share') }}</span>
            </li>
            <!-- <li class="button-item col-all-center" @click="getPoster">
              <i class="iconfont icondatu-haibao"></i>
              <span class="button-title">海报</span>
            </li>
            <li class="button-item col-all-center" @click="getPrint">
              <i class="iconfont icondatu-dayin"></i>
              <span class="button-title">打印</span>
            </li> -->
            <li class="button-item col-all-center" @click="getOrigin">
              <i class="iconfont iconyuantu"></i>
              <span class="button-title">{{ $t('common.original') }}</span>
            </li>
            <li class="button-item col-all-center" @click="ilike(photoInfo.pic_hash, userLike)">
              <i :class="['iconfont', userLike ? 'iconxihuandianliang ani-scale' : 'iconxihuan']"></i>
              <span class="button-title" v-show="likeCount > 0">{{ likeCount }}</span>
              <span class="button-title" v-show="likeCount <= 0">{{ $t('common.like') }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="awards" v-show="!isPure">
        <ul>
          <li class="award-item col-all-center" @click="getReward">
            <i class="iconfont icondashang1"></i>
            <span class="award-title">打赏</span>
          </li>
          <li class="award-item col-all-center">
            <i class="iconfont iconxihuan-cai"></i>
            <span class="award-title">喜欢</span>
          </li>
        </ul>
      </div> -->
    </div>
    <div class="loading col-all-center" v-show="loadingShow">
      <van-loading type="spinner" color="white"/>
    </div>
    <dialog-share :photoInfo="photoInfo"></dialog-share>
  </van-popup>
</template>

<script>
import api from 'api/api'
import { mapState, mapMutations } from 'vuex'
import swiperPhoto from 'components/Common/swiperPhoto'
import dialogShare from 'components/Dialog/dialogShare'
import { getBroswer } from 'utils/tool'
// import { Jigsaw } from 'utils/draw'
export default {
  components: {
    'swiper-photo': swiperPhoto,
    'dialog-share': dialogShare
  },
  data() {
    return {
      visible: false,
      activeIndex: 0,
      isPure: false,
      loadingShow: false,
      userLike: false,
      likeCount: 0
    }
  },
  computed: {
    ...mapState(['photos', 'bigPhotoObj', 'activityDetails']),
    photoInfo() {
      const HOST = window.location.host
      let list = this.photos || []
      list.map((item) => {
        let urlArr = item.activity_url.split('/');
        urlArr[2] = HOST;
        item.activity_url = urlArr.join('/');
      })
      return list[this.activeIndex]
    },
    hasCamer() {
      return (this.activityDetails.is_sell & 4096) > 0
    },
    hasRetoucher() {
      return (this.activityDetails.is_sell & 8192) > 0
    },
    isWx() {
      return getBroswer().weChat
    }
  },
  watch: {
    bigPhotoObj(n) {
      this.visible = n.show
      this.activeIndex = n.index
    },
    photoInfo(n, o) {
      this.userLike = n.user_like
      this.likeCount = n.like_count
    }
  },
  methods: {
    ...mapMutations(['UPDATE_BIGPHOTOOBJ', 'UPDATE_SHARELOADING']),
    slideChange(index) {
      this.activeIndex = index
    },
    onZoom() {
      this.isPure = true
    },
    onDrag(bol) {
      this.isPure = bol
    },
    close() {
      this.UPDATE_BIGPHOTOOBJ({ show: false, index: 0 })
    },
    togglePureMode() {
      this.isPure = !this.isPure
    },
    getShare() {
      this.UPDATE_SHARELOADING(true)
    },
    // getReward() {
    //   let obj = {
    //     picHash: this.photoInfo.pic_hash,
    //     orderType: 2,
    //     showPay: true
    //   }
    //   this.UPDATE_FUNCTIONS(Object.assign({}, this.functions, obj))
    // },
    // getPoster() {
    //   let obj = {
    //     jigsawCount: 1,
    //     jigsawUrlList: [this.photoInfo.big_img],
    //     jigsawHashList: [this.photoInfo.pic_hash],
    //     jigsawType: "bigPoster"
    //   }
    //   this.UPDATE_FUNCTIONS(Object.assign({}, this.functions, obj))
    // },
    // getPrint() {
    //   let origin = this.photoInfo.origin_img
    //   window.location.href = `http://mobile.artup.com/sendToArtron.html?urlType=1001&channelCode=chengying&imagesUrls=http:${origin}`
    // },
    ilike(hash, userLike) {
      let status = this.userLike ? -1 : 5
      this.userLike ? this.likeCount-- : this.likeCount++
      this.userLike = this.userLike ? 0 : 1
      api.iLike({ picHash: hash, status: status }).then(() => {})
    },
    getOrigin() {
      this.loadingShow = true
      let origin = this.photoInfo.origin_img
      let img = new Image()
      img.src = origin
      let that = this
      img.onload = function() {
        that.photos[that.activeIndex].big_img = origin
        that.loadingShow = false
        that.$toast('当前已是原图')
      }
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';

.dialog-listphoto {
  background-color: transparent;
  overflow: hidden;
  .livephoto-wrapper {
    width: 7.5rem;
  }
  .enter-button {
    position: absolute;
    left: 0.3rem;
    top: 0.32rem;
    z-index: 11;
    color: #fff;
    padding: 0.15rem;
    font-size: 0.24rem;
    border-radius: 6px;
    border: 0.02rem solid rgba(117, 117, 128, 1);
    background-color: rgba(0, 0, 0, 0.6);
  }
  .close {
    width: 0.56rem;
    height: 0.56rem;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
    z-index: 11;
    .iconfont {
      color: #fff;
      font-size: 0.32rem;
    }
  }
  .content {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    @include blackwhite-background-gradient();
    z-index: 1;
  }
  .info {
    width: 100%;
    padding: 1.66rem 0.32rem 0.32rem;
    text-align: left;
    .p1 {
      color: #fff;
      font-size: 0.28rem;
      .span1 {
        max-width: 3.8rem;
      }
    }
    .p2 {
      color: #fff;
      font-size: 0.24rem;
      margin: 0.08rem 0 0;
      .span2 {
        margin: 0 0.24rem 0 0;
      }
    }
  }
  .buttons {
    padding: 0 0.64rem 0.4rem;
    .button-item {
      .iconfont {
        font-size: 0.4rem;
        color: #fff;
      }
      .button-title {
        font-size: 0.24rem;
        margin: 0.1rem 0 0;
        color: #fff;
      }
    }
  }
  .awards {
    position: absolute;
    right: 0.3rem;
    bottom: 2.2rem;
    z-index: 2;
    .award-item {
      &:not(:first-child) {
        margin: 0.32rem 0 0;
      }
      .iconfont {
        font-size: 0.38rem;
        color: #fff;
        &.iconxihuan-cai {
          font-size: 0.32rem;
        }
      }
      .award-title {
        font-size: 0.24rem;
        color: #fff;
      }
    }
  }
  .loading {
    width: 1rem;
    height: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 0.1rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
}
</style>
