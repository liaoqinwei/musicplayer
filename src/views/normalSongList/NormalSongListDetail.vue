<template>
  <section id="normal-song-list">
    <normal-song-top-bar ref="songTop"/>
    <normal-song-list-banner :count="computedCount"
                             :logo="computedLogo"
                             :desc="computedDesc"
                             :head="songList.headurl"
                             :name="computedName"/>
    <normal-song-list :count="songList.cur_song_num" :song-list="songList.songlist" :desc="computedSongDesc"/>
  </section>
</template>

<script>
  import {getReSongListDetail} from "network/detail";
  import {getRakingDetail} from 'network/toList'

  import NormalSongListBanner from "./children/NormalSongListBanner";
  import NormalSongTopBar from "./children/NormalSongTopBar";
  import NormalSongList from "./children/NormalSongList";

  export default {
    name: "TopSongListDetail",
    data() {
      return {
        songList: []
      }
    },
    components: {
      NormalSongTopBar,
      NormalSongListBanner,
      NormalSongList
    },
    created() {
      let id = this.$route.params.id,
          path = this.$route.fullPath;
      if (path.indexOf('detail') !== -1) {
        getReSongListDetail(id).then(result => {
          this.songList = result.cdlist[0]
        })
      } else {
        getRakingDetail(id).then(result => {
          this.songList = result
        })
      }
    },
    mounted() {
      this.initTopStyle()
    },
    methods: {
      initTopStyle() {
        /* fixed的顶部样式 */
        this.$refs.songTop.$el.style.position = 'sticky'
        this.$refs.songTop.$el.style.top = '0'
        this.$refs.songTop.$el.style.zIndex = '111'
        this.$refs.songTop.$el.style.width = '100%'
        this.$refs.songTop.$el.style.boxSizing = 'border-box'
      }
    },
    computed: {
      /* 处理排行榜的歌单和普通歌单 */
      computedLogo() {
        if (Object.keys(this.songList).length !== 0) {
          return this.songList.logo || this.songList.topinfo.MacDetailPicUrl
        }
      },
      computedCount() {
        if (Object.keys(this.songList).length !== 0) {
          return this.songList.visitnum || this.songList.date
        }
      },
      computedDesc() {
        if (Object.keys(this.songList).length !== 0) {
          return this.songList.dissname || this.songList.topinfo.ListName
        }
      },
      computedName() {
        if (Object.keys(this.songList).length !== 0) {
          return this.songList.nickname || this.songList.topinfo.ListName + ' 第' + this.songList.day_of_year + '天'
        }
      },
      computedSongDesc(){
        if (Object.keys(this.songList).length !== 0) {
          return this.songList.desc || this.songList.topinfo.info
        }
      }

    }
  }
</script>

<style scoped>
</style>