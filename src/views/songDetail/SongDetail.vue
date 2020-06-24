<template>
  <section id="song-detail" v-if="Object.keys(songDetail).length !== 0">
    <song-detail-top-bar/>
    <song-detail-banner :song-desc="songDetail.detail.data"
                        v-if="Object.keys(songDetail).length!==0"/>
    <!--猜你喜欢-->
    <song-detail-like :like-list="songDetail.simsongs.data.songInfoList" @updateData="updateData(id)"/>
    <!--大家都在听-->
    <song-detail-related :related-data="songDetail.gedan.data.vec_gedan"/>
    <!--歌手和专辑-->
    <song-detail-singer-and-album :singer-data="songDetail.detail.data.track_info.singer"
                                  :album-data="songDetail.detail.data.track_info.album"/>
    <!--精彩评论-->
    <song-detail-comment :comment-data="commentData"/>
    <!--推荐-->
    <song-detail-recommend :recommend="songDetail.video.data.list"/>
    <div class="more-btn">更多精彩内容 尽在QQ音乐</div>
  </section>
</template>

<script>
  import SongDetailTopBar from "./children/SongDetailTopBar";
  import SongDetailBanner from "./children/SongDetailBanner";
  import SongDetailLike from "./children/SongDetailLike";
  import SongDetailRelated from "./children/SongDetailRelated";
  import SongDetailSingerAndAlbum from "./children/SongDetailSingerAndAlbum";
  import SongDetailComment from "./children/SongDetailComment";
  import SongDetailRecommend from "./children/SongDetailRecommend";

  import {getSongDesc, getComment} from "network/song";

  export default {
    name: "SongDetail",
    data() {
      return {
        songDetail: {},
        commentData: {}
      }
    },
    components: {
      SongDetailTopBar,
      SongDetailBanner,
      SongDetailLike,
      SongDetailRelated,
      SongDetailSingerAndAlbum,
      SongDetailComment,
      SongDetailRecommend
    },
    created() {
      getSongDesc(this.$route.params.id).then(result => {
        this.songDetail = result
      })
      getComment(this.$route.params.id).then(result => {
        this.commentData = result
      })
    },
    mounted() {
      this.$bus.$on('updateData', (id) => {
        this.updateData(id)
      })
    },
    methods: {
      updateData(id) {
        getSongDesc(id).then(result => {
          this.songDetail = result
        })
        getComment(id).then(result => {
          this.commentData = result
        })
        console.log(111)
      }
    }
  }
</script>

<style scoped>
  #song-detail {
    width: 100%;
    padding-bottom: .3rem;
  }

  .more-btn {
    margin: .3rem auto;
    background: rgb(34, 213, 156);
    text-align: center;
    width: 2.34rem;
    height: .34rem;
    line-height: .34rem;
    font-size: .16rem;
    color: #fff;
    border-radius: .34rem;
  }
</style>