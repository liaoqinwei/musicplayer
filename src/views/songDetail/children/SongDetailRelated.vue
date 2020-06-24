<template>
  <section class="song-detail-related" v-if="Object.keys(relatedData).length!==0">
    <h2 class="title">大家都在听</h2>
    <ul class="related-list">
      <li class="related-item" v-for="item in relatedData">
        <div class="head-box">
          <img :src="item.imgurl" class="head">
        </div>
        <h2 class="album-title">{{item.dissname}}</h2>
        <p class="album-singer">{{item.creator}}</p>
      </li>
    </ul>
  </section>
</template>

<script>

  export default {
    name: "SongDetailRelated",
    props: {
      relatedData: {
        type: Array,
        default() {
          return []
        }
      }
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
  .related-list {
    margin-bottom: .3rem;
    display: flex;
    justify-content: space-around;
    padding: 0 .08rem;
  }

  .related-item {
    width: .93rem;
    padding: 0 .035rem;
  }

  .head-box {
    overflow: hidden;
    height: .93rem;
    width: .93rem;
    border-radius: .08rem;
  }

  .head {
    width: 100%;
    height: 100%;
  }

  .album-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: normal;
    font-size: .12rem;
  }

  .album-singer {
    font-size: .1rem;
  }
</style>