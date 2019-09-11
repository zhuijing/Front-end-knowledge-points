$(window).load(function() {

  $('#download').on('click',function(){
      downApp();
  });
  function downApp(){
      function tryOpenApp(openScheme, downUrl) {
          if (/android|Android/i.test(navigator.userAgent)) {
              var timeout, t = 1000,
                  hasApp = true;
              setTimeout(function() {
                  if (hasApp) {
                      window.location.href = openScheme;
                  } else {
                      window.location.href = downUrl;
                  }
              }, 2000);

              function testApp() {
                  var now = Date.now();
                  var ifr = $('<iframe id="ifrScheme" style="display:none;"></iframe>')
                  ifr.attr('src', openScheme);
                  $('body').append(ifr);
                  timeout = setTimeout(function() {
                      tryOpen(now);
                  }, t);
              }

              function tryOpen(t1) {
                  var t2 = Date.now();
                  if (!t1 || t2 - t1 < t + 200) {
                      hasApp = false;
                  }
              }

              testApp();
          } else if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
              // window.location.href = openScheme;
              window.location.href = downUrl;
              // setTimeout(function() {
              //     window.location.href = downUrl;
              // }, 30);
          }
      }
      var ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
         tryOpenApp("zgzf://", "https://itunes.apple.com/cn/app/诸葛找房-专业二手房租房交易信息助手/id1071402253?mt=8");
      } else if(/android|Android/i.test(navigator.userAgent) && !is_weixn()){
              tryOpenApp("zgzf://", "https://file.zhugefang.com/Download/App/Android/c_reinforce_zhuge.apk");
      } else {
          $('.mask_Layer').show();
      }
  }
  $('.mask_Layer').on('click',function(){
      $('.mask_Layer').hide();
  });
  // 浏览页面统计数据
  var url=window.location.search.slice(1);
  function getParam(url){
      if(!url)return false;
      var params=url.split("&"),arr,param={};
      $.each(params,function(i,obj){
          arr=obj.split("=")
          param[arr[0]]=decodeURI(arr[1]);

      })
      return param;
  }
  var urlSearch=getParam(url);
  var appPageForm = urlSearch.appPageForm ? urlSearch.appPageForm : '';
  var houseId = urlSearch.houseId ? urlSearch.houseId : '';
  var city = urlSearch.city ? urlSearch.city : '';
  var token = urlSearch.token ? urlSearch.token : '';
  if(!token){
      token = 'uYyeFh6Zdpct3Qv7qAyQb1aMPdf2P9XHvaew2bz6A6JG64bWfwPllLm6JyeDBn_7GXv92YMqSFHsaVefKkQM8A%3D%3D';
  }
  if(appPageForm){
      $.ajax({
          url: '//api.zhugefang.com/API/BrokerShop/H5download',
          type: 'post',
          data: {
              "token": token,
              "platformType": "6",
              "city":city,
              "house_id": houseId,
              "pageFrom":appPageForm,
              "appName": "zgzf"
          },
          success: function(xhr) {
          }
      });
      $('#download').on('click',function(){
          $.ajax({
              url: '//api.zhugefang.com/API/BrokerShop/H5AppButton',
              type: 'post',
              data: {
                  "token": token,
                  "platformType": "6",
                  "city":city,
                  "house_id": houseId,
                  "appName": "zgzf"
              },
              success: function(xhr) {
              }
          });
      });
  }
  is_weixn();
  // 是否是微信分享
  function is_weixn(){
      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") {
          $('.mask_Layer').show();
      } else {
          $('.mask_Layer').hide();
      }
  }

});


//打开地址并下载


var uainfo = navigator.userAgent;

function isWeixin_module() {
  var uainfo = window.navigator.userAgent.toLowerCase();
  if (uainfo.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

function download_link(androidLink, iosLink) {
  this.andLink = androidLink;
  this.iosLink = iosLink;
  this.myBrowser = function () {
    if (uainfo.indexOf('Android') > -1 || uainfo.indexOf('Linux') > -1) { //安卓手机
      if (isWeixin_module()) { //微信
        $(".a_pop").show();
      } else {
        var down_lin1 = this.andLink;
        window.location.href = down_lin1;
      }

    } else if (!!uainfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) { //苹果手机
      //                if (isWeixin_module()) {
      //                    $(".i_pop").show();
      //                }else{
      //                    var down_lin2 = this.iosLink;
      //                    window.location.href = down_lin2;
      //                }
      var down_lin2 = this.iosLink;
      window.location.href = down_lin2;

    } else {
      alert("请用移动设备打开！");
    }
  };
}

function i_download_link(download_url) {
  if (!!uainfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) { //苹果手机
    //            if (isWeixin_module()) {
    //                $(".i_pop").show();
    //            }else{
    //                window.location.href = download_url;
    //            }
    window.location.href = download_url;

  } else {
    alert("敬请期待！");
  }
}

function a_download_link(download_url) {
  if (uainfo.indexOf('Android') > -1 || uainfo.indexOf('Linux') > -1) { //安卓手机
    if (isWeixin_module()) { //微信
      $(".a_pop").show();
    } else {
      window.location.href = download_url;
    }

  } else {
    alert("敬请期待！");
  }
}

function getUrlParams() {
  var result = {};
  var params = (window.location.search.split('?')[1] || '').split('&');
  for (var param in params) {
    if (params.hasOwnProperty(param)) {
      paramParts = params[param].split('=');
      result[paramParts[0]] = decodeURIComponent(paramParts[1] || "");
    }
  }
  return result;
}
var params = getUrlParams();
var androidDownloadUrl = decodeURIComponent(params['android_url']);
var iosDownloadUrl = decodeURIComponent(params['ios_url']);
if (androidDownloadUrl && iosDownloadUrl) {
  var obj = new download_link(androidDownloadUrl, iosDownloadUrl);
  obj.myBrowser();
} else if ((androidDownloadUrl != undefined) && (iosDownloadUrl == undefined)) {
  a_download_link(androidDownloadUrl);
} else if ((androidDownloadUrl == undefined) && (iosDownloadUrl != undefined)) {
  i_download_link(iosDownloadUrl);
} else {
  alert("敬请期待！");
}