<template lang="html">
  <van-popup class="dialog-bigphoto" :overlay="true" v-model="visible" v-if="visible" @close="close">
    <span class="close col-all-center" v-show="!isPure" @click="close"><i class="iconfont iconchahao-quanping"></i></span>
    <div class="livephoto-wrapper">
      <swiper-photo
      @close="close"
      @slideChange="slideChange(...arguments)"
      @onZoom="onZoom"
      @onDrag="onDrag(...arguments)"
      :activeIndex="activeIndex"
      :picList="whatPhotos"
      @click.native="togglePureMode"
      >
      </swiper-photo>
    </div>
    <div class="loading col-all-center" v-show="loadingShow">
      <van-loading type="spinner" color="white"/>
    </div>

  </van-popup>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import swiperPhoto from 'components/Common/swiperPhoto'
import dialogShare from 'components/Dialog/dialogShare'
import Cookies from 'js-cookie'
import { visitRecord, clickRecord, getBroswer } from 'utils/tool'
import api from 'api/api'
const ACTIVITYNO = Cookies.get('activity_no')
export default {
  components: {
    'swiper-photo': swiperPhoto,
    'dialog-share': dialogShare,
  },
  data() {
    return {
      visible: false,
      activeIndex: 0,
      isPure: false,
      loadingShow: false,
      Likes: [],
      haslike: false,
      faces: [],

      shareParams: {
        type: 'pic'
      }
    }
  },
  computed: {
    ...mapState(['inforPhotos']),
    whatPhotos() {
      return  this.inforPhotos.picList
    },
    isWx() {
      return getBroswer().weChat
    }
  },
  watch: {
    inforPhotos:{
      handler(n){
      this.visible = n.show
      this.isPure = false
      },
      deep:true
    }
  },
  created() {
  },
  methods: {
    ...mapMutations(['UPDATE_INFORPHOTO']),
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
       let obj = {
        show:false,
        picList : []
      }
      this.UPDATE_INFORPHOTO(Object.assign(this.inforPhotos,obj))
    },
    togglePureMode() {
      this.isPure = !this.isPure
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';
.dialog-bigphoto {
  background-color: transparent;
  overflow: hidden;
  .livephoto-wrapper {
    width: 7.5rem;
    position: relative;
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
    &.hasFace {
      top: 1.84rem;
    }
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
