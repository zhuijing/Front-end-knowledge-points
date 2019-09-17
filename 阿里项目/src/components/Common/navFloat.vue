<template lang="html">
  <div :class="['nav-float','type2']" v-show="yanchiShow">
    <!-- 深色版 -->
    <template>
      <div class="pan col-start-center">
        <div v-if="hasAppointment" class="pan-item icon5" @click="doWhat('appointment')"></div>
        <div v-if="hasMe" class="pan-item icon4" @click="doWhat('mine')"></div>
      </div>
    </template>
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
  getBroswer,
  isMiniapp
} from 'utils/tool'
const ACTIVITYNO = Cookies.get('activity_no')


export default {
  data() {
    return {
      yanchiShow: false
    }
  },
  created() {
    // 延迟出现 并打开
    setTimeout(() => {
      this.yanchiShow = true
    }, 1500)
  },
  computed: {
    ...mapState(['activityDetails', 'functions']),
    isDark() {
      return this.activityDetails.color % 2 === 1
    },
    locale() {
      return this.$i18n.locale
    },
    sell() {
      return this.activityDetails.is_sell
    },
    hasFind() {
      return (this.sell & 32) > 0 || (this.sell & 2097152) > 0
    },
    hasAppointment() {
      return ((this.sell & 2048) > 0 && (this.sell & 8388608) > 0)
    },
    hasMe() {
      return getBroswer().weChat && !isMiniapp() && (this.sell & 16) > 0
    }
  },
  watch: {
    locale(n) {
      const theme = window.document.documentElement.getAttribute('data-theme')
      n === 'en'
        ? window.document.documentElement.setAttribute(
            'data-lang',
            `${theme}--en`
          )
        : window.document.documentElement.removeAttribute('data-lang')
    }
  },
  methods: {
    ...mapMutations(['UPDATE_FUNCTIONS', 'UPDATE_REDBAG']),
    doWhat(id) {
      switch (id) {
        case 'appointment':
          [101, 102].includes(this.activityDetails.color) ? this.$router.push('/appointmentpp') : this.$router.push('/appointment')
          break
        case 'mine':
          window.location.href = `//${window.location.host}/page3/home/me`
          break
      }
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';
.nav-float {
  position: fixed;
  bottom: 3rem;
  z-index: 200;
  // &.type1 {
  //   right: 0;
  //   .nav-button {
  //     width: 0.68rem;
  //     height: 0.68rem;
  //     border-radius: 50% 0 0 50%;
  //     @include background-gradient-color();
  //     position: relative;
  //     z-index: 202;
  //     box-shadow: 0px 0px 20px 0px rgba(38, 71, 127, 0.29);
  //   }
  //   .pan {
  //     position: absolute;
  //     width: 2.1rem;
  //     height: 4.2rem;
  //     @include background-color();
  //     box-shadow: 0px 0px 20px 0px rgba(38, 71, 127, 0.29);
  //     border-radius: 4.2rem 0 0 4.2rem;
  //     transition: all 0.3s;
  //     right: 0;
  //     top: -1.76rem;
  //     z-index: 201;
  //     transform: rotateZ(180deg);
  //     transform-origin: right center;
  //     &.open {
  //       transform: rotateZ(0);
  //     }
  //     .pan-item {
  //       font-size: 0.18rem;
  //       color: #000;
  //       position: absolute;
  //       &.five1 {
  //         right: 1.3rem;
  //         top: 1.8rem;
  //       }
  //       &.five2 {
  //         right: 0.18rem;
  //         top: 0.38rem;
  //       }
  //       &.five3 {
  //         right: 0.18rem;
  //         top: 3.24rem;
  //       }
  //       &.five4 {
  //         right: 0.9rem;
  //         top: 0.92rem;
  //       }
  //       &.five5 {
  //         right: 0.9rem;
  //         top: 2.7rem;
  //       }
  //       &.four1 {
  //         right: 0.18rem;
  //         top: 0.38rem;
  //       }
  //       &.four2 {
  //         right: 1.2rem;
  //         top: 1.22rem;
  //       }
  //       &.four3 {
  //         right: 1.2rem;
  //         top: 2.36rem;
  //       }
  //       &.four4 {
  //         right: 0.18rem;
  //         top: 3.24rem;
  //       }
  //       .iconfont {
  //         font-size: 0.32rem;
  //       }
  //       img {
  //         width: 0.4rem;
  //       }
  //     }
  //   }
  // }
  &.type2 {
    right: 0;
    bottom: 1.6rem;
    .pan-item {
      width: 1.2rem;
      height: 1.2rem;
      background-size: 1.2rem auto;
      @include icons();
      &.icon1 {
        background-position: 0 0;
      }
      &.icon2 {
        background-position: 0 -1.2rem;
      }
      &.icon3 {
        background-position: 0 -2.4rem;
      }
      &.icon4 {
        background-position: 0 -3.6rem;
      }
      &.icon5 {
        background-position: 0 -4.8rem;
      }
    }
  }
}
</style>
