import request from "./request";

export const getRecommendPlayList = () => {
  return request({
    url: 'recommend'
  })
}
