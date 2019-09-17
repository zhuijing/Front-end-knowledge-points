import Vue from 'vue';

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
// vant ui 按需引入
import { Dialog, Notify, Field, Loading, PullRefresh, List, Toast, Popup} from 'vant';
import enUS from 'vant/lib/locale/lang/en-US';
import wx from 'jweixin-wechat'
import VueI18n from 'vue-i18n'

import App from './App.vue';
import router from 'router';
import store from 'store';
import zh from 'utils/zh';
import en from 'utils/en';

Vue.use(VueAwesomeSwiper);
// vant ui 按需引入
Vue.use(Dialog);
Vue.use(Notify);
Vue.use(Field);
Vue.use(Loading);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Toast);
Vue.use(Popup);
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'zh': zh,
    'en': en
  }
});
window.i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'zh': zh,
    'en': en
  }
});

Vue.prototype.$autoPlay = (src) => {
  App.methods.autoPlay(src)
}

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  next() // 确保一定要调用 next()
  // 判断#号之前是否有问号
  let hrefArry = location.href.split('#')
  let hasMak = hrefArry[0].split('/')
  let Mark = hasMak[hasMak.length - 1]

  if (Mark == '' || Mark.search(/\?/) === -1) {
    Mark = '?accessFrom=live#'
    // console.log(Mark)
    location.href = location.href.replace('#', Mark)
  }
})
router.afterEach(() => {

})
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
