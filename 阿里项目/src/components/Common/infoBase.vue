<template lang="html">
  <div class="info-base" :style="{marginTop:`${activityDetails.head_img == null || activityDetails.head_img == '' ? 0.22 :-0.24 }rem`}">
    <div :class="['info-title']">
      <div class="infor-text">
        <h2 v-html="name"></h2>
      </div>
      <div class="row-between-center">
        <p class="p1" v-if="dataShow">{{ activityDetails.view_count }}{{ texts }}</p>
        <p v-else></p>
        <div class="row-all-center">
          <div class="info-line" v-if="showType !== 'none'"></div>
          <router-link v-if="showType === 'hide' || showType === 'image'" :class="['info-entry', 'flex-none','type1']" to="/info" @click.native="vister">
            <p>{{ $t('common.information') }}</p>
            <!-- <p class="small">View details</p> -->
          </router-link>
          <div v-if="showType === 'show'" :class="['info-entry', 'flex-none','col-all-center']" @click="scrollToPhoto">
            <p>查看图片</p>
            <!-- <p class="small">View Photos</p> -->
          </div>
          <div class="info-line" v-if="hasInvite"></div>
          <div v-if="hasInvite" :class="['info-entry', 'flex-none','col-all-center']" @click="UPDATE_INVITE(true)">
            <p>{{ $t('common.invite') }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="info-desc" v-if="showType === 'show'">
      <div class="info-item">
        <div class="ui-title col-all-center" v-if="hasTime || diyTime">
          <h3 class="big ui-font--600">活动时间</h3>
          <p class="small ui-font--300">Date & Time</p>
        </div>
        <div class="title--modify"></div>
        <p class="intro" v-if="diyTime" v-html="diyTime"></p>
        <p class="intro" v-if="hasTime">{{ activityDetails.start_date }} {{activityDetails.start_time}} - {{ activityDetails.end_date }} {{activityDetails.end_time}}</p>
      </div>
      <div class="info-item" v-if="activityDetails.place">
        <div class="ui-title col-all-center">
          <h3 class="big ui-font--600">活动地点</h3>
          <p class="small ui-font--300">Event Location</p>
        </div>
        <div class="title--modify"></div>
        <p class="intro" v-html="place"></p>
      </div>
      <div class="info-item" v-if="activityDetails.description || configParam.descPic">
        <div class="ui-title col-all-center">
          <h3 class="big ui-font--600">活动简介</h3>
          <p class="small ui-font--300">Activity Brief</p>
        </div>
        <div class="title--modify"></div>
        <p class="intro" v-html="description"></p>
        <img @click="showBigInforImg(configParam.descPic)" class="info-intreduce--img" :src="configParam.descPic">
      </div>
      <div class="info-item" v-for="item in diyInfo">
        <div class="ui-title col-all-center">
          <h3 class="big ui-font--600">{{ item.title }}</h3>
        </div>
        <div class="title--modify"></div>
        <p class="intro" v-html="item.content"></p>
        <img @click="showBigInforImg(item.img)" class="info-intreduce--img" :src="item.img">
      </div>
    </div>
    <div v-if="showGuest" :style="guestMode === 'twoLine' ? 'padding: 0 .3rem .3rem' : 'padding: .2rem .2rem .1rem'">
      <guest @hideGuestBlock="hideGuestBlock" :mode="guestMode"></guest>
    </div>
    <infor-big></infor-big>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { visitRecord, toBottom, replaceReturn } from 'utils/tool'
import guest from 'components/Common/guest'
import inforBig from 'components/Dialog/dailogViewBIgImage'
export default {
  components: {
    guest: guest,
    'infor-big':inforBig
  },
  data() {
    return {
      showGuest: true,
    }
  },
  computed: {
    ...mapState(['activityDetails','inforPhotos']),
    texts() {
      let a = ''
      let status = this.activityDetails.status
      if (status === 5) {
        a = this.$t('common.waitstatus')
      } else if (status === 10) {
        a = this.$t('common.watchstatus')
      } else {
        a = this.$t('common.watchedstatus')
      }
      return a
    },
    showType() {
      let contractor = this.activityDetails.contractor
        ? JSON.parse(this.activityDetails.contractor)
        : [{ type: 'hide' }]
      let type = contractor.slice(-1)[0].type
      return type
    },
    guestMode() {
      let mode = this.showType === 'show' ? 'twoLine' : 'oneLine'
      return mode
    },
    buttonType() {
      let color = this.activityDetails.color
      switch (color) {
        case 5:
          return 'type2'
          break
        case 3:
          return 'type3'
          break
        default:
          return 'type1'
      }
    },

    dataShow() {
      // -1：人数不展示
      return this.activityDetails.data_show !== -1
    },
    description() {
      let a = this.activityDetails.description || ''
      return replaceReturn(a)
    },
    place() {
      let a = this.activityDetails.place || ''
      return replaceReturn(a)
    },
    name() {
      let a = this.activityDetails.name || ''
      return replaceReturn(a)
    },
    // 是否展示时间
    hasTime() {
      return (this.activityDetails.enable & 4096) === 0 && !this.diyTime
    },
    hasInvite() {
      return (this.activityDetails.enable & 256) > 0
    },
    // 自定义时间
    diyTime() {
      let time = ''
      if (this.activityDetails.contractor) {
        let contractor = this.activityDetails.contractor
        contractor = JSON.parse(contractor)
        time = contractor.splice(-3, 1)[0].time
      }
      return replaceReturn(time)
    },
    // 自定义信息
    diyInfo() {
      let arr = []
      if (this.activityDetails.contractor) {
        let contractor = this.activityDetails.contractor

        contractor = JSON.parse(contractor)
        arr = contractor.splice(0, contractor.length - 3)
        arr.map((item) => {
          item.content = replaceReturn(item.content)
        })
      }
      return arr
    },
    configParam() {
      return this.activityDetails.config_param
    },
  },
  methods: {
    ...mapMutations(['UPDATE_INVITE','UPDATE_INFORPHOTO']),
    vister() {
      visitRecord('live_button', 'activity_info')
    },
    scrollToPhoto() {
      let photoEle = document.getElementById('scollViewPic')
      let st = photoEle.offsetTop - 10
      toBottom(st)
    },
    hideGuestBlock() {
      this.showGuest = false;
    },
    showBigInforImg(img){
      let obj = {
        show:true,
        picList : [ {
          big_img : img
        }]
      }
      this.UPDATE_INFORPHOTO(Object.assign(this.inforPhotos,obj))
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/scss/index.scss';

.info-base {
  position: relative;
  margin-top: -0.44rem;
  // padding: 0 0 .3rem;
  width: 7.1rem;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  @include background-card-color();
  position: relative;
  z-index: 6;
  .info-title {
    min-height: 1.28rem;
    padding: .2rem;
    @include background-atmosphere();
  }
  h2 {
    font-size: 0.36rem;
    text-align: center;
    @include title-color();
    word-break: break-all;
  }
  .infor-text {
    min-width: 5rem;
    padding: 0 0.2rem;
  }
  .info-entry {
    // width: 1.2rem;
    // height: 0.92rem;
    text-align: right;
    border-radius: 0.46rem;
    font-size: 0.24rem;
    margin: 0 0 0 0.28rem;
    background-size: contain;
    @include title-color();
    font-weight: 300;
    &:not(:last-child) {
      margin: 0 0.28rem 0;
    }
    .small {
      transform: scale(0.66);
    }
  }
  .p1 {
    font-size: 0.24rem;
    text-align: center;
    font-weight: 300;
    margin: 0.04rem 0 0;
    @include title-color();
    span {
      font-size: 0.36rem;
      font-weight: 700;
      @include text-active-color();
    }
  }
  .info-line {
    width: 1px;
    height: 0.4rem;
    @include line-gradient();
    transform: rotate(35deg);
  }
  .info-desc {
    margin: 0.3rem 0 0;
    .info-item {
      margin: 0 0 0.6rem;
      h3 {
        position: relative;
        z-index: 2;
        &:after {
          content: '';
          width: 0.38rem;
          height: 0.38rem;
          border-radius: 50%;
          position: absolute;
          left: -0.25rem;
          top: -0.04rem;
          z-index: -1;
          @include background-color();
        }
      }
    }
    .title--modify {
      width: 0.28rem;
      height: 0.04rem;
      margin: 0.1rem auto 0.2rem;
      @include background-gradient-color();
    }
    .intro {
      font-size: 0.24rem;
      word-break: break-all;
      padding: 0 .2rem;
      @include text-base-color();
    }
    .info-intreduce--img {
      width: 6.86rem;
      display: block;
      font-size: 0.28rem;
      color: #333;
      border-radius: 0.16rem;
      margin: 0.32rem auto 0;
    }
  }
}
</style>
