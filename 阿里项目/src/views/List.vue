<template lang="html">
  <div :class="['list-pushi', hasAppointment ? 'pb' : '']">

    <van-popup :class="['live-block', 'floor2', isTwoFloor ? 'trans' : '']" v-model="twofloorVisible" :lock-scroll="twofloorLock" :overlay="false">
      <section class="col-all-center">
        <span class="close col-all-center" @click="cancelFloor"><i class="iconfont iconchahao-quanping"></i></span>
        <video-play v-if="!floorDisabled"></video-play>
      </section>
    </van-popup>

    <section :class="['live-block', 'floor1', isTwoFloor ? 'trans' : '']" ref="container">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled="floorDisabled"
      :pulling-text="$t('common.dropdown')"
      :loosing-text="$t('common.dropdown')"
      :loading-text="$t('common.loading')"
      >
      <!-- 二楼视频提示 -->
      <floor-tip v-if="!floorDisabled"></floor-tip>
      <banner></banner>
      <info-base></info-base>
      <div class="list-item hot-photo" v-if="hasHot && hotList.length">
        <h2>{{ $t('list.hot') }}</h2>
        <div class="item-content flex">
          <div class="hot-item flex-none" v-for="(item, index) in hotList" :style="`backgroundImage: url(${item.small_img})`" :key="index" @click="showBigPhoto(item, index)"></div>
        </div>
      </div>

      <div class="list-item" v-if="hasIframe">
        <h2>{{ $t('common.livevideo') }}</h2>
        <div class="item-content">
          <video-live :url="activityDetails.video_url"></video-live>
        </div>
      </div>
      <!-- 滚动位置 -->
      <div id="scollViewPic"></div>
      <div class="list-item activity-list">
        <h2>{{ $t('list.livephoto') }}</h2>
        <div class="item-content flex flex-wrap" v-if="activityList.length">
          <template v-if="activityDetails.theme == 10">
            <template v-for="(item, index) in activityList">
              <a v-if="item.activity_list" @click="showSecondCollection(item)" class="activity-item type1 row-start-center" :style="`borderColor: ${item.color}`">
                <span class="gather-item__name">{{ item.title }}</span>
                <i class="iconfont iconfenhuichang-jiantou"></i>
              </a>
              <a v-else :href="item.activity_url" class="activity-item type1 row-start-center" :style="`borderColor: ${item.color}`">
                <span class="gather-item__name">{{ item.title }}</span>
                <i class="iconfont iconfenhuichang-jiantou" :style="`color: ${item.color}`"></i>
              </a>
            </template>

          </template>
          <template v-if="activityDetails.theme == 11">
            <template v-for="(item, index) in activityList">
              <a v-if="item.activity_list" @click="showSecondCollection(item)" class="activity-item type2" :style="`border:none; backgroundImage: url(${item.little_img});`"></a>
              <a v-else :href="item.activity_url" class="activity-item type2" :style="`border:none; backgroundImage: url(${item.little_img});`"></a>
            </template>
          </template>
          <template v-if="activityDetails.theme == 12">
            <template v-for="(item, index) in activityList">
              <a v-if="item.activity_list" @click="showSecondCollection(item)" class="activity-item type3" :style="`backgroundImage: url(${item.little_img});`">
                <span class="gather-item__name ellipsis">{{ item.title }}</span>
              </a>
              <a v-else :href="item.activity_url" class="activity-item type3" :style="`backgroundImage: url(${item.little_img});`">
                <span class="gather-item__name ellipsis">{{ item.title }}</span>
              </a>
            </template>

          </template>
          <!-- <div class="activity-item" v-for="(item, index) in activityList" :key="index"></div> -->
        </div>
        <p class="no-tip" v-else>暂无活动</p>
      </div>
      <brand-photoplus></brand-photoplus>

    </van-pull-refresh>
  </section>

  <!-- 集合页入口 -->
  <gather-entry></gather-entry>
  <!-- 预约或试用 -->
  <appointment-bar></appointment-bar>
  <!-- 大图弹窗 -->
  <dialog-listphoto></dialog-listphoto>
  <!-- 右下角按钮组 -->
  <nav-float @toTop="toTop"></nav-float>
  <!-- 二级集合页弹窗 -->
  <second-collection :secondCollectionObj="secondCollectionObj" @hideSecondCollection="hideSecondCollection"></second-collection>
  <!-- 顶部按钮 -->
  <nav-top></nav-top>
  <!-- 音乐 -->
  <music-play v-if="hasAudio" :url="activityDetails.music_url"></music-play>
  <!-- 嘉宾弹窗 -->
  <guest-dialog></guest-dialog>
  <!-- 邀请生成图片弹窗 -->
  <div id="qrcode"></div>
  <dialog-invite></dialog-invite>
  <!-- 推广弹窗市场 -->
  <dialog-popularizemarket></dialog-popularizemarket>
  <!-- 推广弹窗大图 -->
  <!-- <dialog-popularizepic></dialog-popularizepic> -->


</div>
</template>

<script>
import api from 'api/api'
import Cookies from 'js-cookie'
import { mapState, mapMutations } from 'vuex'
import { toTop } from 'utils/tool'
import infoBase from 'components/Common/infoBase'
import banner from 'components/Common/banner'
import videoLive from 'components/Common/videoLive'
import swiperPhoto from 'components/Common/swiperPhoto'
import brandPhotoplus from 'components/Common/brand'
import appointmentBar from 'components/Common/appointmentBar'
import navFloat from 'components/Common/navFloat'
import navTop from 'components/Common/navTop'
import secondCollection from 'components/List/secondCollection'
import gatherEntry from 'components/Dialog/gatherEntry'
import dialogListPhoto from 'components/Dialog/dialogListPhoto'
import floorTip from 'components/Common/floorTip'
import guestDialog from 'components/Dialog/dialogGuest'
import musicPlay from 'components/Common/musicPlay'
import dialogInvite from 'components/Dialog/dialogInvite'
import dialogPopularizeMarket from 'components/Dialog/dialogPopularizeMarket'
import dialogPopularizePic from 'components/Dialog/dialogPopularizePic'
import videoPlay from 'components/Common/videoPlay'
import 'video.js/dist/video-js.css'
const ACTIVITYNO = Cookies.get('activity_no')

export default {
  components: {
    'info-base': infoBase,
    banner: banner,
    'video-live': videoLive,
    'swiper-photo': swiperPhoto,
    'brand-photoplus': brandPhotoplus,
    'appointment-bar': appointmentBar,
    'nav-float': navFloat,
    'nav-top':navTop,
    'second-collection': secondCollection,
    'gather-entry': gatherEntry,
    'dialog-listphoto': dialogListPhoto,
    'video-play': videoPlay,
    'floor-tip':floorTip,
    'music-play': musicPlay,
    'guest-dialog': guestDialog,
    'dialog-invite': dialogInvite,
    'dialog-popularizemarket': dialogPopularizeMarket,
    'dialog-popularizepic': dialogPopularizePic,
  },
  data() {
    return {
      hotParams: {
        activityNo: ACTIVITYNO,
        from: 0,
        size: 9
      },
      hotList: [],
      secondCollectionObj: {},

      isTwoFloor: false,
      floorDisabled: true,
      twofloorVisible: true,
      twofloorLock: false,
      isLoading: false
    }
  },
  created() {
    let media = this.activityDetails.media_url
    if (media) {
      if (media.mediaUrl && media.location === 0 && (this.activityDetails.is_sell & 32768) > 0) {
        this.floorDisabled = false
      }
    }
    this.getHotPhotos()
  },
  watch: {
    activityDetails(n, m) {
      if (n.media_url.mediaUrl && (n.is_sell & 32768) > 0 && n.media_url.location === 0) {
        this.floorDisabled = false
      }
    }
  },
  mounted() {
    // this.playerOptions.width = document.body.clientWidth
  },
  computed: {
    ...mapState(['activityDetails']),
    activityList() {
      let list = this.activityDetails.activity_list || []
      const HOST = window.location.host
      // 替换host 后台无法处理
      list.map((item) => {
        if (item.type !== 301) {
          let urlArr = item.activity_url.split('/');
          urlArr[2] = HOST;
          item.activity_url = urlArr.join('/');
        }
      })
      // 替换host 后台无法处理
      return list
    },
    hasAudio() {
      return (
        (this.activityDetails.is_sell & 67108864) > 0 &&
        this.activityDetails.music_url
      )
    },
    hasIframe() {
      return (
        (this.activityDetails.is_sell & 16384) > 0 &&
        this.activityDetails.video_url
      )
    },
    // 是否有试用或预约
    hasAppointment() {
      // 2048为有预约 有8388608预约位置为右下角悬浮
      return ((this.activityDetails.is_sell & 2048) > 0 &&
      (this.activityDetails.is_sell & 8388608) === 0)
      ? true
      : false
    },
    hasHot() {
      return (this.activityDetails.is_sell & 64) > 0
    },
    hasTryPhotoplus() {
      return ((this.activityDetails.is_sell & 256)  <= 0 && this.activityDetails.color > 100 )? true : false
    }
  },
  methods: {
    ...mapMutations(['UPDATE_PHOTOS', 'UPDATE_BIGPHOTOOBJ', 'UPDATE_VIDEOPAUSE']),
    getHotPhotos() {
      api.listHot(this.hotParams).then(res => {
        this.hotList = res.result.pics
        this.UPDATE_PHOTOS(this.hotList)
      })
    },
    showBigPhoto(item, index) {
      this.UPDATE_BIGPHOTOOBJ({ index: index, show: true })
    },
    showSecondCollection(item) {
      this.secondCollectionObj = item
    },
    hideSecondCollection() {
      this.secondCollectionObj = {}
    },
    toTop() {
      toTop()
    },
    cancelFloor() {
      this.isTwoFloor = false
      this.twofloorLock = false
      this.UPDATE_VIDEOPAUSE(true)
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false
        this.isTwoFloor = true
        this.twofloorLock = true
      }, 500)
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';

.list-pushi {
  width: 100%;
  min-height: 100vh;
  &.pb {
    padding: 0 0 0.88rem;
  }
  .live-block {
    width: 100%;
    transition: all 0.8s;
    @include background-color();
    &.floor2 {
      height: 100%;
      position: fixed;
      left: 0;
      top: auto;
      bottom: 100%;
      z-index: 10000;
      transform: none;
      display: block !important;
      section {
        width: 7.5rem;
        height: 100%;
        position: relative;
        & > .close {
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
      }
    }
    &.trans {
      transform: translateY(100%);
    }
  }
  .video-js .vjs-big-play-button {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .van-pull-refresh {
    min-height: 100vh;
  }
  .van-pull-refresh__track {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    &.notransform {
      transform: none !important;
    }
  }
  .van-pull-refresh__head {
    height: 2rem;
    @include text-base-color();
  }
  .list-item {
    margin: 0.48rem 0 0;
    padding: 0 0.24rem;
    &.activity-list {
      flex: auto;
    }
    &.hot-photo {
      margin: 0.48rem 0;
    }
    h2 {
      font-size: 0.32rem;
      text-align: left;
      @include title-color();
      position: relative;
      &::before{
        content: '';
        position: absolute;
        left: -.24rem;
        top: .06rem;
        width: 1px;
        height: .32rem;
        border-left:.06rem solid transparent;
        @include text-active-border-color();
      }
    }
    .item-content {
      margin: 0.32rem 0 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    .hot-item {
      width: 1.8rem;
      height: 1.8rem;
      margin: 0 0.16rem 0 0;
      // border-radius: 0.16rem;
      background-size: cover;
      background-position: center top;
    }
    .activity-item {
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      overflow: hidden;
      flex: auto;
      margin: 0.18rem 0 0;
      position: relative;
      &.type1 {
        width: 100%;
        min-height: .9rem;
        padding: 0 0.6rem 0 0.24rem;
        font-size: 0.28rem;
        border-width: 0.04rem;
        border-style: solid;
        text-align: left;
        @include border-auxiliary-color();
        // @include background-theme-color();
        .gather-item__name {
          font-size: 0.28rem;
          font-weight: 600;
          @include title-color();
        }
        .iconfont {
          font-size: 0.24rem;
          @include text-auxiliary-color();
          font-weight: 300;
          position: absolute;
          right: 0.12rem;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      &.type2 {
        width: 100%;
        height: 1rem;
        &:first-child {
          margin: 0;
        }
      }
      &.type3 {
        max-width: 3.4rem;
        width: 3.34rem;
        height: 2.4rem;
        border: none;
        background-color: rgba(204, 204, 204, 1);
        &:nth-child(2n + 1) {
          margin: 0.18rem 0.18rem 0 0;
        }
        .gather-item__name {
          width: 100%;
          padding: 0 0.2rem;
          font-size: 0.28rem;
          color: #fff;
          line-height: 0.5rem;
          background-color: rgba(0, 0, 0, 0.5);
          text-align: center;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
  .no-tip {
    font-size: 0.24rem;
    @include text-base-color();
    margin: 2rem 0 0;
  }
}
#qrcode {
  overflow: hidden;
  width: 0;
  height: 0;
}
</style>
