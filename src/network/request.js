let axios = require('axios')

let instance = axios.create()
instance.defaults.baseURL = 'http://127.0.0.1:9090'
instance.interceptors.request.use(res => {
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
