<template lang="html">
  <div class="video-live">
    <iframe class="iframe-live" :src="url"></iframe>
    <!-- <div class="iframe-masking" @click="toTop"></div> -->
  </div>
</template>

<script>
import { toTop } from 'utils/tool'

export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    toTop() {
      toTop()
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';
.video-live {
  width: 100%;
  height: 100%;
  border-radius: 0.16rem;
  overflow: auto;
  position: relative;
  @include background-color();
  .iframe-live {
    width: 100%;
    height: 100%;
    border: none;
    margin: 0 auto;
  }
  .iframe-masking {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
