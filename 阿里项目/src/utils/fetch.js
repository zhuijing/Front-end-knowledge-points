import axios from 'axios'
import Cookie from 'js-cookie'
import { Notify } from 'vant'
import qs from 'qs'
let CancelToken = axios.CancelToken
let source = CancelToken.source()

const service = axios.create({
  baseURL: '',
  withCredentials: true,
  timeout: 5000
})

service.interceptors.request.use((config) => {
  const ticket = Cookie.get('ticket')
  if (!ticket) {
    if (typeof config.requireToken === 'undefined' || config.requireToken === true) {
      config.cancelToken = source.token // 阻止请求
    }
  }
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(response => {
  return response
}, error => {
  // Notify('服务器异常');
  Promise.reject(error)
})

const fetch = (method, url, data = {}, config) => {
  config = config || {}
  config.method = method
  config.url = url

  method.toLocaleLowerCase() === 'get' ? config['params'] = data : config['data'] = data

  return service(config).then(function (res) {
    var data = res.data
    if (!data.success) {
      return Promise.reject(data)
    }
    return data
  })
}

const get = (url, data, config) => {
  return fetch('get', url, data, config)
}

const post = (url, data, config) => {
  return fetch('post', url, data, config)
}

export { get, post }
