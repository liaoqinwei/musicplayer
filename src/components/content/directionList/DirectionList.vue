<template>
  <section class="direction-list">
    <!-- 歌单描述 -->
    <section class="title-box" v-if="isDesc">
      <h2 class="music-box">{{title}}</h2>
      <p class="to-more">更多<span class="iconfont icon-jiantou more-mark"></span></p>
    </section>

    <!-- 歌单展示 -->
    <section class="list-container">
      <ul class="list-wrapper">
        <slot></slot>
      </ul>
    </section>
  </section>
</template>

<script>
  export default {
    name: "DirectionList",
    props: {
      title: {
        type: String,
        default: ''
      },
      isDesc:{
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped>
  .direction-list {
    margin-top: .2rem;
  }

  .title-box {
    display: flex;
    justify-content: space-between;
    padding-left: .15rem;
  }


  .title-box > h2 {
    font-size: .15rem;
  }

  .title-box > p {
    padding-right: .15rem;
    font-size: .13rem;
    color: rgba(26, 26, 26, .5);

  }

  /* 歌单 */
  .list-container {
    overflow: hidden;
    margin-top: .1rem;
    width: 100%;
  }

  .list-wrapper {
    display: flex;
    overflow-y: scroll;
    box-sizing: border-box;
    padding-left: .15rem;
    width: 100%;
  }

  .list-wrapper::-webkit-scrollbar {
    display: none;
  }

  .more-mark {
    padding-left: .03rem;
    font-size: .12rem;
    font-weight: bold;
  }
</style>