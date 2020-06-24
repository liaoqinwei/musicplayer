<template>
  <li class="comment-item" v-if="Object.keys(commentData).length !== 0">
    <div class="head-box">
      <img :src="commentData.avatarurl" class="head">
    </div>
    <div class="comment-desc">
      <!-- 用户信息 -->
      <h3 class="user-name">
        {{commentData.nick}}
        <img src="~assets/img/medal.png" class="mark" v-if="!!commentData.is_medal">
        <span class="good">
          {{commentData.praisenum}}
          <i class="iconfont icon-zan1 my-zan"></i>
        </span>
      </h3>
      <p class="date">{{parseDate}}</p>
      <h2 class="comment" v-html="commentHandle"></h2>
    </div>
  </li>
</template>

<script>
  export default {
    name: "SongDetailCommentItem",
    props: {
      commentData: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      parseDate() {
        let date = new Date(this.commentData.time * 1000);
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hours = date.getHours(),
            minutes = date.getMinutes();
        return `${year}-${month}-${day} ${hours}:${minutes}`
      },
      commentHandle() {
        let str = this.commentData.rootcommentcontent.replace(/\\n/g, '<br>');
        return str;
      }
    }
  }
</script>

<style scoped>
  .comment-item {
    display: flex;
    padding: .1rem .15rem;
  }

  .head-box {
    overflow: hidden;
    height: .35rem;
    width: .35rem;
    border-radius: .35rem;
  }

  .head {
    width: 100%;
    height: 100%;
  }

  .user-name {
    display: flex;
    justify-content: left;
    align-items: center;
    font-weight: normal;
    color: #777;
  }

  .mark {
    height: .18rem;
    margin-left: 4px;
  }

  .good {
    flex: 1;
    text-align: right;
    font-size: .13rem;
    color: #bbb;
  }

  .comment-desc {
    flex: 1;
    padding-left: 10px;
  }


  .comment {
    font-weight: lighter;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
    overflow: hidden;
    font-size: .13rem;
  }

  .date {
    line-height: .17rem;
    font-size: .09rem;
  }

  .my-zan {
    font-size: .16rem;
  }
</style>