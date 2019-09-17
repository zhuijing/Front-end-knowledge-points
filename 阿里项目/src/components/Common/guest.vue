<template lang="html">
  <div class="guest">
    <div class="mode-1" v-if="displayMode === 'twoLine'">
      <!-- 主办方 -->
      <div :class="['guest-block row-start-center flex-wrap']">
        <div class="guest-item sponsor flex-auto" v-for="(item,index) in sponsorList" :key="item.index"  @click="showGuestDialog(item)">
          <div class="guest-box col-start-center" >
            <div class="guest-avator flex-auto" :style="{backgroundImage:`url(${item.big_img})`}"></div>
            <p :class="['guest-title', 'ellipsis', 'flex-none', item.title ? '' : 'opacity']">{{item.title}}</p>
          </div>
          <h4 class="guest-name ellipsis">{{item.name}}</h4>
        </div>
      </div>
      <!-- 嘉宾 -->
      <div :class="['guest-block row-start-center flex-wrap']">
        <div class="guest-item guest flex-auto" v-for="(item,index) in guestList" :key="item.index"  @click="showGuestDialog(item)">
          <div class="guest-box col-start-center" >
            <div class="guest-avator flex-auto" :style="{backgroundImage:`url(${item.big_img})`}"></div>
            <p :class="['guest-title', 'ellipsis', 'flex-none', item.title ? '' : 'opacity']">{{item.title}}</p>
          </div>
          <h4 class="guest-name ellipsis">{{item.name}}</h4>
        </div>
      </div>
    </div>
    <div class="mode-2" v-else>
      <div class="guest-block scroll row-start-center flex-none">
        <div class="guest-item sponsor flex-none" v-for="(item,index) in sponsorList" :key="item.index"  @click="showGuestDialog(item)">
          <div class="guest-box col-start-center" >
            <div class="guest-avator flex-auto" :style="{backgroundImage:`url(${item.big_img})`}"></div>
            <p :class="['guest-title', 'ellipsis', 'flex-none', item.title ? '' : 'opacity']">{{item.title}}</p>
          </div>
          <h4 class="guest-name ellipsis">{{item.name}}</h4>
        </div>
        <div class="guest-item guest flex-none" v-for="(item,index) in guestList" :key="item.index"  @click="showGuestDialog(item)">
          <div class="guest-box col-start-center" >
            <div class="guest-avator flex-auto" :style="{backgroundImage:`url(${item.big_img})`}"></div>
            <p :class="['guest-title', 'ellipsis', 'flex-none', item.title ? '' : 'opacity']">{{item.title}}</p>
          </div>
          <h4 class="guest-name ellipsis">{{item.name}}</h4>
        </div>
        <!-- 占位用 -->
        <div style="height: 1px; width: .14rem; flex: none;"></div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import api from 'api/api'
import Cookies from 'js-cookie'
const ACTIVITYNO = Cookies.get('activity_no')

export default {
  props: ['mode'],
  data() {
    return {
      guestList: [],
      sponsorList: [],

      isScroll: false,
      displayMode: this.mode,
    }
  },
  watch: {
    mode(n) {
      console.log(n);
      this.displayMode = n;
    }
  },
  created() {
    this.getGustList()
  },
  methods: {
    ...mapMutations(['UPDATE_GUEST']),
    getGustList() {
      api
        .getGuestBrand({
          activityNo: ACTIVITYNO
        })
        .then(res => {
          let list = res.result.guest_list
          if (!list.length) {
            this.$emit('hideGuestBlock');
            return;
          }
          this.sponsorList = list.filter(item => {
            return item.type === 2
          })
          this.guestList = list.filter(item => {
            return item.type === 1
          })
        })
    },
    showGuestDialog(item) {
      this.UPDATE_GUEST(item)
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';
.guest {
  width: 100%;
  .mode-1 {
    .guest-block {
      margin: .16rem 0 0;
    }
    .guest-item {
      margin: 0.16rem 0 0;
      &.sponsor {
        &:not(:nth-child(3n)) {
          margin: 0.16rem 0.16rem 0 0;
        }
      }
      &.guest {
        &:not(:nth-child(5n)) {
          margin: 0.16rem 0.16rem 0 0;
        }
      }
    }
  }
  .mode-2 {
    // .guest-block {
    //   padding: .2rem 0 .2rem .3rem;
    // }
    .guest-item {
      margin: 0 .16rem 0 0;
    }
  }
  // .guest-block {
  //   margin: 0.2rem 0 0;
  // }



  .guest-item {
    // width: 100%;
    position: relative;
    // margin: 0.16rem 0 0;
    &.sponsor {
      // min-width: 2rem;
      width: 2rem;
      max-width: 2.1rem;
      .guest-avator {
        height: 1.27rem;
      }
    }
    &.guest {
      // min-width: 1.2rem;
      width: 1.2rem;
      max-width: 1.28rem;
      .guest-avator {
        height: 1.27rem;
      }
    }
    .guest-box {
      overflow: hidden;
      @include border-radius();
    }
    .guest-avator {
      width: 100%;
      position: relative;
      background-size: cover;
      background-position: center;
    }
    .guest-title {
      width: 100%;
      text-align: center;
      font-size: 0.24rem;
      line-height: 0.4rem;
      height: .4rem;
      @include background-theme-color();
      @include text-auxiliary-color();
      &.opacity {
        opacity: 0;
      }
    }
    .guest-name {
      font-size: 0.24rem;
      padding: .04rem 0 0;
      text-align: center;
      font-weight: 400;
      line-height: .38rem;
      @include text-base-color();
    }
  }
  .scroll {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
