<template lang="html">
  <div class="appointment">
    <span class="back flex" @click="$router.go(-1)"><i class="iconfont iconfanhui"></i></span>
    <div class="head col-all-center">
      <img src="../assets/image/appointment/pushi-logo.png" alt="">
    </div>
    <div class="main col-start-center">
      <div class="main-form">
        <!-- <i class="iconfont iconyuyue-xiangji"></i> -->
        <!-- <p class="p1">{{ appointmentName }}</p> -->
        <h2>{{ $t('appointment.pushititle') }}</h2>
        <h3 v-html="$t('appointment.pushiyouhui')"></h3>
        <div class="form">
          <van-field v-model="params.name" :placeholder="$t('placeholder.contactname')" @blur="iosBug" />
          <van-field v-model="params.phone" :placeholder="$t('placeholder.mobilenumber')" @blur="iosBug" />
          <van-field v-model="params.verifyCode" :placeholder="$t('placeholder.code')" @blur="iosBug">
            <div :class="['code-button', 'row-all-center', loading ? 'active' : '']" slot="button" @click="getCode">{{ loading ? time + 's' : this.$t('appointment.get') }}</div>
          </van-field>
          <van-field v-model="params.city" :placeholder="$t('placeholder.city')" @blur="iosBug" />
          <!-- <div @click="showArea"><van-field v-model="params.city" :label="$t('appointment.place')" placeholder="" /></div> -->
        </div>
        <div :class="['submit-button', 'row-all-center', isSubmit ? 'active' : '']" @click="submit">
          {{ $t('appointment.submit') }}
        </div>
      </div>
      <!-- submit tip -->
      <div class="bg1 contact col-all-center">
        <p class="tip" v-html="$t('appointment.pushicontact')"></p>
        <a href="tel:400-1010-660" class="phone row-all-center">
          <i class="iconfont icondianhua"></i>
          <span>400-1010-660</span>
        </a>
      </div>
      <!-- performance -->
      <div class="bg2 performance col-all-center">
        <div class="performance-item row-all-center">
          <i class="iconfont iconfugaidiqu"></i>
          <p class="tip">服务覆盖 <span>100多</span> 个国家和地区</p>
        </div>
        <div class="performance-item row-all-center">
          <i class="iconfont iconsheyingshi"></i>
          <p class="tip">全球签约超过 <span>3000余名</span> 职业摄影师</p>
        </div>
        <div class="performance-item row-all-center">
          <i class="iconfont iconpinpai"></i>
          <p class="tip">服务全球超过 <span>5000个</span> 客户和品牌</p>
        </div>
        <div class="performance-item row-all-center">
          <i class="iconfont iconpaishe"></i>
          <p class="tip">全球范围内拍摄超过 <span>3万+场</span></p>
        </div>
        <div class="performance-item row-all-center">
          <i class="iconfont iconliulanrenci"></i>
          <p class="tip">全球超过 <span>1亿</span> 人次浏览过谱时图片直播页</p>
        </div>
      </div>
      <!-- 身边的品牌 -->
      <div class="brand">
        <p class="title">{{ $t('appointment.pushirelate') }}</p>
        <img src="../assets/image/appointment/partner.png" alt="">
      </div>
      <!-- 二维码 -->
      <div class="bg1 qrcode col-all-center">
        <img src="//q.plusx.cn/wechat/diy/pushi1805/image/ewm-1.png" alt="">
        <p class="tip" v-html="$t('brand.ewmplus')"></p>
      </div>
      <!-- <p class="tip">{{ $t('appointment.submitsucc') }}</p> -->
      <!-- <p class="tip">提交预约后,摄影师会以最快的速度联系您~ <br>想了解更多摄影师的信息,您也可查看TA的个人主页</p> -->
      <!-- <router-link class="more" to="">查看更多</router-link> -->
      <!-- <h2>{{ $t('appointment.title') }}</h2> -->

    </div>

    <!-- <van-area :area-list="areaList" /> -->
    <!-- 右下角按钮组 -->
    <!-- <nav-float @toTop="toTop"></nav-float> -->
  </div>
</template>

<script>
import api from 'api/api'
import Cookies from 'js-cookie'
import { mapState } from 'vuex'
import { isPhone, fixIosInputBug, toTop, visitRecord } from 'utils/tool'
// import navFloat from 'components/Common/navFloat'
// import { mapState, mapMutations } from 'vuex';
const ACTIVITYNO = Cookies.get('activity_no')

export default {
  components: {
    // 'nav-float': navFloat
  },
  data() {
    return {
      params: {
        activityNo: ACTIVITYNO,
        phone: '',
        verifyCode: '',
        name: '',
        city: '',
        content: '活动号：' + ACTIVITYNO + '，谱时预约拍摄；'
      },
      time: 60,
      loading: false,
      isSubmit: false
    }
  },
  computed: {
    ...mapState(['activityDetails']),
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    visitRecord('live_button', 'live_order')
  },
  methods: {
    getCode() {
      if (this.loading) {
        return
      }
      if (!isPhone(this.params.phone)) {
        this.$toast({ message: '请输入正确的手机号', duration: 1000 })
        return
      }
      this.loading = true
      api.getVerifyCode({ phone: this.params.phone }).then(res => {
        this.setTimer()
        this.$toast({ message: '已发送', duration: 1000 })
      })
    },
    setTimer() {
      let that = this
      setTimeout(function() {
        that.time--
        if (that.time <= 0) {
          that.loading = false
          that.time = 60
        } else {
          that.setTimer()
        }
      }, 1000)
    },
    submit() {
      if (!this.params.name) {
        this.$toast({ message: '请输入姓名', duration: 1000 })
        return
      }
      if (!isPhone(this.params.phone)) {
        this.$toast({ message: '请输入正确的手机号', duration: 1000 })
        return
      }
      if (!this.params.verifyCode) {
        this.$toast({ message: '请输入验证码', duration: 1000 })
        return
      }
      this.isSubmit = true
      api
        .addOrder(this.params)
        .then(res => {
          if (res.success) {
            this.$toast({ message: '预约成功', duration: 3000 })
          }
          this.resetSubmit()
          this.isSubmit = false
          this.time = 0
        })
        .catch(() => {
          this.isSubmit = false
          this.$toast({ message: '验证码错误', duration: 1000 })
        })
      visitRecord('live_button', 'live_order_submit')
    },
    resetSubmit() {
      this.params.phone = ''
      this.params.verifyCode = ''
      this.params.name = ''
      this.params.city = ''
    },
    iosBug() {
      fixIosInputBug()
    },
    showArea() {},
    toTop() {
      toTop()
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';
.appointment {
  width: 100%;
  // height: 100vh;
  position: relative;
  // overflow: auto;
  // -webkit-overflow-scrolling: touch;
  .back {
    position: absolute;
    left: .3rem;
    top: .3rem;
    padding: 0 .2rem .2rem 0;
    color: #fff;
    i {
      font-size: 0.32rem;
    }
  }
  .head {
    width: 100%;
    height: 1.82rem;
    background-color: #34496A;
    img {
      width: 4rem;
    }
  }
  .main {
    background-color: #fff;
    .main-form {
      width: 100%;
      padding: 0.5rem .4rem 0;
    }
    h2 {
      font-size: 0.42rem;
      color: #384967;
    }
    h3 {
      color: #9898A6;
      font-size: .24rem;
      margin: .1rem 0 0;
    }
    .form {
      width: 100%;
      padding: 0.3rem 0;
      .van-cell {
        padding: 0.2rem 0;
        .van-cell__title {
          font-size: 0.32rem;
          max-width: 1.7rem;
          display: flex;
          align-items: center;
          color: #333;
        }
        .van-cell__value {
          input {
            border-style: solid;
            border-width: 0.02rem;
            padding: 0 0.2rem;
            color: #34496A;
            border-color: #CFCFDD;
            height: 0.76rem;
            font-size: .3rem;
            border-radius:0;
            &::-webkit-input-placeholder {
              /* WebKit browsers */
              color: #CFCFDD;
            }
            &:focus {
              border-color: #34496A;
            }
          }
        }
        &:not(:last-child)::after {
          border-bottom: none;
        }
        .code-button {
          min-width: 2.1rem;
          height: .76rem;
          font-size: .3rem;
          text-align: center;
          background-color: #34496A;
          color: #fff;
          margin: 0 0 0 .3rem;
          &.active {
            // @include text-base-color();
            opacity: .5;
          }
        }
      }
    }
    .submit-button {
      width: 100%;
      height: 0.9rem;
      font-size: 0.36rem;
      color: #FFB500;
      background-color: #34496A;
      &.active {
        background-color: #ccc;
        color: #fff;
      }
    }

    .bg1 {
      width: 100%;
      background: url(//q.plusx.cn/wechat/diy/pushi1805/image/xiexian.png);
    }
    .contact {
      margin: .6rem 0 0;
      padding: .4rem;
      .phone {
        width: 6.7rem;
        height: 1rem;
        border: 1px solid #9898A6;
        margin: .4rem 0 0;
        .iconfont {
          font-size: .4rem;
          color: #757580;
          margin: 0 .24rem 0 0;
        }
        span {
          font-size: .36rem;
          color: #757580;
        }
      }
    }
    .performance {
      width: 100%;
      background-image: url(../assets/image/appointment/map.png);
      background-size: cover;
      background-position: center;
      padding: .4rem 0;
      .performance-item {
        &:not(:last-child) {
          margin: 0 0 .5rem;
        }
        .iconfont {
          font-size: .32rem;
          margin: 0 .24rem 0 0;
        }
        span {
          color: #FFB500;
        }
      }
    }
    .brand {
      width: 100%;
      padding: .4rem 0;
      .title {
        font-size: .42rem;
        font-weight: 600;
      }
      img {
        width: 6.8rem;
        margin: .4rem 0 0;
      }
    }
    .qrcode {
      padding: .4rem 0;
      img {
        width: 2.9rem;
      }
      .tip {
        margin: .3rem 0 0;
      }
    }
    .tip {
      font-size: 0.28rem;
      color: #757580;
    }
    .more {
      font-size: 0.28rem;
      margin: 0.4rem 0 0;
      color: #333;
    }
  }
}
</style>
