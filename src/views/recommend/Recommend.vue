<template>
  <section id="recommend">
    <recommend-search :hot-search="hotSearch" @checkSearch="checkSearch" ref="searchBox"/>
    <song-list :songList="playList.officialPlaylist" title="官方歌单" v-show="!isSearch"/>
    <song-list :songList="playList.ugcPlaylist" title="达人歌单" v-show="!isSearch"/>
    <recommend-zone-list :zoneList="playList.zoneList" title="专区" v-show="!isSearch"/>
  </section>
</template>

<script>
  import RecommendSearch from "./children/RecommendSearch";
  import SongList from "./children/RecommendSongList";
  import RecommendZoneList from "./children/RecommendZoneList";

  import {getRecommendPlayList} from "network/recommend";
  import {getHotSearch} from 'network/search'

  export default {
    name: "Recommend",
    data() {
      return {
        playList: {},
        hotSearch: {},
        isSearch: false
      }
    },
    created() {
      // 发送主页歌单请求
      getRecommendPlayList().then(res => {
        this.playList = res.homeData
      })

      // 发送热搜数据
      getHotSearch().then(result => {
        this.hotSearch = result.data
      })
    },
    components: {
      RecommendSearch,
      SongList,
      RecommendZoneList
    },
    methods: {
      checkSearch(check) {
        this.isSearch = check
      }
    },
    /* 在进来的时候 我们需要清空search的所有状态 */
    beforeRouteEnter(to, from, next, now) {
      // this.$refs.searchBox.clearStatus()
      next(vm => {
        vm.isSearch = false
        vm.$refs.searchBox.clearStatus()
      })
    }

  }
</script>

<style scoped>
  #recommend {
    position: relative;
  }
</style>