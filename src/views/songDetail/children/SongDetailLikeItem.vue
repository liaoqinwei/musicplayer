<template>
  <li class="lick-item" @click="lickSongClick">
    <div class="head-box">
      <img :src="getRealPath(150,descData.album.pmid)" class="head">
    </div>
    <div class="song-desc">
      <p class="song-name">{{descData.title}}</p>
      <p class="singer">{{singerName(descData.singer)}}</p>
    </div>
    <i class="iconfont icon-jiantou my-jiantou"></i>
  </li>
</template>

<script>
  import singerAanPath from "mixins/singerAanPath";

  export default {
    name: "SongDetailLikeItem",
    mixins: [singerAanPath],
    props: {
      descData: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      lickSongClick() {
        this.$router.replace('/songdetail/' + this.descData.id)
      }
    },
    watch: {
      '$route'(to, from) {
        this.$bus.$emit('updateData', this.descData.id)
      }
    }
  }
</script>

<style scoped>
  .lick-item {
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
    flex: 1;
    margin: 0 .1rem;
  }

  .my-jiantou {
    display: block;
    font-size: .11rem;
    margin-right: .1rem;
  }

  .song-name, singer {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: .12rem;
    font-weight: normal;
  }

  .singer {
    font-weight: lighter;
    font-size: .09rem;
    color: #888;
    line-height: .16rem;
  }
</style>