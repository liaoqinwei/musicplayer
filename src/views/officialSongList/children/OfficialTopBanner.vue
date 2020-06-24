<template>
  <div class="re-song-top-banner">
    <div class="banner">
      <img :src="topData.banner" @load="bannerDown">
    </div>
  </div>
</template>

<script>
  export default {
    name: "ReSongTopBanner",
    props: {
      topData: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods:{
      bannerDown(){
        this.$bus.$emit('bannerDown')
      }
    }
  }
</script>

<style scoped>
  .banner {
    width: 100%;
    height: 237px;
    overflow: hidden;
  }

  .banner > img {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;

  }

</style>