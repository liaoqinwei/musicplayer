<template>
  <section class="song-detail-recommend" v-if="Object.keys(recommend).length!==0">
    <h2 class="title">推荐音乐视频</h2>
    <ul class="recommend-list">
      <li class="recommend-item" v-for="item in recommend">
        <div class="video-img-box">
          <div class="mark">
            <i class="iconfont icon-bofang my-bofang"></i>
          </div>
          <img :src="item.picurl" class="video-img">
        </div>
        <div class="song-name">{{item.title}}</div>
        <div class="singer-name">{{singerName(item.singers)}}</div>
      </li>
    </ul>
  </section>
</template>

<script>
  import singerAanPath from "mixins/singerAanPath";

  export default {
    name: "SongDetailRecommend",
    props: {
      recommend: {
        type: Array,
        default() {
          return []
        }
      }
    },
    mixins: [singerAanPath]
  }
</script>

<style scoped>
  .title {
    margin: .2rem 0;
    font-weight: normal;
    text-align: center;
    font-size: .15rem;
  }

  .recommend-item {
    padding: 0 .13rem .15rem;
  }

  .mark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    height: .38rem;
    width: .38rem;
    border-radius: .38rem;
    border: 1.5px solid #fff;
  }

  .video-img-box {
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    width: 100%;
    border-radius: .1rem;
  }

  .video-img {
    width: 100%;
    vertical-align: bottom;
  }

  .song-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: .12rem;
    font-weight: normal;
    line-height: .25rem;
  }

  .singer-name {
    font-size: .1rem;
  }

  .my-bofang {
    position: relative;
    line-height: .38rem;
    color: #fff;
    font-size: .3rem;
  }
</style>