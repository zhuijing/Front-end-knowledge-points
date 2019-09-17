<template lang="html">
  <transition name="van-fade">
    <div v-show="shareLoadingShow" class="dialog-share" @click="close"></div>
  </transition>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { wxShare } from 'utils/share'

export default {
  props: ['photoInfo'],
  data() {
    return {

    }
  },
  computed: {
    ...mapState([
      'shareLoadingShow',
      'activityDetails',
    ])
  },
  watch: {
    shareLoadingShow(n) {
      let shareParams = {
        title: this.activityDetails.wx_title,
        desc: this.activityDetails.wx_desc,
        link: '',
        imgUrl: this.activityDetails.wx_img,
      }
      if (n) {
        shareParams.link = `//${window.location.host}/activity/live/pic/one/${this.photoInfo.pic_hash}`;
      } else {
        shareParams.link = '';
      }
      wxShare(shareParams);
    }
  },
  methods: {
    ...mapMutations([
      'UPDATE_SHARELOADING'
    ]),
    close() {
      this.UPDATE_SHARELOADING(false);
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';
.dialog-share {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999999;
  background: url(//q.plusx.cn/wechat/liveplus/image/shareguide.gif) no-repeat center;
  background-size: cover;
}
</style>
