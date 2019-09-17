import { get, post } from 'utils/fetch'
// 活动详情
export const getDetails = (params) => get('/live/detail', params)
// 直播图
export const getLivePics = (params) => get('/pic/pics', params)
// 相册
export const getAlbums = (params) => get('/album/albums', params)
export const getAlbumPics = (params) => get('/album/one', params)
// 视频
export const getMedias = (params) => get('/video/list', params)
export const getAlbumMedias = (params) => get('/album/videos', params)
// 时间线
export const getTimelinePics = (params) => get('/pic/timeline', params)
// 热门
export const getHotPics = (params) => get('/pic/pics/like', params)
// 图文
export const getTimenotePics = (params) => get('/pic/timenote', params)
// 评论
export const getDiscuss = (params) => get('/comment/list', params)
export const addDiscuss = (params) => get('/comment/add', params)
export const likeDiscuss = (params) => get('/comment/like/add', params)
export const getThirdPic = (params) => get('/fetchPic', params)
// 嘉宾 品牌 列表
export const getGuestBrand = (params) => get('/live/guest/list', params)

// 点击量统计
export const clickRecord = (params) => get('/access/picClick', params)
// 点击统计
export const visitRecord = (params) => get('/access/click', params)
// 分享统计
export const shareRecord = (params) => get('/access/shareClick', params)
// cc video 删掉没有了
export const ccLive = (params) => get('/live/bokecc', params)

// 点赞
export const iLike = (params) => get('/pic/add/like', params)
// 移除引导
export const removeGuide = (params) => get('/home/guide/remove', params)
// 上传完照片添加到库
export const uploadImg = (params) => get('/home/pic/add', params)

// 获取特定的照片
export const getToken = (params) => get('/base/getUploadToken', params)
export const getUrl = (params) => post('/base/getUrl', params)
export const getShowPicUrl = (params) => post('/getimgfromwx', params)

// 验证码
export const getVerifyCode = (params) => post('/home/code/send', params)
// 订单
export const addOrder = (params) => post('/live/order/add', params)

// 我看过的活动
export const myActivityList = (params) => get('/home/activity/view', params)
// 我xx的照片 type: 1购买 2打赏 3点赞 4有自己的图片
export const myPhotos = (params) => get('/home/pic', params)
// 红包雨 时间点
export const redrainStatus = (params) => get('/redpackrain/recent', params)
// 红包状态
export const redStatus = (params) => get('/redpackrain/icon', params)
//开红包
export const openBag = (params) => get('/redpackrain/open', params)
//榜单
export const redResult = (params) => get('/redpackrain/recvlist', params)

// 集合页 // 集合页 // 集合页 // 集合页
// 热门图片
export const listHot = (params) => get('/pic/listing/pics/like', params)
export const listHotInfo = (params) => get('/pic/like/info', params)


//微信config
export const wxConfig = (params) => get('/share/signature', params)

//十秒小视频
export const tenVideoConfig = (params) => get('/pic/pic2video', params)
export const tenVideoResult = (params) => get('https://s.plusx.cn/test/video_back.jpg', params)
export const tenVideoCode = (params) => get('/video/video2code', params)

// 找自己 添加图片
export const picAdd = (params) => get('/home/pic/add', params)

//微信支付参数
export const payconfig = (params) => get('/pay/pay', params)
//解锁付费图片
export const seePayPic = (params) => get('/pic/one', params)

//红包弹幕
export const barrage = (params) => get('/redpackrain/barrage', params)

export default {
  getDetails,
  getLivePics,
  getAlbums,
  getAlbumPics,
  getMedias,
  getAlbumMedias,
  getTimelinePics,
  getHotPics,
  getTimenotePics,
  getDiscuss,
  addDiscuss,
  likeDiscuss,
  getGuestBrand,
  clickRecord,
  visitRecord,
  shareRecord,
  ccLive,
  iLike,
  removeGuide,
  uploadImg,
  getToken,
  getUrl,
  getVerifyCode,
  addOrder,
  myActivityList,
  myPhotos,
  redrainStatus,
  wxConfig,
  picAdd,
  getShowPicUrl,
  redStatus,
  getThirdPic,
  tenVideoConfig,
  tenVideoResult,
  tenVideoCode,
  openBag,
  redResult,
  listHotInfo,
  listHot,
  payconfig,
  seePayPic,
  barrage
}