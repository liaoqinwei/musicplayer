<template>
  <section class="song-detail-comment" v-if="Object.keys(commentData).length !== 0">
    <h2 class="title">精彩评论</h2>
    <ul class="comment-list">
      <song-detail-comment-item
              v-for="item in commentData.hot_comment.commentlist.length>3?commentData.hot_comment.commentlist.slice(0,3):commentData.hot_comment.commentlist"
              :comment-data="item"/>
    </ul>
    <div class="look-btn">
      查看全部评论
      <i class="iconfont icon-jiantou my-jiantou"></i>
    </div>
  </section>
</template>

<script>
  import SongDetailCommentItem from "./SongDetailCommentItem";

  export default {
    name: "SongDetailComment",
    components: {SongDetailCommentItem},
    props: {
      commentData: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    comments: {
      SongDetailCommentItem
    }
  }
</script>

<style scoped>
  .title {
    margin: .2rem 0;
    font-weight: normal;
    text-align: center;
    font-size: .15rem;
  }

  .look-btn {
    margin: 10px auto 0;
    width: 2rem;
    height: .34rem;
    line-height: .34rem;
    border-radius: .34rem;
    font-size: .125rem;
    text-align: center;
    border: 1px solid rgba(128, 128, 128, .7);
  }

  .my-jiantou {
    font-size: .08rem;
  }
</style>