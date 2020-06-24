<template>
  <div class="normal-song-banner-box" v-if="count!==undefined">
    <div class="logo-box">
      <img :src="logo" class="logo">
    </div>
    <p class="desc">{{desc}}</p>
    <div class="head-box">
      <img :src="head" class="head">
      <span class="name">{{name}}</span>
    </div>
    <p class="count-box"><span class="count">{{computedCount}}</span></p>
    <div class="btn">
      <i class="iconfont icon-bofang my-bofang"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NormalSongListBanner",
    props: ['logo', 'desc', 'head', 'count', 'name'],
    computed: {
      /* 处理排行榜的歌单和普通歌单 */
      computedCount() {
        let path = this.$router.history.current.path,
            res;
        if (path.indexOf('raking') === -1) {
          res = '播放量：' + (this.count / (100 * 100)).toFixed(1) + ' 万'
        } else {
          res = '更新日期：' + this.count
        }
        return res;
      }
    }
  }
</script>

<style scoped>
  .normal-song-banner-box {
    border-top: 1px solid rgba(0, 0, 0, .1);
    background: #fcfcfc;
  }

  .logo-box {
    position: relative;
    display: block;
    margin: .1rem auto .15rem;
    width: 1.62rem;
    height: 1.62rem;
    border-radius: .15rem;
    box-shadow: .01rem .06rem .12rem rgba(0, 0, 0, .21);
    z-index: 3;
  }

  .logo-box::before {
    content: '';
    position: absolute;
    top: .2rem;
    right: -.08rem;
    height: 1.22rem;
    width: 1.22rem;
    background: rgba(0, 0, 0, .05);
    border-radius: .15rem;
    z-index: 1;
  }

  .logo {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: .15rem;
    z-index: 1;
  }


  .desc {
    text-align: center;
    margin: 0 auto .12rem;
    font-size: .15rem;
    font-weight: normal;
  }

  .head-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: .12rem;
  }

  .head-box > .head {
    width: .18rem;
    height: .18rem;
    border-radius: .15rem;
  }

  .head-box > .name {
    display: block;
    margin-left: .05rem;
    font-size: .135rem;
    font-weight: normal;
  }

  .count-box {
    text-align: center;
    font-size: .11rem;
    font-weight: normal;
    color: #808080;
  }

  .btn {
    margin: .12rem auto 0;
    width: 1.62rem;
    height: .34rem;
    text-align: center;
    background: #22d59c;
    border-radius: 100rem;
    box-shadow: 0 6px 32px rgba(24, 213, 156, .5);
  }

  .my-bofang {
    color: #fff;
    font-size: .3rem;
    line-height: .36rem;
  }
</style>