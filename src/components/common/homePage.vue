<template>
  <div class="homePage">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#151A24"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1" style="margin-left: 100px">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      <el-menu-item index="5" style="margin-left: 50%">
        <el-button class="goLogin" type="text" @click="login" style="color: #fff">登录</el-button>
      </el-menu-item>
      <el-menu-item index="6">
        <el-button class="goRegister" type="text" @click="register" style="color: #fff">注册</el-button>
      </el-menu-item>
    </el-menu>

    <el-carousel :interval="2000" arrow="hover" height="100%" class="carousel">
      <el-carousel-item v-for="item in imagesbox" :key="item">
        <img :src="item.idView" class="image">
      </el-carousel-item>
    </el-carousel>
  </div>


</template>

<script>
    export default {
      name: "homePage",
      data(){
        return{
          imagesbox:[
            {id:1,idView:require("../../assets/img/timg (1).jpg")},
            {id:2,idView:require("../../assets/img/timg (2).jpg")},
            ]
        }
      },
      methods:{
        login(){
          this.$router.push('/login')
        },
        register(){
          this.$router.push('/register')
        }
      }
    }
</script>

<style scoped>
  .carousel {
    width: 100%;
    height: 100%;
    position: fixed;
  }
  .goLogin :hover{
    color: #409EFF;
  }
  .goRegister :hover{
    color: #409EFF;
  }
</style>

