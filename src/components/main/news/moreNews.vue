<template>
  <div>
    <div style="margin-top: 50px; font-size: 40px;">其他城市资讯待开发</div>
    <div style="margin-top: 30px; font-size: 25px">敬请期待...</div>
    <!--<img :src="imgUrl" style="width: 100%; height: 300px">-->
    <div style="margin-top: 50px">
      <img :src="imgUrl2" style="width: 300px; float: left; margin-left: 100px">
      <img :src="imgUrl3" style="width: 300px; float: right; margin-right: 100px">
    </div>

  </div>
</template>

<script>
  export default {
    name: "moreNews",
    data() {
      return {
        imgUrl: require('../../../assets/img/0219d119-91e3-4166-8037-5156902f44b3_0.png'),
        imgUrl2: require('../../../assets/img/success (1).png'),
        imgUrl3: require('../../../assets/img/success.png')
      }
    }
  }
</script>

<style scoped>

</style>
