<template>
  <div class="image">
    <img :src=image>
  </div>
</template>

<script>
  export default {
    name: "image",
    image: require('../../../assets/img/me.jpg')
  }
</script>

<style scoped>

</style>
