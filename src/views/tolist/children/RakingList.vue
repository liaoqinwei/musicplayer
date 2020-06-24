<template>
  <div class="raking-list-wrapper" v-if="toList.length!==0">
    <ul class="raking-list">
      <raking-list-item :raking-data="item" v-for="item in toList"/>
    </ul>
  </div>
</template>

<script>
  import RakingListItem from "./RakingListItem";

  export default {
    name: "RakingList",
    props: {
      toList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components:{
      RakingListItem
    }
  }
</script>

<style scoped>
.raking-list-wrapper{
  margin-top: .15rem;
}
</style>