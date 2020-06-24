<template>
  <section id="re-song-list-detail">
    <detail-top-bar/>
    <re-song-top-banner :top-data="{banner:listDetailData.dir_pic_url2}"/>
    <official-music-player :desc="listDetailData.desc"
                           :logo="listDetailData.headurl"
                           :song-list="listDetailData.songlist"/>
    <official-song-list :song-data="listDetailData.songlist"/>

    <div class="footer">
      <img :src="listDetailData.headurl" class="logo">
      <span class="logo-desc">QQ音乐</span>
    </div>
  </section>
</template>

<script>
  import {getReSongListDetail} from 'network/detail'
  import DetailTopBar from "components/content/detailTop/DetailTopBar";

  import ReSongTopBanner from "./children/OfficialTopBanner";
  import OfficialMusicPlayer from "./children/OfficialMusicPlayer";
  import OfficialSongList from "./children/OfficialSongList";


  export default {
    name: "ReSongListDetail",
    data() {
      return {
        listDetailData: {},
      }
    },
    created() {
      // 发送请求，请求书
      getReSongListDetail(this.$route.params.id).then(result => {
        this.listDetailData = result.cdlist[0]
        for (let index of this.listDetailData.songlist.keys()) {
          this.$set(this.listDetailData.songlist[index],'isCheck',false)
        }
      })
    },
    components: {
      ReSongTopBanner,
      DetailTopBar,
      OfficialMusicPlayer,
      OfficialSongList
    }
  }
</script>

<style scoped>
  #re-song-list-detail {
    background: #fff;
  }

  .footer {
    margin: 20px 0;
  }

  .logo {
    display: block;
    width: 32px;
    height: 32px;
    margin: 0 auto;
  }

  .logo-desc {
    display: block;
    text-align: center;
    font-weight: normal;
    line-height: 26px;
    font-size: 14px;
  }
</style>