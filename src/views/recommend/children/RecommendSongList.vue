<template>
  <div class="song-list">
    <direction-list :title="title">
      <li v-for="item in songList" class="list-item" @click="clickToDetail(item.id)">
        <div class="img-box">
          <img :src="item.cover" alt="">
          <p class="counter">
            <i class="iconfont icon-bofang icon-bofang-m"></i>
            {{item.cnt>10000?(item.cnt/(100*100)).toFixed(1):item.cnt}}万
          </p>
        </div>
        <p class="song-list-title">{{item.title}}</p>
      </li>
    </direction-list>
  </div>
</template>

<script>
  import DirectionList from "components/content/directionList/DirectionList";

  export default {
    name: "SongListItem",
    props: {
      songList: {
        type: Array,
        default() {
          return []
        }
      },
      title: {
        type: String,
        default() {
          return '';
        }
      }
    },
    components: {
      DirectionList
    },
    methods: {
      clickToDetail(id) {
        if (this.title === '官方歌单') {
          this.$router.push('/player/officialDetail/' + id)
        } else {
          this.$router.push('/player/detail/'+id)
        }
      }
    }
  }
</script>

<style scoped>
  .list-item .counter {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 1px 5px;
    font-size: 11px;
    background: rgba(26, 26, 26, .5);
    color: #fff;
    border-radius: 999px;
  }

  .list-item .icon-bofang-m {
    font-size: 11px;
  }

  .list-item .song-list-title {
    padding-left: .02rem;
    margin-top: .05rem;
    font-size: .11rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .list-item > .img-box {
    position: relative;
    overflow: hidden;
    width: 94%;
    height: .94rem;
    border-radius: .1rem;
  }

  .list-item {
    flex-shrink: 0;
    width: 1rem;
  }

  .list-item > .img-box > img {
    width: 100%;
    height: 100%;
  }

  .list-item:nth-last-of-type(1) {
    padding-right: .06rem;
  }
</style>