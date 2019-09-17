<template>
  <!-- 固定顶部按钮 -->
  <div class="nav-top">
    <span :class="['nav-top-icon']" @click="switchLanguage()">
      <i :class="['iconfont',$i18n.locale === 'zh' ? 'iconEN' : 'iconzhong']"></i>
    </span>
    <span :class="['nav-top-icon',functions.isMusicOpen ? 'roate' :'close']" v-if="functions.hasMusic" @click="switchMusic">
      <i class="iconfont iconyinle"></i>
    </span>
  </div>
</template>

<script>
import api from 'api/api'
import { mapState, mapMutations } from 'vuex'
import Cookies from 'js-cookie'
import {
  audioAutoPlay,
  visitRecord,
  pleaseOpenWx,
  getBroswer
} from 'utils/tool'
const ACTIVITYNO = Cookies.get('activity_no')
export default {
  data() {
    return {
      panItems: [],
      open: false,
      yanchiShow: false
    }
  },
  computed: {
    ...mapState(['activityDetails', 'functions'])
  },
  created() {
    this.functionsInit()
  },
  watch: {
    activityDetails() {
      this.functionsInit()
    }
  },
  methods: {
    ...mapMutations(['UPDATE_FUNCTIONS']),
    functionsInit() {
      const sell = this.activityDetails.is_sell
      let hasMusic =
        (sell & 67108864) > 0 && this.activityDetails.music_url ? true : false
      let obj = {
        hasMusic: hasMusic,
      }
      this.UPDATE_FUNCTIONS(Object.assign(this.functions , obj))
    },
    switchMusic() {
      let mu = document.getElementById('musicPlay')
      if (this.functions.isMusicOpen) {
        mu.pause()
        this.UPDATE_FUNCTIONS(Object.assign({}, this.functions, { isMusicOpen: false }))
      } else {
        mu.play()
        this.UPDATE_FUNCTIONS(Object.assign({},this.functions, { isMusicOpen: true }))
      }
    },
    switchLanguage() {
      this.$i18n.locale = this.$i18n.locale === 'zh' ? 'en' : 'zh'
      window.i18n.locale = this.$i18n.locale
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';
.nav-top {
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  display: flex;
  z-index: 999;
  .close {
    position: relative;
    ::after {
      content: '';
      width: 0.02rem;
      height: 0.35rem;
      position: absolute;
      top: 0.01rem;
      left: 50%;
      background-color: hsla(0, 0%, 80%, 1);
      transform: rotate(-35deg);
    }
  }
  .nav-top-icon {
    width: 0.44rem;
    height: 0.44rem;
    border-radius: 0.2rem;
    display: block;
    text-align: center;
    box-shadow: 0px 2px 12px -4px rgba(0, 0, 0, 0.2);
    margin-left: 0.14rem;
    @include background-color();
    position: relative;
    &.roate {
      animation: iconroate 5s linear infinite;
    }
    .iconfont {
      position: absolute;
      top: .025rem;
      left: 50%;
      transform: translate(-50%);
      line-height: 0.4rem;
      @include text-auxiliary-color();
      font-size: 0.24rem;
    }
  }
}
@keyframes iconroate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
