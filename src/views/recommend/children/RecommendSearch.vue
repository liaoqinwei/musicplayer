<template>
  <div class="recommend-search">
    <div class="recommend-search-box">
      <div class="search-box">
        <i class="iconfont icon-sousuo search-text" :class="{check:isFocus}" @click="searchTextClick">搜索</i>
        <input class="search-inp" ref='searchInp'
               @click="clickSearch"
               :class="{focus:isFocus}"
               @focus="focusSearch"
               @blur="blurSearch"
               @keyup.enter="searchKey"/>
      </div>
      <span class="close-btn" :class="{check:isCheck}" @click="closeClick">取消</span>
    </div>

    <!-- 展示热搜 -->
    <div class="host-search" v-show="isCheck && searchData.length===0">
      <h3 class="search-title">热门搜索</h3>
      <ul class="host-search-detail">
        <li class="search-item" v-for="item in hotSearch.hotkey" @click="hotSongClick(item.k)">
          {{item.k}}
        </li>
      </ul>
    </div>

    <!-- 展示搜索出来的歌曲 -->
    <div class="search-song-box" v-show="isCheck">
      <ul class="search-song-list" v-for="list in searchData">
        <li v-for="item in list.song.list" class="song-item" @click="songClick(item.songid)">
          <h2 class="song-name">{{item.songname}}</h2>
          <p class="singer-name">{{singerName(item.singer)}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {getSearch} from 'network/search'
  import singerAanPath from "mixins/singerAanPath";
  import {throttle} from "assets/utils";

  export default {
    name: "RecommendSearch",
    mixins: [singerAanPath],
    data() {
      return {
        isCheck: false,
        isFocus: false,
        searchData: [],
        searchVal: '',
        page: 1,
        isRun: false
      }
    },
    props: {
      hotSearch: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      /* 关闭显示逻辑 */
      searchTextClick(ev) {
        ev.target.nextElementSibling.focus()
      },
      clickSearch(ev) {
        ev.target.placeholder = '搜索'
        this.isCheck = true
        this.isFocus = true

        this.$emit('checkSearch', true)
      },
      focusSearch() {
        this.isFocus = true
      },
      blurSearch(ev) {
        if (this.$refs.searchInp.value === '') {
          this.isFocus = false
          ev.target.placeholder = ''
        }
      },
      closeClick() {
        let inp = this.$refs.searchInp
        inp.value = ''
        inp.placeholder = ''
        this.$emit('checkSearch', false)
        this.isCheck = false
        this.isFocus = false
        this.searchData = []
      },

      /*搜索逻辑*/
      searchKey() {
        if (!this.isRun) {
          let inp = this.$refs.searchInp
          this.searchVal = inp.value
          this.isRun = true
          // 每次搜索清空容器
          this.searchData = []
          this.page = 2
          getSearch(this.searchVal).then(result => {
            this.searchData.push(result.data)
            this.isRun = false
          })
        }
      },
      listenScroll(ev) {
        if (!this.isRun && this.isCheck) {
          let top = document.documentElement.scrollTop || window.pageYOffset,
              wHeight = window.innerHeight,
              realHeight = window.document.documentElement.scrollHeight

          // 如果大于了高度再次发送请求
          if ((top + wHeight + 250) >= realHeight) {
            this.isRun = true
            getSearch(this.searchVal, this.page++).then(result => {
              this.searchData.push(result.data)
              this.isRun = false
            })
          }
        }
      },
      hotSongClick(name) {
        let inp = this.$refs.searchInp
        inp.focus()
        inp.value = name
        this.searchVal = name
        this.searchKey()
      },
      /*跳转页面*/
      songClick(id) {
        this.$router.push('/songdetail/' + id)
      },
      /* 清空状态 */
      clearStatus() {
        console.log(111)
        this.isCheck = false
        this.isFocus = false
        this.searchData = []
        this.searchVal = ''
        this.page = 1
        this.isRun = false
        this.$refs.searchInp.value = ''
      }
    },
    mounted() {
      let listen = throttle(this.listenScroll, 50)
      window.addEventListener("touchmove", listen, false)
      window.addEventListener("scroll", listen, false)
    }
  }
</script>

<style scoped>
  .recommend-search-box {
    display: flex;
    margin: 15px auto 0;
    padding: 0 10px;
    height: .25rem;
    text-align: center;
  }

  .search-box {
    position: relative;
    flex: 1;
  }

  .search-text {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    line-height: .25rem;
    z-index: 2;
    font-size: .12rem;
    color: rgba(26, 26, 26, .5);
  }

  .search-text.check {
    display: none;
  }

  .search-inp {
    position: absolute;
    display: block;
    background: #fff;
    width: 100%;
    height: .25rem;
    border-radius: 999px;
    border: none;
  }

  .search-inp.focus {
    padding-left: .25rem;
    font-size: .12rem;
    width: 85%;
    background: url("~assets/font/sousuo.svg") #fff no-repeat .05rem;
    background-size: .2rem .2rem;
    color: rgba(26, 26, 26, .5);
  }

  .close-btn {
    display: none;
    width: .5rem;
    font-size: .12rem;
    line-height: .25rem;
    font-weight: bold;
  }

  .close-btn.check {
    display: block !important;
  }

  .host-search-detail {
    display: flex;
    flex-wrap: wrap;
    margin: 0 .16rem;
  }

  .search-item {
    padding: 0 .085rem;
    margin-right: .085rem;
    margin-bottom: .085rem;
    font-size: .11rem;
    border-radius: 5rem;
    line-height: .2rem;
    background: #fff;
  }

  .search-title {
    margin: .1rem .15rem;
    font-size: .12rem;
  }

  .search-song-box {
    margin-top: .16rem;
  }

  .song-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: normal;
    font-size: .135rem;
  }

  .song-item {
    padding: 0 .16rem;
    margin-bottom: .16rem;
  }

  .singer-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(26, 26, 26, .5);
    font-size: .1rem;
    line-height: .2rem;
  }
</style>