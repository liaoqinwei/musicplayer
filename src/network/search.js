import request from './request'

let getHotSearch = () => {
  return request({
    url: '/hotSearch'
  })
}

let getSearch = (w, p, n) => {
  if (!w) {
    throw new Error('请传入关键字')
  }
  return request({
    url: '/search',
    params: {
      w, p, n
    }
  })
}

export {getHotSearch,getSearch}