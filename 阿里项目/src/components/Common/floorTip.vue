<template lang="html">
  <div class="floor-tip">
    <div :class="['pull-tip', 'col-all-center', pullTip ? '' : 'hide']">
      <i v-show="pullTip" class="iconfont iconerloushipin-xiaojiantou ani-updown"></i>
      <span v-show="pullTip">{{ $t('common.dropdown') }}</span>
    </div>
    <div :class="['pull-button', 'col-all-center', pullTip ? '' : 'show']">
      <i class="iconfont iconxiala"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pullTip: true
    }
  },
  created() {
    setTimeout(() => {
      this.pullTip = false
    }, 3500)
  },
  methods: {}
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';
.floor-tip {
  position: relative;
  z-index: 3;
  .pull-tip {
    height: 1rem;
    font-size: 0.26rem;
    transition: all 0.4s;
    &.hide {
      height: 0;
    }
    @include text-base-color();
    .iconfont {
      font-size: 0.32rem;
    }
  }
  .pull-button {
    width: 0.5rem;
    height: 0.25rem;
    border-radius: 0 0 0.5rem 0.5rem;
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0px 0px 20px 0px rgba(38, 71, 127, 0.29);
    position: absolute;
    top: -0.5rem;
    left: 50%;
    margin: 0 0 0 -0.25rem;
    transition: all 0.4s;
    &.show {
      top: 0;
    }
    .iconfont {
      color: #333;
      transform: scale(0.5);
      font-size: 0.24rem;
    }
  }
}
</style>
