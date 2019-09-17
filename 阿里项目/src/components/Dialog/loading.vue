<template lang="html">
  <div class="pp-loading col-all-center">
    <div class="loading-round col-all-center ani-rotate"></div>
    <div :class="['loading-body',  hasAd ? 'ad' : '']">
      <img class="loading-eye ani-rotate" src="../../assets/image/loading/loading-eye.png" alt="">
    </div>
    <img v-if="hasAd" class="loading-ad" src="../../assets/image/logo.png" alt="">
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState([
      'activityDetails'
    ]),
    hasAd() {
      return false;
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';

</style>
