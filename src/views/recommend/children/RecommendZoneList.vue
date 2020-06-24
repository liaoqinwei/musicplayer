<template>
  <div class="special-area">
    <direction-list :title="title">
      <li v-for="item in zoneList" class="list-item">
        <div class="img-box">
          <div class="title-box">
            <img :src="item.miscellany.icon" alt="">
            <span>{{item.title}}</span>
          </div>
          <img :src="item.cover" alt="">
        </div>
        <p class="sub-title">{{item.subtitle}}</p>
      </li>
    </direction-list>
  </div>
</template>

<script>
  import DirectionList from "components/content/directionList/DirectionList";

  export default {
    name: "RecommendSpecialArea",
    props: {
      title: {
        type: String,
        default: ''
      },
      zoneList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      DirectionList
    }
  }
</script>

<style scoped>
  .list-item:nth-last-of-type(1) {
    padding-right: 0.06rem;
  }

  .list-item {
    flex-shrink: 0;
    width: 2.15rem;
  }

  .img-box {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    width: 96%;
    border-radius: .05rem;
  }

  .img-box > img {
    width: 100%;
    vertical-align: bottom;
  }

  .title-box {
    padding-left: .1rem;
    position: absolute;
    left: 0;
    bottom: .02rem;
    color: #fff;
  }

  .title-box > img {
    width: .3rem;
    height: .3rem;
    border-radius: .5rem;
  }

  .title-box > span {
    padding-left: .05rem;
    font-size: .14rem;
    line-height: .35rem;
  }

  .sub-title {
    margin-top: .05rem;
    font-size: .11rem;
  }
</style>