<template lang="html">
  <div class="common-video">
    <div v-show="isPause" @click="play" class="poster col-all-center" :style="`backgroundImage: url(${poster})`">
      <div class="play-icon row-all-center"><i class="iconfont iconplay"></i></div>
    </div>
    <!-- v-if="" -->
    <video-player v-show="!isPause"
    class="vjs-custom-skin"
    :playsinline="true"
    :options="playerOptions"
    @play="onPlayerPlay($event)"
    @pause="onPlayerPause($event)"
    ref="vDom"
    ></video-player>

  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    'video-player': videoPlayer
  },
  data() {
    return {
      isPause: true,
      playerOptions: {
        width: document.body.clientWidth,
        height: document.body.clientWidth / 750 * 100 * 4.22,
        sources: [
          {
            type: 'video/mp4',
            src: ''
          }
        ],
        poster: ''
      },
    }
  },
  computed: {
    ...mapState(['activityDetails', 'videoPause']),
    poster() {
      return this.activityDetails.media_url.coverUrl
    }
  },
  watch: {
    videoPause(n) {
      this.isPause = n
    }
  },
  mounted() {

  },
  methods: {
    ...mapMutations(['UPDATE_VIDEOPAUSE']),
    play() {
      this.UPDATE_VIDEOPAUSE(false)
      if (!this.playerOptions.sources[0].src) {
        let media = this.activityDetails.media_url
        this.playerOptions.sources[0].src = media.mediaUrl
      }
      setTimeout(() => {
        let a = this.$refs.vDom.$el
        let v = a.getElementsByTagName('video')[0]
        v.removeAttribute('x5-video-player-type')
        v.play()
      }, 100)

    },
    onPlayerPlay(player) {

    },
    onPlayerPause(player) {
      this.UPDATE_VIDEOPAUSE(true)
    },
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';
.common-video {
  width: 100%;
  .poster {
    width: 100%;
    height: 4.22rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    .play-icon {
      width: .96rem;
      height: .96rem;
      background-color: rgba(0,0,0,0.3);
      border: .04rem solid #fff;
      border-radius: 100%;
      .iconfont {
        color: #fff;
        font-size: .56rem;
        margin: 0 0 0 .04rem;
      }
    }
  }
  .vjs-big-play-button {
    display: none !important;
  }
}
</style>
