<template>
  <li class="raking-list-item" @click="rakingClick">
    <!-- 文本描述 -->
    <div class="raking-text-box">
      <h2>{{rakingData.musichallTitle}}</h2>
      <p v-for="(item,index) in rakingData.song">
        <span class="index-text">{{index+1}}.</span>
        {{item.title}}-
        <span class="singer-name">{{item.singerName}}</span>
      </p>
    </div>
    <!-- 图片 -->
    <div class="raking-img-box">
      <span class="tips-text">{{rakingData.updateTips}}</span>
      <span class="counter-text">
        <i class="iconfont icon-bofang my-bofang"></i>
        {{(rakingData.listenNum/(100*100)).toFixed(1)}}万
      </span>
      <img :src="rakingData.frontPicUrl" alt="">
    </div>
  </li>
</template>

<script>
  export default {
    name: "RakingListItem",
    props: {
      rakingData: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      rakingClick() {
        this.$router.push('/player/rakinglist/'+this.rakingData.topId)
      }
    }
  }
</script>

<style scoped>
  .raking-list-item {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    margin: 0 .13rem .1rem;
    background: #fff;
    border-radius: .07rem;
  }

  .raking-text-box {
    padding-left: .1rem;
    margin-top: .1rem;
    flex-shrink: 0;
    max-width: 65%;
  }

  .raking-text-box > h2 {
    font-size: .135rem;
    font-weight: 700;
    line-height: .23rem;
  }

  .raking-text-box > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: .18rem;
    font-size: .1rem;
  }

  .raking-img-box {
    position: relative;
    width: .9rem;
  }

  .index-text {
    font-weight: bold;
  }

  .raking-img-box > img {
    width: 100%;
    vertical-align: bottom;
  }

  .singer-name {
    color: #d8d8d8;
  }

  .tips-text {
    position: absolute;
    top: .03rem;
    right: 0.05rem;
    color: #fff;
  }

  .counter-text {
    position: absolute;
    bottom: .02rem;
    right: .02rem;
    font-size: .115rem;
    color: #fff;
  }

  .my-bofang {
    margin-right: -.02rem;
    font-size: .11rem;
  }
</style>