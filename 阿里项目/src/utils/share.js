import wx from 'jweixin-wechat'
import * as dd from 'dingtalk-jsapi';
import api from 'api/api'
import Cookies from 'js-cookie'

export function wxShare(params) {
  /**
   * 解决iosu 兼容问题
   */
  let currentUrl = params.link || window.location.href.split('#')[0];
  return api.wxConfig({
    url: currentUrl,
    shareUrl: currentUrl
  }).then(res => {
    const _config = res.result
    wx.config({
      debug: false,
      appId: _config.app_id,
      timestamp: _config.timestamp,
      nonceStr: _config.noncestr,
      signature: _config.signature,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseImage', 'getLocalImgData']
    })
    const realUrl = _config.share_url;
    params = Object.assign(params, { link: realUrl });
    changeWxShare(params);
  })
}

export function changeWxShare(params) {
  let activityNo = Cookies.get('activity_no');
  wx.ready(function () {
    wx.onMenuShareAppMessage({
      title: params.title, // 分享标题
      desc: params.desc, // 分享描述
      link: params.link, // 分享链接
      imgUrl: params.imgUrl, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '',
      success: function () {
        api.shareRecord({ key: window.location.pathname, params: `activity_no=${activityNo}`, activity_no: activityNo }).then(() => { })
      },
    });

    wx.onMenuShareTimeline({
      title: params.title, // 分享标题
      link: params.link, // 分享链接
      imgUrl: params.imgUrl,
      success: function () {
        api.shareRecord({ key: window.location.pathname, params: `activity_no=${activityNo}`, activity_no: activityNo }).then(() => { })
      },
    });
  })
}

export function dingdingShare(params) {
  if (navigator.userAgent.toLowerCase().indexOf('dingtalk') >= 0) {
    let currentUrl = window.location.href.split('#')[0]
    dd.ready(function () {
      dd.biz.navigation.setRight({
        show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
        control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
        text: '分享',//控制显示文本，空字符串表示显示默认文本
        onSuccess: function (result) {
          dd.biz.util.share({
            type: 0, //分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
            url: currentUrl,
            content: params.content,
            title: params.title,
            image: params.image,
            onSuccess: function () {

            },
          })
        },
      });
    });
  }
}
