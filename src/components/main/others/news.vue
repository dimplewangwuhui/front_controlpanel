<template>
  <div class="news">
    <el-card class="box-card">
      <!--<div class="left">-->
        <!--<img :src=imgUrl>-->
      <!--</div>-->
      <div class="right" v-for="(item,index) in bjnews">
        <div class="title">
          {{ item.title }}
        </div>
        <div class="content">
          {{ item.content }}
        </div>
        <div class="info">
          {{ item.info }}
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
  export default {
    name: "news",
    data(){
      return {
        imgUrl: require('../../../assets/img/me.jpg'),
        bjnews:'',
      }
    },
    mounted(){
      // this.getNews()
    },
    methods:{
      getNews(){
        this.$axios.get('127.0.0.1:5000/')
          .then((response) => {
            if(response){
              console.log(response.data);
              this.bjnews = response.data[0];
            }
          }).catch(err => {
          console.log(err);
          this.$alert('请求超时，刷新重试！')
        })
      }
    }
  }
</script>

<style scoped>
  .box-card {
    text-align: left;
  }
  /*.left {*/
    /*float: left;*/
  /*}*/
  /*.left img {*/
    /*width: 100px;*/
  /*}*/
  /*.right {*/
    /*float: left;*/
    /*margin-left: 10px;*/
  /*}*/
  .title {
    font-size: 20px;
  }
  .content {
    font-size: 14px;
    padding: 10px 0;
  }
  .info {
    font-size: 14px;
  }
</style>
