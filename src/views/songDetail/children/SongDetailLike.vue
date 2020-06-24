<template>
  <section class="song-detail-lick"  v-if="Object.keys(likeList).length!==0">
    <h2 class="title">猜你喜欢听</h2>
    <song-detail-lick-item v-for="item in likeList.slice(0,3)" :descData="item"/>
  </section>
</template>

<script>
  import SongDetailLickItem from "./SongDetailLikeItem";

  export default {
    name: "SongDetailLike",
    props: {
      likeList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      SongDetailLickItem
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
</style>