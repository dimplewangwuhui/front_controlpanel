<template>
  <div class="header">
    <span class="head-left">
      <!--<el-button type="text" @click="collapseChange" style="padding: 0">-->
        <!--<img class="image" :src="imgurl" alt="" width="56px" height="56px">-->
      <!--</el-button>-->
      <span style="margin-left: 15px;">租房信息分析平台</span>
    </span>
    <span class="head-right">
      <span class="loginOut">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link" style="color:white; padding: 0 15px;">
            <span class="username">{{username}}</span>
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
      </span>
  </div>
</template>

<script>
    export default {
      name: "header",
      data(){
        return{
          imgurl: require('../../assets/img/house.png')
        }
      },
      computed:{
        username(){
          let username = sessionStorage.getItem('ms_username');
          return username ? username : this.name;
        }
      },
      methods:{
        handleCommand(command){
          if(command == 'userInfo'){
            this.$router.push('/userInfo');
          }else if(command == 'loginOut'){
            this.$confirm('确定退出吗？', '提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
              sessionStorage.clear();
              this.$router.push('/');
            })
          }
        }
      }
    }
</script>

<style scoped>
  .header {
    width:100%;
    background-color: #494090;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    height: 56px;
    line-height: 56px;
    position: fixed;
    z-index: 999
  }
  .head-left {
    float:left;
    font-size: 22px;
    color:white;
    margin-left:2%;
    height: 56px;
    line-height: 56px;
  }
  .head-right {
    float: right;
    margin-right: 2%
  }
  .loginOut :hover{
    cursor: pointer;
    background-color: #494077;
  }
</style>
