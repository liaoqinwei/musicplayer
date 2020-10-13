let axios = require('axios')

let instance = axios.create()
instance.defaults.baseURL = 'http://lqwlsr.cn/api/music'
instance.interceptors.request.use(res => {
  console.log('发送了请求')
  return res
}, err => {
  console.log(err)
})
instance.interceptors.response.use(res => {
  return res.data;
}, error => {
  console.log(error)
})


export default function (config = {}) {
  if (Object.keys(config).length === 0) {
    throw new SyntaxError("URL parameters must be passed")
  }
  return instance(config)
}
