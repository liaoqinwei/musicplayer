<template>
  <div class="top-bar">
    <div class="nav-left-box">
      <div class="logo-box">
        <img src="~assets/img/2455021.png" alt="">
      </div>

      <div class="text-box">
        <h2>更多好听歌单</h2>
        <p>尽在QQ音乐</p>
      </div>
    </div>
    <div class="nav-right-box">
      戳我查看
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailTopBar"
  }
</script>

<style scoped>
  .top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: .5rem;
    padding: 0 14px 0 16px;
    background: #f8f8f8;
  }

  .nav-left-box {
    display: flex;
  }
  .logo-box {
    width: .3rem;
    height: .3rem;
  }

  .logo-box > img {
    width: 100%;
    height: 100%;
  }

  .text-box {
    padding-left: .08rem;
  }

  .nav-right-box {
    padding: .03rem .15rem;
    font-size: .1rem;
    border: 1px solid rgb(216, 216, 216);
    border-radius: .2rem;
  }

  .text-box > h2 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 1rem;
    font-weight: normal;
    font-size: .14rem;
  }

  .text-box > p {
    overflow: hidden;
    font-size: .1rem;
    color: #959494;
  }
</style>