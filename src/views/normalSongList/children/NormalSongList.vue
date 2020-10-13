<template>
  <div class="normal-song-list" v-if="songList!==undefined">
    <div class="desc">
      <div class="song-count">{{computedText}}<span class="count">{{count}}</span>首</div>
      <div class="collect-box">
        <span>收藏</span>
        <i class="iconfont icon-aixin my-aixin"></i>
      </div>
    </div>
    <ul class="wrapper">
      <li v-for="(item,index) in songList.slice(0,limit)" class="song-item" @click="songClick(parseData(item).songid)">
        <span class="number" :class="{hot:index<3}" v-if="computedPath">{{index+1}}</span>
        <div class="song-desc">
          <h2 class="song-name">{{parseData(item).songname}}</h2>
          <p class="singer-name-box">
            <span v-for="singer in parseData(item).singer">
              <img src="~assets/img/icon_vip.png" class="vip" v-if="computedPayPlay(item)">
              {{singer.name}} · {{parseData(item).albumname}}
            </span>
          </p>
        </div>
        <i class="iconfont icon-xingzhuang my-xiazai"></i>
      </li>
    </ul>
    <!-- 加载更多 -->
    <p class="load-more" @click="loadMore" v-if="limit <= songList.length">点击加载更多歌曲</p>
    <div class="introduction-box">
      <h2>歌单简介</h2>
      <p v-html="desc"></p>
    </div>

  </div>
</template>

<script>
  export default {
    name: "NormalSongList",
    data() {
      return {
        limit: 31,
      }
    },
    props: ['songList', 'count', 'desc'],
    methods: {
      loadMore() {
        this.limit += 10
      },
      songClick(id) {
        this.$router.push('/player/songdetail/' + id)
      },
      parseData(data) {
        let path = this.$router.history.current.path;
        if (path.indexOf('raking') === -1) {
          // 普通
          return data
        } else {
          return data.data
        }
      },
      computedPayPlay(item) {
        return item.pay ? item.pay.payplay === 1 : item.data.pay.payplay === 1;
      }
    },
    computed: {
      computedText() {
        let path = this.$router.history.current.path;
        if (path.indexOf('raking') === -1) {
          return '歌单 共'
        } else {
          return '排行榜 共'
        }
      },
      computedPath() {
        let path = this.$router.history.current.path;
        if (path.indexOf('raking') === -1) {
          return false
        } else {
          return true
        }
      },

    }
  }
</script>

<style scoped>
  .normal-song-list {
    padding: 0 .12rem;
  }

  .number {
    font-size: .1rem;
    margin-right: 6px;
  }

  .number.hot {
    font-size: .12rem;
    color: red;
  }

  .collect-box {
    display: flex;
    align-items: center;
  }

  .my-aixin {
    font-size: .2rem;
  }

  .desc {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .12rem;
    font-size: .1rem;
    color: rgba(0, 0, 0, .5);
  }

  .song-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    padding: .1rem 0;
  }

  .song-desc {
    width: 92%;
  }

  .song-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: .12rem;
    font-weight: normal;
  }

  .singer-name-box {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: .16rem;
    font-size: .105rem;
    color: rgba(0, 0, 0, .4);
  }

  .my-xiazai {
    display: block;
    font-size: .12rem;
    color: rgba(0, 0, 0, .4);
  }

  .load-more {
    padding: .05rem 0;
    text-align: center;
    font-size: .12rem;
    color: rgba(0, 0, 0, .7);
  }

  .introduction-box {
    margin-top: .1rem;

  }

  .introduction-box > h2 {
    margin-top: .05rem;
    font-weight: normal;
    font-size: .14rem;
  }

  .introduction-box > p {
    padding: 15px 0 25px 0;
    font-size: .11rem;
  }

  .vip {
    position: relative;
    bottom: .02rem;
    height: .11rem;
    vertical-align: bottom;
  }
</style>