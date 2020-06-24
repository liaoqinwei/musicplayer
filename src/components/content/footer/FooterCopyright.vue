<template>
  <footer class="footer-copyright">
    <p class="log-box">
      <img src="~assets/logo_ch.svg" alt="">
    </p>
    <p class="copy-text">
      Copyright © 1998 - 2019 Tencent. All Rights Reserved.
    </p>
    <p class="copy-text">联系电话：0755-86013388 QQ群：55209235</p>
  </footer>
</template>

<script>
  export default {
    name: "FooterCopyright",
  }
</script>

<style scoped>
  .footer-copyright {
    padding:.3rem 0 .5rem ;
    box-sizing: border-box;
  }

  .log-box {
    text-align: center;
  }

  .log-box > img {
    width: .68rem;
    height: .19rem;
  }

  .copy-text {
    text-align: center;
    color: rgba(26, 26, 26, 1);
    line-height: 0.18rem;
  }
</style>