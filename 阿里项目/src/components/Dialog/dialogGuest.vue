<template lang="html">
  <van-popup class="dialog-guest" v-model="visible" @close="close">
    <div class="guest-wrapper col-start-center" v-if="visible">
      <span class="close col-all-center" @click.stop.prevent="close"><i class="iconfont iconchahao-quanping"></i></span>

      <div class="guest-img flex-none">
        <img v-show="guestObj.big_img" :src="guestObj.big_img">
      </div>
      <p class="guest-name flex-none">{{ guestObj.name }}</p>
      <p class="guest-title flex-none">{{ guestObj.title }}</p>
      <p class="guest-describe flex-none" v-html="description"></p>
      <div class="guest-qrcode flex-none">
        <img v-show="guestObj.qr_code" :src="guestObj.qr_code" class="qrcode">
      </div>
      <a v-show="guestObj.url" :href="guestObj.url" class="guest-link flex-none">前往相关页面 &gt;</a>
    </div>
  </van-popup>
</template>

<script>
import { replaceReturn } from 'utils/tool'
import  { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    ...mapState(['guestObj']),
    description() {
      return replaceReturn(this.guestObj.description)
    }
  },
  watch: {
    guestObj(n, o) {
      this.visible = n.name ? true : false;
    }
  },
  methods: {
    ...mapMutations(['UPDATE_GUEST']),
    close() {
      this.UPDATE_GUEST({});
    },
  }
}
</script>

<style lang="scss">
@import "assets/scss/index.scss";
.dialog-guest {
  height: 100vh;
  background-color: #000;
  z-index: 20150000 !important;
  .guest-wrapper {
    width: 7.5rem;
    padding: 2rem .5rem 1rem;
  }
  .guest-img {
    width: 4.7rem;
    font-size: 0;
    img {
      width: 100%;
    }
  }
  .guest-name {
    font-size: .38rem;
    font-weight: 700;
    color: #fff;
    line-height: .38rem;
    text-align: center;
    margin: .5rem 0 0 0;
  }
  .guest-title {
    font-size: .28rem;
    color: #ccc;
    margin: .17rem 0 0 0;
  }
  .guest-describe {
    max-width: 100%;
    word-break: break-all;
    font-size: .26rem;
    color: #808080;
    line-height: .4rem;
    text-align: justify;
    margin: .17rem 0 0 0;
  }
  .guest-qrcode {
    width: 1.94rem;
    margin: .39rem 0 0 0;
    img {
      width: 100%;
    }
  }
  .guest-link {
    font-size: .3rem;
    margin: .16rem 0 0 0;
    color: #ccc;
  }
  .close {
    width: .56rem;
    height: .56rem;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, .6);
    position: absolute;
    right: .3rem;
    top: .3rem;
    z-index: 110000;
    .iconfont {
      color: #fff;
      font-size: .32rem;
    }
  }
}

</style>
