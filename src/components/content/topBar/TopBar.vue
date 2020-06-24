<template>
  <section class="top-bar">
    <div class="logo-box">
      <img src="~assets/logo.svg" class="logo">
    </div>

    <div class="desc-box">
      <h2 class="app-title">QQ音乐</h2>
      <p class="down-text">打开APP收藏下载</p>
    </div>
    <div class="down-btn">下载APP</div>
  </section>
</template>

<script>
  export default {
    name: "TopBar"
  }
</script>

<style scoped>
  .top-bar {
    position: sticky;
    top: 0;
    z-index: 111;
    display: flex;
    align-items: center;
    height: .46rem;
    padding: 0 .14rem 0 .16rem;
    background: #fff;
  }

  .logo-box {
    text-align: center;
    line-height: .28rem;
    width: .28rem;
    height: .28rem;
    border-radius: 0.05rem;
    background: #fff;
  }

  .logo {
    position: relative;
    bottom: .02rem;
    width: .21rem;
    height: .21rem;
    vertical-align: bottom;
  }

  .desc-box {
    margin-left: .1rem;
    width: 1.7rem;
  }

  .app-title {
    font-weight: normal;
    font-size: .15rem;
  }

  .down-text {
    font-size: .12rem;
    color: grey;
  }

  .down-btn {
    line-height: .22rem;
    height: .22rem;
    padding: 0 .17rem;
    color: #959494;
    border: 1px solid #d8d8d8;
    border-radius: 999px;
  }
</style>