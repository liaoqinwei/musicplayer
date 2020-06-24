<template>
  <nav class="nav-bar">
    <div v-for="(item,index) in navData" @click="navCheck(index)" :class="{check:currentIndex===index}">
      {{Object.keys(item)[0]}}
    </div>
  </nav>
</template>

<script>
  export default {
    name: "NavBar",
    data() {
      return {
        navData: [{推荐: 'recommend'}, {排行: 'tolist'}],
        currentIndex: this.$router.history.current.fullPath.indexOf('tolist') == -1 ? 0 : 1
      }
    },
    methods: {
      navCheck(index) {
        let checkItem = this.navData[index]
        this.$router.push(checkItem[Object.keys(checkItem)[0]])
        this.currentIndex = index
      },
    },
  }
</script>

<style scoped>
  .nav-bar {
    position: sticky;
    top: .45rem;
    z-index: 111;
    display: flex;
    height: .36rem;
    line-height: .36rem;
    color: rgba(26, 26, 26, .5);
    background: #fff;
    box-shadow: 0 5px 5px rgba(175, 175, 175, .1);
  }

  .nav-bar > div {
    flex: 1;
    position: relative;
    text-align: center;
    font-size: .14rem;
  }

  .check {
    color: rgba(34, 213, 156, 1);
  }

  .check::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: .2rem;
    margin-left: -.1rem;
    border-bottom: .019rem solid rgba(34, 213, 156, 1);
  }
</style>