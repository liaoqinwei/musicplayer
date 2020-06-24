import request from "./request";

/* 获取详情 */
let getSongDesc = (id) => {
  return request({
    url: '/songDetail',
    params: {
      id
    }
  })
}
/* 获取评论 */
let getComment = (id, page = 0) => {
  return request({
    url: '/comment',
    params: {
      id,
      page
    }
  })
}

/* 获取歌词 */
let getLyric = (id) => {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}
export {getSongDesc, getComment, getLyric}