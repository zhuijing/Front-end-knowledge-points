<template lang="html">

  <div class="brand">
  <div class="brand-lsit" v-for="(item,index) in brand">
    <div  class="brand-title row-all-center">
      <i class="iconfont iconsanjiaoxing befor"></i>
      <span>{{item.name}}</span>
      <i class="iconfont iconsanjiaoxing after"></i>
    </div>
    <p class="brand-content" v-html="item.description"></p>
    <img @click="showBigInforImg(item.big_img)"  v-if="item.big_img" :src="item.big_img">
    <a v-if="item.url" :href="item.url">前往相关页面 ></a>
  </div>
  <div class="brand-pushi">
    <!-- 谱时介绍 -->
    <div class="ad-pushi col-start-center" v-if="hasBrand">
      <div class="ad-title row-all-center">
        <span class="ad-title__content">
          <i class="iconfont iconsanjiaoxing befor"></i>{{ $t('brand.aboutplus') }}
          <i class="iconfont iconsanjiaoxing after"></i>
          </span>
      </div>
      <p class="ad-content" v-html="$t('brand.plus')"></p>
      <p class="ad-content" style="font-weight: 400; margin: 0;">【{{ $t('brand.service') }}】</p>
      <p class="ad-content" style="font-weight: 400;" v-html="$t('brand.servicetype')"></p>
      <!-- ewm -->
      <div class="ewm col-start-center">
        <p class="ewm-p1">{{ $t('brand.sloganplus') }}</p>
        <p class="ewm-p2" v-html="$t('brand.ewmplus')"></p>
        <img src="//q.plusx.cn/wechat/diy/pushi1805/image/ewm-1.png" class="ewmImg">
      </div>
    </div>
    <!-- power -->
    <div class="info-power" v-if="hasPower"></div>
    <infor-big></infor-big>
  </div>
  </div>
</template>

<script>
import { mapState , mapMutations } from 'vuex'
import { replaceReturn } from 'utils/tool'
import logo_w from 'assets/image/icon_info__logo.png'
import logo_b from 'assets/image/icon_info_black__logo.png'
import inforBig from 'components/Dialog/dailogViewBIgImage'
import api from 'api/api'
import Cookies from 'js-cookie'
const ACTIVITYNO = Cookies.get('activity_no')

export default {
  data() {
    return {
      brand: []
    }
  },
  components: {
    'infor-big':inforBig
  },
  computed: {
    ...mapState(['activityDetails','inforPhotos']),
    hasBrand() {
      return (this.activityDetails.is_sell & 2) > 0 ? false : true
    },
    hasPower() {
      return (this.activityDetails.is_sell & 4) > 0 ? false : true
    },
    logo() {
      return this.activityDetails.color % 2 === 0 ? logo_w : logo_b
    }
  },
  created() {
    this.getGustList()
  },
  methods: {
    ...mapMutations(['UPDATE_INFORPHOTO']),
    getGustList() {
      api
        .getGuestBrand({
          activityNo: ACTIVITYNO
        })
        .then(res => {
          this.brand = res.result.band_list
          this.brand.map((item) => {
            item.description = replaceReturn(item.description)
          })
        })
    },
    showBigInforImg(img){
      console.log(img)
      let obj = {
        show:true,
        picList : [ {
          big_img : img
        }]
      }
      this.UPDATE_INFORPHOTO(Object.assign(this.inforPhotos,obj))
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';
.brand {
  margin: 2rem 0 0;
}
.brand-pushi {
  .ad-pushi {
    width: 100%;
    margin: 0.88rem 0 0 0;
    padding: 0 0.4rem;
  }
  .ad-title {
    margin: 0 0 0.38rem 0;
  }
  .ad-title__content {
    font-size: 0.4rem;
    letter-spacing: 0.12rem;
    margin: 0 0.26rem 0 0.4rem;
    font-weight: 700;
    text-align: center;
    position: relative;
    @include text-base-color();
  }
  .ad-title__content {
    .befor,
    .after {
      position: absolute;
      left: -0.5rem;
      top: 50%;
      font-size: 0.24rem;
      transform: translateY(-50%) scale(0.5);
      display: inline-block;
    }
  }
  .ad-title__content {
    .after {
      left: unset;
      right: -0.45rem;
    }
  }
  .ewm {
    width: 100%;
    @include text-base-color();
  }
  .ewm-p1 {
    font-size: 0.3rem;
    font-weight: 700;
    line-height: 0.54rem;
    text-align: center;
    @include text-base-color();
  }
  .ewm-p2 {
    font-size: 0.28rem;
    line-height: 0.48rem;
    font-weight: 300;
    text-align: center;
    @include text-base-color();
  }
  .ewmImg {
    width: 4rem;
    height: 4rem;
    margin: 0.2rem 0 0.4rem;
  }
  .cusLogoImg {
    width: 100%;
  }
  .ad-content {
    font-size: 0.28rem;
    font-weight: 300;
    line-height: 0.48rem;
    @include text-base-color();
    margin: 0 0 0.44rem 0;
    text-align: center;
  }
  .cusWebSite {
    margin: 0.24rem 0 0 0;
    width: 100%;
    height: 0.9rem;
    font-size: 0.3rem;
    background: #222;
    color: #d5d5d5;
    border: 1px solid tranparent;
  }
  .download {
    width: 100%;
    margin: 0.26rem 0 0;
  }
  .download-img {
    width: 3.65rem;
    height: 2.81rem;
    background-image: url(//q.plusx.cn/wechat/liveplus/image/download-tip2.png);
    background-size: contain;
  }

  .download-button {
    border: 1px solid #fff;
    width: 4.32rem;
    height: 0.9rem;
    font-size: 0.32rem;
    font-weight: 600;
    color: #fff;
    margin: 0.24rem 0 0;
  }
  .download-icon {
    color: #fff;
    font-size: 0.24rem;
    margin-right: 0.1rem;
  }
  .info-power {
    background-image: url('../../assets/image/powerPushi.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% auto;
    color: #fff;
    font-size: 0.24rem;
    height: 0.6rem;
    line-height: 0.6rem;
    // margin-bottom: 0.88rem;
    margin-top: 0.8rem;
  }
}
.brand-lsit {
  width: 6.7rem;
  margin: 0 auto;
  .brand-title {
    font-size: 0.4rem;
    margin: 0 0 0.38rem 0;
    font-weight: 700;
    text-align: center;
    // position: relative;
    @include text-base-color();
  }
  span {
    position: relative;
    letter-spacing: 0.12rem;
    padding: 0 0 0 .12rem;
  }
  .befor,
  .after {
    font-size: 0.24rem;
    // position: absolute;
    // left: -0.5rem;
    // top: 50%;
    // -webkit-transform: translateY(-50%) scale(0.8);
    transform: scale(0.5);
    // display: inline-block;
  }

  // span .after {
  //   left: unset;
  //   right: -0.45rem;
  // }
  .brand-content {
    font-size: 0.28rem;
    line-height: 0.48rem;
    margin-bottom: 0.3rem;
    font-weight: 300;
    text-align: center;
    @include text-base-color();
  }
  img {
    width: 6.7rem;
    display: block;
    margin: 0.36rem auto 0.3rem;
  }
  a {
    font-size: 0.28rem;
    width: 100%;
    height: 0.8rem;
    text-align: center;
    line-height: 0.8rem;
    border-width: 1px;
    border-style: solid;
    @include text-base-color();
    @include text-active-border-color();
    display: block;
  }
}
</style>
