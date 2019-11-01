const ENVIRONMENT = 'pro';
const config = {
  base:{
    APPID: 'wxe59f3773f50285d5',
    // 高德地图KEY 
    AMAPKEY: '6fc3a4905a820a73437c757db0bb08d2',
    // API版本号  
    VERSION: 'V2',
    //小程序版本
    APP_VERSION: 'v1.2.0',
    // 应用名称
    APP_NAME: 'wxymd',
    // 图片存放地址                                     
    IMG_URL: 'https://img.zgsta.com/wolong/alymd/images',
  },
  pro:{
      ENVIRONMENT_OTHER_PROJECT: 'prod',
      // 请求地址
      API_DOMAIN: 'https://wolong.zhuge.com',
      // 神测地址
      API_SC: 'https://sc.zhugefang.com/sa?project=zhugefang',
      // API埋点
      API_MD: 'https://wxcfj.zhuge.com',
      // IM appKey
      APPKEY_IM: '6tnym1brn8sx7',
      // IM 请求地址
      URL_IM: 'https://api.zhugefang.com',
      // 地址拼装                                         
      BASE_URL: `https://wolong.zhuge.com/CloudStore/${config.base.VERSION}`
  },
  dev:{
      ENVIRONMENT_OTHER_PROJECT: 'develop',
      // 请求地址
      API_DOMAIN: 'http://qa-rocket.zhuge.com',
      // 神测地址
      API_SC: 'https://sc.zhugefang.com/sa?token=FFNJ24C31&project=zgtest',
      // API埋点
      API_MD: 'https://cfj.zhuge.com',
      // IM appKey
      APPKEY_IM: 'c9kqb3rdk7h0j',
      // IM 请求地址
      URL_IM: 'https://api.zhugefang.test',
      // 地址拼装                                         
      BASE_URL: `http://qa-rocket.zhuge.com/CloudStore/${config.base.VERSION}`
  }
}


module.exports = Object.assign(config[base], config[ENVIRONMENT])



