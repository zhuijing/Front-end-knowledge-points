<template lang="html">
  <div class="pp-start" ref="view">
    <div class="main-view-wrapper col-start-center">
      <div :class="['main-view', 'flex-auto']" :style="`backgroundImage: url(${startParam.url})`"></div>
      <div :class="['main-view-enter', 'row-all-center', isSmallButton ? 'small' : '']" @click="enter">
        <span>{{ isSmallButton ? '跳过' : startParam.text }}</span>
        <i v-if="isSmallButton" class="iconfont icongengduo1"></i>
      </div>
      <div v-if="isOpen" class="main-view-interval row-all-center">{{ times }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // ani: false,
      times: 0,
      isClickEnter: false,
    }
  },
  mounted() {
    // this.$nextTick( () => {
    //   this.startHasAni();
    // })
    if (this.isOpen && this.isTime > 0) {
      this.setTime(this.isTime);
    }
  },
  computed: {
    ...mapState([
      'activityDetails'
    ]),
    startParam() {
      return this.activityDetails.back_img_param || {};
    },
    isSmallButton() {
      return this.startParam.size === 2;
    },
    isOpen() {
      return this.startParam.open;
    },
    isTime() {
      return this.startParam.time;
    }
  },
  watch: {
    isTime() {
      if (this.isOpen && this.isTime > 0) {
        this.setTime(this.isTime);
      }
    }
  },
  methods: {
    // startHasAni() {
    //   let view = this.$refs.view;
    //   let ww = view.offsetWidth;
    //   let wh = view.offsetHeight;
    //   let img = new Image();
    //   img.src = this.startParam.url;
    //   let that = this;
    //   img.onload = function() {
    //     let ih = img.height;
    //     let iw = img.width;
    //     if ((wh / ww) < (ih / iw)) {
    //       that.ani = true;
    //     }
    //   }
    // },
    enter() {
      this.isClickEnter = true;
      this.goWhere();
    },
    setTime(t) {
      let that = this;
      this.times = t;
      let timer = setTimeout(function() {
        that.times--;
        if (that.times <= 0) {
          clearTimeout(timer);
          if (!that.isClickEnter) {
            that.goWhere();
          }
        } else {
          that.setTime(that.times);
        }
      }, 1000)
    },
    goWhere() {
      [101, 102].includes(this.activityDetails.color)
        ? this.$router.push('/listpp')
        : this.$router.push('/list')
      this.open = false;
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';
.pp-start {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  .main-view-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .main-view {
    width: 100%;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    // &.ani {
    //   animation: mainViewAni 3s ease 1s 1;
    // }
  }
  .main-view-enter {
    width: 3rem;
    height: .9rem;
    background: rgba(245,245,250,.5);
    box-shadow: 0px 0px 10px 0px rgba(152,152,166,1);
    border-radius: .45rem;
    position: absolute;
    left: 50%;
    margin-left: -1.5rem;
    bottom: .6rem;
    &.small {
      margin-left: 1.4rem;
      width: 1.8rem;
      padding: 0 0 0 .18rem;
    }
  }
  .main-view-enter span {
    color: #333;
    font-size: .32rem;
  }
  .main-view-enter .iconfont {
    color: #333;
    font-size: .4rem;
  }
  .main-view-interval {
    width: .72rem;
    height: .72rem;
    border-radius: 50%;
    position: absolute;
    right: .4rem;
    top: .4rem;
    background: rgba(26, 26, 26, 0.4);
    color: #fff;
    font-size: .32rem;
    font-weight: 700;
  }
  // @keyframes mainViewAni {
  //   0% {
  //     background-position: top center;
  //   }
  //   40%, 60% {
  //     background-position: bottom center;
  //   }
  //   100% {
  //     background-position: top center;
  //   }
  // }
}
</style>
