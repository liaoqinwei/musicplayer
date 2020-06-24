import request from "./request";

let getRakingList = () => {
  return request({url: '/tolist'})
}
let getRakingDetail = (id) => {
  return request({
    url: '/rakingDetail',
    params: {
      id
    }
  })
}

export {getRakingList,getRakingDetail}