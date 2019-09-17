import Vue from 'vue';
import Vuex from 'vuex';
import api from 'api/api'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    language: 'zh', // 中英文
    activityNo: '', // 活动号
    activityDetails: {}, // 活动详情
    photos: [], // 在显示区域的图片数组
    bigPhotoObj: {
      index: 0,
      show: false
    },
    shareLoadingShow: false,
    guestObj: {}, // 嘉宾弹层内容
    functions: { // 各个功能的状态
      hasMusic: false, // 是否有音乐
      isMusicOpen: true, // 音乐开关
    },
    inviteShow: false,
    popularizeShow: {
      market: false,
      pic: false,
    },
    inforPhotos:{
      show:false,
      picList:[]
    },
    videoPause: true
  },
  mutations: {
    UPDATE_ACTIVITYNO(state, no) {
      state.activityNo = no;
    },
    UPDATE_DETAIL(state, obj) {
      state.activityDetails = obj
    },
    UPDATE_LANGUAGE(state, lan) {
      state.language = lan;
    },
    UPDATE_PHOTOS(state, arr) {
      state.photos = arr;
    },
    UPDATE_BIGPHOTOOBJ(state, obj) {
      state.bigPhotoObj = obj;
      state.videoPause = true
    },
    UPDATE_SHARELOADING(state, bol) {
      state.shareLoadingShow = bol;
    },
    UPDATE_GUEST(state, obj) {
      state.guestObj = obj
      state.videoPause = true
    },
    UPDATE_FUNCTIONS(state, obj) {
      state.functions = obj;
      state.videoPause = true
    },
    UPDATE_INVITE(state, bol) {
      state.inviteShow = bol
      state.videoPause = true
    },
    UPDATE_POPULARIZE(state, obj) {
      state.popularizeShow = obj
      state.videoPause = true
    },
    UPDATE_INFORPHOTO(state,obj){
      state.inforPhotos = obj
    },
    UPDATE_VIDEOPAUSE(state, bol) {
      state.videoPause = bol
    }
  },
  actions: {
    updateDetail(context, params) {
      api.getDetails(params).then((res) => {
        const result = res.result;
        context.commit('UPDATE_DETAIL', result);
      })
    },
  },
});
