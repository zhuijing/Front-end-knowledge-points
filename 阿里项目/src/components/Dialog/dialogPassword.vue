<template>
  <div class="password-container" v-if="showNumber">
    <!-- 人脸解锁 -->
    <!-- <div class="content col-start-center" v-show="showFace">
      <h3 class="flex-none" v-if="serialCode.type === 3">请上传单人<br>正面照片，快速解锁直播相册</h3>
      <h3 class="flex-none" v-if="serialCode.type === 2">请上传单人正面照片<br>解锁相册找到镜头下的自己 </h3>
      <div class="case col-all-center flex-none">
        <img src="../../assets/image/lock-face.png" alt="">
      </div>
      <p class="tip1">温馨提示：拍摄正面大头照片最佳，非正面角度和人物偏小会影响匹配精确度。照片大小不超过4M。</p>
      <div class="button row-all-center flex-none">
        拍照解锁相册
        <findme-btn @uploadFinish="uploadFinish(...arguments)" @uploadFail="uploadFail(...arguments)" @uploadStart="uploadStart"></findme-btn>
      </div>
      <p class="tip2">*上传的照片仅用作本次匹配使用，并保证其内容的隐私安全</p>
    </div> -->

    <div class="content col-all-center" v-show="showNumber">
      <h3>请输入密码</h3>
      <div class="input-box row-start-center">
        <i class="iconfont iconmima flex-none"></i>
        <input class="flex-auto" type="password" id="password" v-model="passwordTxt" placeholder="请输入密码">
      </div>
      <div class="button row-all-center" @click="checkPassword">进入</div>
    </div>
    <loading v-show="loadingShow"></loading>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import api from 'api/api'
import loading from 'components/Dialog/loading'
import Md5 from 'js-md5'
import Cookies from 'js-cookie'
let ACTIVITYNO = Cookies.get('activity_no')
export default {
  components: {
    'loading': loading
  },
  data() {
    return {
      loadingShow: false,
      // showFace: false,
      showNumber: false,
      passwordTxt: ''
    }
  },
  computed: {
    ...mapState(['activityDetails'])
  },
  watch: {
    $route(to, from) {},
    activityDetails: {
      handler(n, o) {
        let isRootPath = this.$route.path === '/' ? true : false
        let hasPwd = n.serial_code ? JSON.parse(n.serial_code) : {type: 0, value: ''}
        let pwd = Cookies.get('pwd')
        if (isRootPath) {
          // hasPwd.type == 2 ? (this.showFace = true) : (this.showNumber = false)
          hasPwd.type == 1 && pwd != hasPwd.value ? (this.showNumber = true) : (this.showNumber = false)
        }
      },
      deep: true
    }
  },
  created() {},
  methods: {
    ...mapMutations(['UPDATE_IMMERSION']),
    checkPassword() {
      let n = this.activityDetails
      let password = n.serial_code ? JSON.parse(n.serial_code) : {type: 0, value: ''}
      // let type = n.type // 1子活动 3集合页
      if (password.value != Md5(this.passwordTxt)) {
        this.$notify('密码错误!')
      } else {
        this.startImg = n.back_img_param.url
        Cookies.set('pwd', Md5(this.passwordTxt))
        this.loadingShow = false

        this.showNumber = false
        if (this.startImg) {
          this.$router.push('/start')
        } else {
          [101, 102].includes(n.color)
            ? this.$router.push('/listpp')
            : this.$router.push('/list')
        }

      }
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';
.password-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  z-index: 999;
  .content {
    height: 100vh;
    padding: .8rem 0 .4rem;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  h3 {
    font-size: .4rem;
    font-weight: 500;
    color: #000;
  }
  .case {
    width: 6rem;
    height: 6rem;
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
    border-radius: .2rem;
    margin: .4rem 0 0;
    img {
      width: 4.7rem;
    }
  }
  .button {
    width: 5.6rem;
    height: .88rem;
    @include text-active-background-color();
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
    border-radius: .44rem;
    font-size: .32rem;
    color: #111;
    margin: .4rem 0;
  }
  .tip1 {
    width: 6.4rem;
    font-size: .28rem;
    color: #666;
    margin: .4rem 0 0;
  }
  .tip2 {
    width: 6.4rem;
    font-size: .24rem;
    color: #666;
  }
  .input-box {
    width: 5.6rem;
    height: 0.9rem;
    border: 0.02rem solid #666;
    background: #f6f8fa;
    padding: 0 0.4rem;
    margin: .5rem 0 0;
    border-radius: .44rem;
    .iconfont {
      width: 0.44rem;
      height: 0.44rem;
      background-size: 100% 100%;
      margin: 0 0.22rem 0 0;
      font-size: 0.36rem;
    }
    input {
      height: 100%;
      font-size: 0.3rem;
      font-weight: 700;
      background: none;
    }
  }
}
</style>
