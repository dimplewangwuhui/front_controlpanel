<template>
  <div class="homePage">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      router
      @select="handleSelect"
      background-color="#151A24"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1" style="margin-left: 100px">
        <template slot="title"><span slot="title">数据采集</span></template>
        <el-menu-item-group>
          <el-menu-item index="job">找工作</el-menu-item>
          <el-menu-item index="house">找房子</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">可视化展示</template>
        <el-menu-item-group>
          <el-submenu index="echarts">
            <template slot="title">图表展示</template>
            <el-menu-item index="echarts_price">租金比较</el-menu-item>
            <el-menu-item index="echarts_trend">租金走势</el-menu-item>
            <el-menu-item index="echarts_count">租房数量</el-menu-item>
            <el-menu-item index="echarts_area">租房面积</el-menu-item>
          </el-submenu>
          <el-menu-item index="wordCloud">词云展示</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">用户管理</template>
        <el-menu-item-group>
          <el-menu-item index="userInfo">个人信息</el-menu-item>
          <el-menu-item index="updatePwd">修改密码</el-menu-item>
          <el-menu-item index="userManage">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">其他</template>
        <el-menu-item-group>
          <el-menu-item index="contact">联系我们</el-menu-item>
          <el-menu-item index="advise">建议留言</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="5" style="margin-left: 40%">
        <el-button class="goLogin" type="text" @click="login" style="color: #fff">{{ logins }}</el-button>
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
          logins:'登录',
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
      },
      mounted() {
        if(sessionStorage.getItem('ms_username')){
          this.logins = sessionStorage.getItem('ms_username');
          // this.$refs.login.style.fontSize = '20px'
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

