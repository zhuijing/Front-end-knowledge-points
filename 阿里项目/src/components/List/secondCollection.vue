<template lang="html">
  <van-popup class="dialog-collection" v-model="visible" @close="close">
    <div class="collection-wrapper col-start-center">
      <span class="close col-all-center" @click="close"><i class="iconfont iconchahao-quanping"></i></span>
      <h2 class="collection-name" v-html="secondCollectionObj.activity_name"></h2>
      <div class="list-box flex flex-wrap">
        <template v-if="secondCollectionObj.theme == 10">
          <a :href="item.activity_url" class="activity-item type1 row-start-center" :style="`borderColor: ${item.color}`" v-for="(item, index) in secondCollectionObj.activity_list" :key="index">
            <span class="gather-item__name">{{ item.title }}</span>
            <i class="iconfont iconfenhuichang-jiantou"></i>
          </a>
        </template>
        <template v-if="secondCollectionObj.theme == 11">
          <a :href="item.activity_url" class="activity-item type2" :style="`border:none; backgroundImage: url(${item.little_img});`" v-for="(item, index) in secondCollectionObj.activity_list" :key="index"></a>
        </template>
        <template v-if="secondCollectionObj.theme == 12">
          <a :href="item.activity_url" class="activity-item type3 flex-auto" :style="`backgroundImage: url(${item.little_img});`" v-for="(item, index) in secondCollectionObj.activity_list" :key="index">
            <span class="gather-item__name ellipsis">{{ item.title }}</span>
          </a>
        </template>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    secondCollectionObj: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      visible: false
    }
  },
  watch: {
    secondCollectionObj(n, o) {
      this.visible = n.activity_name ? true : false
    }
  },
  methods: {
    close() {
      this.$emit('hideSecondCollection')
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';
.dialog-collection {
  height: 100vh;
  background-color: #000;
  .collection-wrapper {
    width: 7.5rem;
    height: 100%;
    padding: 1rem 0.24rem .2rem;
  }
  .collection-name {
    font-size: 0.42rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    text-align: center;
  }
  .list-box {
    width: 100%;
    max-height: 100%;
    margin: 0.5rem 0 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .activity-item {
    border-radius: 0.16rem;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    margin: 0.18rem 0 0;
    position: relative;
    &.type1 {
      width: 100%;
      min-height: 1rem;
      padding: 0 0.6rem 0 0.24rem;
      font-size: 0.28rem;
      border-width: 0.02rem;
      border-style: solid;
      text-align: left;
      @include title-border-color();
      .gather-item__name {
        font-size: 0.28rem;
        color: #fff;
      }
      .iconfont {
        font-size: 0.24rem;
        color: #fff;
        font-weight: 300;
        position: absolute;
        right: 0.12rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    &.type2 {
      width: 100%;
      height: 1rem;
      &:first-child {
        margin: 0;
      }
    }
    &.type3 {
      width: 3.34rem;
      max-width: 3.4rem;
      height: 2.4rem;
      border: none;
      background-color: rgba(204, 204, 204, 1);
      &:nth-child(2n + 1) {
        margin: 0.18rem 0.18rem 0 0;
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
  .close {
    width: 0.56rem;
    height: 0.56rem;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
    z-index: 11;
    .iconfont {
      color: #fff;
      font-size: 0.32rem;
    }
  }
}
</style>
