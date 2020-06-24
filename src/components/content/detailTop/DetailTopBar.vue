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
    height: 54.4px;
    padding: 0 14px 0 16px;
    align-items: center;
    justify-content: space-between;
  }

  .nav-left-box {
    display: flex;
  }

  .logo-box {
    width: 33px;
    height: 33px;
  }

  .logo-box > img {
    width: 100%;
    height: 100%;
  }

  .text-box {
    padding-left: 8px;
  }

  .nav-right-box {
    padding: 5px 17px;
    font-size: 12px;
    border: 1px solid rgb(216, 216, 216);
    border-radius: 20px;
  }

  .text-box > h2 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100px;
    font-weight: normal;
    font-size: 16px;
  }

  .text-box > p {
    overflow: hidden;
    font-size: 12px;
    color: #959494;
  }
</style>