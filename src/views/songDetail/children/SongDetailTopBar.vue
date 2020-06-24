<template>
  <div class="top-bar">
    <div class="nav-left-box">
      <div class="logo-box">
        <img src="~assets/img/2455021.png" alt="">
      </div>

      <div class="text-box">
        <h2>你的好友</h2>
        <p>在用 QQ音乐 邀你一起</p>
      </div>
    </div>
    <div class="nav-right-box">
      立即使用
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
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: .5rem;
    padding: 0 14px 0 16px;
    background: #f8f8f8;
    box-shadow: 0 1px 0 rgba(0,0,0,.1);
    z-index: 1111;
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
    white-space: nowrap;
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
    white-space: nowrap;
    overflow: hidden;
    font-size: .1rem;
    color: #959494;
  }
</style>