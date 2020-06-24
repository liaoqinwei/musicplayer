<template>
  <div id="app">
    <top-bar v-if="computedPath"/>
    <nav-bar v-if="computedPath"/>
    <keep-alive :exclude="/(.*)Detail$/">
      <router-view/>
    </keep-alive>
    <footer-copyright v-if="computedPath"/>
  </div>
</template>


<script>
  import NavBar from "components/content/navBar/NavBar";
  import TopBar from "components/content/topBar/TopBar";
  import FooterCopyright from "components/content/footer/FooterCopyright";

  export default {
    name: 'App',
    components: {
      TopBar,
      NavBar,
      FooterCopyright
    },
    computed: {
      computedPath() {
        let path = this.$route.fullPath
        return (path.indexOf('recommend') + path.indexOf('tolist')) !== -2
      }
    }
  }
</script>
<style>
  @import "common/reset.min.css";
  @import "assets/css/base.css";
  @import "assets/css/iconfont.css";

  #app {
    margin: auto;
    max-width: 640px;
    height: 100%;
    background: #fafafa;
  }
</style>
