<template lang="html">
  <div class="app-loading">
    <!-- <loading v-show="loadingShow"></loading> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <dialog-pwd></dialog-pwd>
  </div>
</template>

<script>
import api from 'api/api'
import { mapState, mapActions } from 'vuex'
import Cookies from 'js-cookie'
import loading from 'components/Dialog/loading'
import dialogPassword from 'components/Dialog/dialogPassword'
import { wxShare, dingdingShare } from 'utils/share'
import { toPc } from 'utils/toPc'

// const ACTIVITYNO = 3581950
const ACTIVITYNO = window.location.pathname.split('/').slice(-1)[0]
Cookies.set('activity_no', ACTIVITYNO)

export default {
  components: {
    loading: loading,
    'dialog-pwd': dialogPassword
  },
  data() {
    return {
      loadingShow: true,
      startImg: ''
    }
  },
  created() {
    this.updateDetail({ activityNo: ACTIVITYNO })
  },
  computed: {
    ...mapState(['activityDetails'])
  },
  watch: {
    activityDetails: {
      handler(n, o) {
        this.changeTheme(n.color)
        let hasPwd = n.serial_code
          ? JSON.parse(n.serial_code)
          : { type: 0, value: '' }
        let pwd = Cookies.get('pwd')
        if (hasPwd.type === 0 || (hasPwd.type == 1 && pwd == hasPwd.value)) {
          // let type = n.type // 1子活动 3集合页
          this.startImg = n.back_img_param.url
          if (this.startImg) {
            this.$router.replace('/start')
          } else {
            [101, 102].includes(n.color)
              ? this.$router.replace('/listpp')
              : this.$router.replace('/list')
          }
        }
        // 更改title
        if ((n.is_sell & 8) > 0) {
          document.title = n.name
        }
        if ((n.is_sell & 1024) > 0) {
          document.title = n.definition_title
        }
        if ((n.is_sell & 8) > 0) {
          document.title = n.name
        }
        if ((n.is_sell & 1024) === 0 && (n.is_sell & 8) === 0) {
          document.title = 'photoplus图片直播'
        }
        // 初始化微信分享、钉钉分享
        let wxParams = {
          title: n.wx_title,
          desc: n.wx_desc,
          imgUrl: n.wx_img,
          link: ''
        }
        let dingdingParams = {
          content: n.wx_desc,
          title: n.wx_title,
          image: n.wx_img
        }
        wxShare(wxParams)
        dingdingShare(dingdingParams)

        this.loadingShow = false
        // ~~~~~~~~~~~~~~~~~~~~
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['updateDetail']),

    changeTheme(theme) {
      let color = ''
      switch (theme) {
        case 112:
          color = 'white'
          break
        case 101:
          color = 'black--pp'
          break
        case 102:
          color = 'white--pp'
          break
        default:
          color = 'black'
      }
      window.document.documentElement.setAttribute('data-theme', color)
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/index.scss';
</style>
