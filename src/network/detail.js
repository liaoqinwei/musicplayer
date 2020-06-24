import request from "./request";

let getReSongListDetail = (id) => {
  return request({url: `/songList?id=${id}`})
}


export {getReSongListDetail}