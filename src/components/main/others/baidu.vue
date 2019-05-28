<template>
  <div>
    <iframe src="http://www.baidu.com" id="baidu" scrolling="yes" frameborder="0" ></iframe>
  </div>
</template>

<script>
  import RouterLink from "vant/packages/mixins/router-link";
  export default {
    name: "baidu",
    components: {RouterLink},
    data () {
      return {

      }
    },
    mounted () {
      function changeMobsfIframe(){
        const mobsf = document.getElementById('baidu');
        const deviceWidth = document.body.clientWidth;
        const deviceHeight = document.body.clientHeight;
        mobsf.style.width = (Number(deviceWidth)-200) + 'px'; //数字是页面布局宽度差值
        mobsf.style.height = (Number(deviceHeight)-110) + 'px'; //数字是页面布局高度差
      }

      changeMobsfIframe();

      window.onresize = function(){
        changeMobsfIframe()
      }
    },
  }
</script>

<style scoped>

</style>
