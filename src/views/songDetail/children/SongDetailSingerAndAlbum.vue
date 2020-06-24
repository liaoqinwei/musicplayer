<template>
  <section class="singer-and-album" v-if="Object.keys(singerData).length!==0 || Object.keys(albumData).length!==0">
    <h2 class="title">歌手与专辑</h2>
    <ul class="list">
      <!-- 歌手 -->
      <li v-for="item in singerData" class="singer-item">
        <div class="head-box">
          <img :src="getRealPath(150, item.mid, 1)" :onerror="loadImgErr" class="head">
        </div>
        <div class="song-desc">
          <p class="singer">歌手 {{item.name}}</p>
        </div>
        <i class="iconfont icon-jiantou my-jiantou"></i>
      </li>

      <!-- 专辑 -->
      <li class="singer-item">
        <div class="head-box">
          <img :src="getRealPath(300, albumData.mid)" class="head">
        </div>
        <div class="song-desc">
          <p class="singer">专辑 {{albumData.name}}</p>
        </div>
        <i class="iconfont icon-jiantou my-jiantou"></i>
      </li>
    </ul>
  </section>
</template>

<script>
  import SongDetailLikeItem from "./SongDetailLikeItem";

  import singerAanPath from "mixins/singerAanPath";

  export default {
    name: "SongDetailSingerAndAlbum",
    mixins: [singerAanPath],
    data() {
      return {
        loadImgErr: `this.src='https://y.gtimg.cn/mediastyle/global/img/person_120.png?max_age=2592000'`,
      }
    },
    props: {
      singerData: {
        type: Array,
        default() {
          return []
        }
      },
      albumData: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    components: {
      SongDetailLikeItem
    },
  }
</script>

<style scoped>
  .title {
    margin: .2rem 0;
    font-weight: normal;
    text-align: center;
    font-size: .15rem;
  }

  .singer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 0 .08rem .13rem;
  }

  .head-box {
    overflow: hidden;
    height: 55px;
    width: 55px;
    border-radius: .05rem;
  }

  .head {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
  }

  .song-desc {
    overflow: hidden;
    flex: 1;
    margin: 0 .1rem;
  }

  .my-jiantou {
    display: block;
    font-size: .11rem;
    margin-right: .1rem;
  }

  .singer {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: normal;
    font-size: .11rem;
    color: #222;
    line-height: .16rem;
  }
</style>