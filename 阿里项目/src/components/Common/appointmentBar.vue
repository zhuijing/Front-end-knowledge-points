<template lang="html">
  <div class="appointment-bar flex">
    <router-link v-if="hasAppointment" class="info-order" to="/appointment">{{ appointmentName }}</router-link>
    <!-- <a v-else-if="!hasAppointment && hasTryPhotoplus" class="info-order" href="http://www.photoplus.cn">{{ $t('info.freeuse') }}</a> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['activityDetails']),
    hasTryPhotoplus() {
      return ((this.activityDetails.is_sell & 256)  <= 0 && this.activityDetails.color > 100 )? true : false
    },
    hasAppointment() {
      // 2048为有预约 有8388608预约位置为右下角悬浮
      return (this.activityDetails.is_sell & 2048) > 0 &&
        (this.activityDetails.is_sell & 8388608) === 0
        ? true
        : false
    },
    appointmentName() {
      let ad_title = this.activityDetails.company_des.ad_title
      return ad_title ? ad_title : this.$t('appointment.title')
    }
  },
  methods: {}
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';
.appointment-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  .info-order {
    width: 7.5rem;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    @include text-auxiliary-color();
    font-size: 0.32rem;
    @include background-theme-color();
  }
}
</style>
