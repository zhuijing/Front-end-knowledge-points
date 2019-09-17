<template>
  <div id="app">
    <router-view />
    <audio id="musicPlay" loop="loop" controls autoplay style="display: none;"></audio>
  </div>
</template>
<script>
import { GetSearchParam } from 'utils/tool'
export default {
  created() {
    // 获取无水印参数
    let nw = GetSearchParam('nw')
  },
  methods: {
    // 音乐播放兼容方案
    autoPlay(src) {
      let audio = document.getElementById('musicPlay')
      console.log(audio);
      // audio.addEventListener('ended', cb, false)
      audio.src = src
      audio.load()
      audio.play()
    },
    play() {
      let audio = document.getElementById('musicPlay')
      audio.load()
    },
    mounted() {
      // 音乐播放兼容方案
      let that = this
      wx.ready(function(){
        that.play()
      })
      document.addEventListener('WeixinJSBridgeReady', that.play, false)
      document.addEventListener('YixinJSBridgeReady',  that.play, false);
      // 音乐播放兼容方案
    }
  },
}
</script>
<style lang="scss">
@import 'assets/scss/index.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  @include background-color();
}
</style>
