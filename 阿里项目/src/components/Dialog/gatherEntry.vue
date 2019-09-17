<template lang="html">
  <div class="gather-entry" v-if="activityDetails.father_activity_no">
    <div :class="['gather-button', 'col-all-center', 'ui-btn', open ? 'open' : '']" @click="openGather">
      <i v-show="open" :class="['iconfont iconxiala']"></i>
      <span v-show="!open">{{ $t('common.home') }}</span>
    </div>
    <transition name="van-fade">
      <div class="gather-masking" v-show="open" @click="openGather"></div>
    </transition>
    <transition name="van-slide-up">
      <div class="gather-content" v-show="open">
        <div class="gather-top col-all-center">
          <h3 class="gather-title">{{ activityDetails.father_activity_name }}</h3>
          <p class="gather-router" @click="goHome">前往主会场 ></p>
        </div>
        <div class="gather-box flex flex-wrap">
          <template v-if="[10, 13].includes(activityDetails.father_activity_them)">
            <a :href="item.activity_url" class="gather-item type1 row-start-center" v-for="(item, index) in fatherActivityList" :key="index" :style="`border-color: ${item.color}`">
              <span class="gather-item__name">{{ item.title }}</span>
              <i class="iconfont iconfenhuichang-jiantou"></i>
            </a>
          </template>
          <template v-if="activityDetails.father_activity_them == 11">
  <a :href="item.activity_url" class="gather-item type2" :style="`border:none; backgroundImage: url(${item.little_img});`" v-for="(item, index) in fatherActivityList" :key="index"></a>
</template>
          <template v-if="activityDetails.father_activity_them == 12">
  <a :href="item.activity_url" class="gather-item type3" :style="`backgroundImage: url(${item.little_img});`" v-for="(item, index) in fatherActivityList" :key="index">
    <span class="gather-item__name ellipsis">{{ item.title }}</span>
  </a>
</template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      open: false
    }
  },
  computed: {
    ...mapState(['activityDetails']),
    fatherActivityList() {
      const list = this.activityDetails.father_activity_list
      const HOST = window.location.host
      // 替换host 后台无法处理
      list.map(item => {
        if (item.type !== 301) {
          let urlArr = item.activity_url.split('/')
          urlArr[2] = HOST
          item.activity_url = urlArr.join('/')
        }
      })
      // 替换host 后台无法处理
      return list
    }
  },
  methods: {
    openGather() {
      this.open = !this.open
    },
    goHome() {
      window.location.href = `//${window.location.host}/live/${
        this.activityDetails.father_activity_no
      }`
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';

.gather-entry {
  .gather-button {
    width: 1.2rem;
    height: 0.6rem;
    border-radius: 0.3rem;
    @include background-gradient-color();
    box-shadow: 0px 0px 16px -2px rgba(0, 0, 0, 0.3);
    @include text-theme-color();
    position: fixed;
    left: 50%;
    bottom: 1.6rem;
    margin: 0 0 0 -0.6rem;
    z-index: 1002;
    font-size: 0.24rem;
    transition: all 0.2s;
    &.open {
      bottom: 0.4rem;
    }
    .iconfont {
      &.iconxiala {
        font-size: 0.24rem;
        transform: scale(0.7);
      }
    }
    span {
      line-height: 1;
    }
  }
  .gather-masking {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.7);
  }
  .gather-content {
    width: 100%;
    max-height: 70%;
    padding: 0 0 2rem;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1001;
    @include background-color();
    .gather-top {
      width: 100%;
      min-height: 1.36rem;
      padding: .2rem;
      @include background-card-color();
      .gather-title {
        font-size: 0.36rem;
        font-weight: 600;
        @include title-color();
      }
      .gather-router {
        font-size: 0.24rem;
        // margin: 0.12rem 0 0.3rem;
        @include text-active-color();
      }
    }

    .gather-box {
      padding: 0 0.2rem;
      .gather-item {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        overflow: hidden;
        flex: auto;
        margin: 0.2rem 0 0;
        position: relative;
        &.type1 {
          width: 100%;
          min-height: .9rem;
          padding: 0 0.4rem 0;
          font-size: 0.28rem;
          text-align: left;
          border-style: solid;
          border-width: 0.02rem;
          border-color: transparent;
          @include border-auxiliary-color();
          .gather-item__name {
            font-size: 0.28rem;
          }
          .iconfont {
            font-size: 0.24rem;
            @include text-auxiliary-color();
            font-weight: 300;
            position: absolute;
            right: 0.36rem;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        &.type2 {
          width: 100%;
          height: 1rem;
        }
        &.type3 {
          width: 3.4rem;
          max-width: 3.45rem;
          height: 2.4rem;
          border: none;
          background-color: rgba(204, 204, 204, 1);
          &:nth-child(2n + 1) {
            margin: 0.2rem 0.2rem 0 0;
          }
          .gather-item__name {
            width: 100%;
            padding: 0 0.2rem;
            font-size: 0.28rem;
            color: #fff;
            line-height: 0.5rem;
            background-color: rgba(0, 0, 0, 0.5);
            text-align: center;
            position: absolute;
            bottom: 0;
            left: 0;
          }
        }
      }
    }
  }
}
</style>
