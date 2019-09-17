<template lang="html">
  <div>
    <!-- <audio :src="url" id="musicPlay" loop="loop"></audio> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { audioAutoPlay } from 'utils/tool'

export default {
  props: ['url'],
  mounted() {
    setTimeout(() => {
      this.$autoPlay(this.url) // main.js 定义
    }, 1000)
  },
  computed: {
    ...mapState([
      'functions'
    ])
  },
  methods: {

  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';

</style>
