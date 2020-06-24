<template>
  <div class="official-song-list" v-if="Object.keys(songData).length!==0">
    <ul class="wrapper">
      <li v-for="item in songData.slice(0,limit)" class="song-item" @click="songClick(item)">
        <h2 class="song-name">{{item.songname}}</h2>
        <p class="song-singer">
          <img src="~assets/img/icon_vip.png" class="vip" v-if="item.pay.payplay===1">
          <span class="singer-name">
            {{parseSinger(item.singer)+item.albumname}}
          </span>
        </p>
      </li>
    </ul>
    <p class="load-more" @click="loadMore" v-if="limit <= songData.length">点击加载更多歌曲</p>
  </div>
</template>

<script>
  export default {
    name: "OfficialSongList",
    data() {
      return {
        limit: 31
      }
    },
    props: {
      songData: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      parseSinger(singers) {
        let str = ''
        singers.forEach(item => {
          str += item.name + '/'
        })
        str = str.substring(0, str.length - 1) + '·'
        return str
      },
      loadMore() {
        this.limit += 10
      },
      songClick(songData){
        this.$bus.$emit('songClick',songData)
      }
    }
  }
</script>

<style scoped>
  .official-song-list {
    margin-top: -10px;
  }

  .song-item {
    padding: 10px 16px;
  }

  .song-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: lighter;
    font-size: 16.5px;
  }

  .song-singer {
    display: flex;
    align-items: center;
  }

  .singer-name {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    font-size: 12px;
    color: #959494;
  }

  .vip {
    display: block;
    padding-right: 5px;
    height: 10px;
    width: 36px;
  }
  .load-more {
    padding: .05rem 0;
    text-align: center;
    font-size: .12rem;
    color: rgba(0, 0, 0, .7);
  }
</style>