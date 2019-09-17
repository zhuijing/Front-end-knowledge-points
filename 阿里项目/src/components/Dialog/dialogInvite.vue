<template lang="html">
  <!-- <van-popup class="dialog-invite" v-model="visible" @close="close"> -->
  <div class="dialog-invite" v-show="visible">
    <span class="close col-all-center" @click="close"><i class="iconfont iconchahao-quanping"></i></span>
    <img class="invite-img" :src="inviteImg" alt="" v-if="inviteImg">
    <div class="invite-wrapper col-start-center" ref="invite" v-else>
      <div class="part">
        <img class="head" v-if="headImg" :src="headImg" alt="">
        <div class="detail">
          <p class="name">{{ activityDetails.name }}</p>
          <p v-if="dataShow" class="view"><span>{{ activityDetails.view_count }}</span> 人正在收看</p>
        </div>
      </div>
      <div class="part">
        <div :class="['info', avator ? 'row-between-center' : 'col-start-center reverse']">
          <div class="info-half">
            <div class="row-start-center">
              <img v-if="avator" class="avator" :src="avator" alt="">
              <div class="title flex-auto">
                <p v-if="avator" class="nickname">{{ wxName }}</p>
                <p v-if="avator" class="nickname">邀请您一起收看直播</p>
              </div>
            </div>
            <p :class="['tip', avator ? '' : 'mt']">长按识别二维码立即进入观看</p>
          </div>
          <div class="info-ewm" id="invitea"></div>
        </div>
      </div>
    </div>
    <loading v-show="!inviteImg"></loading>
  <!-- </van-popup> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Cookies from 'js-cookie'
import { replaceReturn } from 'utils/tool'
import { QRCode } from 'utils/qrcode'
import loading from 'components/Dialog/loading'
import html2canvas from 'html2canvas'

export default {
  components: {
    'loading': loading
  },
  data() {
    return {
      visible: false,
      inviteImg: '',
    }
  },
  mounted() {

  },
  computed: {
    ...mapState(['activityDetails', 'inviteShow']),
    description() {
      return replaceReturn(this.guestObj.description)
    },
    headImg() {
      let headObj = this.activityDetails.head_img;
      return headObj.headImgs ? headObj.headImgs[0] : false;
    },
    avator() {
      return Cookies.get('user_head')
    },
    wxName() {
      return Cookies.get('user_name')
    },
    dataShow() {
      // -1：人数不展示
      return this.activityDetails.data_show !== -1
    },
  },
  watch: {
    inviteShow(n) {
      this.visible = n;
      if (!this.inviteImg) {
        this.$nextTick(() => {
          let qr = new QRCode('qrcode', {
            text: window.location.href.split('#')[0],
            width: 100,
            height: 100,
            colorDark: '#333333',
          })
          let a = qr._el.childNodes[1]
          let b = document.getElementById('invitea');
          b.appendChild(a)
          let qrcode = document.getElementById('qrcode')
  				qrcode.innerHTML = ''
          this.createImg()
        })

      }
    },
  },
  methods: {
    ...mapMutations(['UPDATE_INVITE']),
    createImg() {
      const _this = this
      setTimeout(() => {
        let _canvas = _this.$refs.invite;
        // 解决不清晰问题
        // const scale = 2;
        // const width = _canvas.offsetWidth;
        // const height = _canvas.offsetHeight;
        // const canvas2 = document.createElement('canvas');
        //
        // canvas2.width = width * scale;
        // canvas2.height = height * scale;
        //
        // const context1 = canvas2.getContext('2d')
        // if(context1) {
        //   context1.scale(scale, scale);
        // }
        const opts = {
          // scale,
          // canvas: canvas2,
          // // logging: true, //日志开关
          // width,
          // height,
          y: window.scrollY,
          backgroundColor: 'transparent',
          useCORS: true, // 允许跨域
          // allowTaint: true
        };
        html2canvas(_canvas, opts).then((canvas) => {
          // const context = canvas2.getContext('2d');
          // if(context) {
          //   context.scale(2,2);
          //   context.mozImageSmoothingEnabled = false;
          //   context.webkitImageSmoothingEnabled = false;
          //   context.imageSmoothingEnabled = false;
          // }
          // canvas转换成url，base64
          _this.inviteImg = canvas.toDataURL()
        });
      }, 400)

    },
    close() {
      this.UPDATE_INVITE(false)
    },
  }
}
</script>

<style lang="scss">
@import "assets/scss/index.scss";
.dialog-invite {
  width: 100%;
  height: 100%;
  position: fixed;
  transform: none;
  background: rgba(#000, .8);
  z-index: 200000;
  left: 0 !important;
  top: 0 !important;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  @include title-color();
  .invite-img {
    display: block;
    width: 6.7rem;
    margin: 1.06rem auto;
  }
  .invite-wrapper {
    width: 6.7rem;
    border-radius: .24rem;
    @include background-card-color();
    text-align: left;
    overflow: hidden;
    .part {
      width: 100%;
      // padding: 0 0 .3rem;
      font-size: 0;
      .detail {
        width: 6.1rem;
        margin: 0 auto;
        padding: 0 0 .3rem;
        border-width: 0 0 .02rem 0;
        border-style: solid;
        @include title-border-color();
      }
      .info {
        width: 100%;
        padding: .38rem .3rem .38rem;
        // border: .02rem solid #999999;
        &.reverse {
          flex-direction: column-reverse;
        }
      }
      .info-ewm {
        width: 1.44rem;
        height: 1.44rem;
        background-color: #fff;
        padding: .04rem;
        img {
          width: 100%;
        }
      }
      .info-half {
        width: 4.06rem;
      }
      .name {
        font-size: .36rem;
        font-weight: 500;
        margin: .24rem 0 0;
      }
      .view {
        font-size: .24rem;
        font-weight: 400;
        margin: .08rem 0 0;
        span {
          @include text-auxiliary-color();
        }
      }
      .title {
        font-size: .24rem;
        margin: 0 .1rem 0 0;
      }
      .tip {
        @include title-background-opacity-color();
        @include background-font-color();
        font-size: .24rem;
        margin: .12rem 0 0;
        text-align: center;
        &.mt {
          margin: .24rem 0 0;
        }
      }
      .head {
        width: 100%;
      }
      .nickname {
        margin: .04rem 0;
        &:nth-child(1) {
          font-weight: 500;
        }
      }
      .avator {
        width: .84rem;
        height: .84rem;
        border-radius: .08rem;
        margin: 0 .2rem 0 0;
      }
    }
  }
  .close {
    width: .56rem;
    height: .56rem;
    // border-radius: 50%;
    // background-color: rgba(0, 0, 0, .6);
    position: absolute;
    right: .3rem;
    top: .3rem;
    z-index: 110000;
    .iconfont {
      color: #fff;
      font-size: .32rem;
    }
  }
}

</style>
