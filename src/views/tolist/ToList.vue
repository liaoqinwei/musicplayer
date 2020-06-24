<template>
  <section id="tolist">
    <raking-list :toList="toList"/>
  </section>
</template>

<script>
  import RakingList from "./children/RakingList";

  import {getRakingList} from "network/toList";

  export default {
    name: "ToList",
    data() {
      return {
        toList: []
      }
    },
    components: {
      RakingList
    },
    created() {
      getRakingList().then(result => {
        let list = []
        result.topListData.list.forEach(item => {
          [].push.apply(list, item.toplist)
        })
        this.toList = list
      })
    }
  }
</script>

<style scoped>

</style>