<template>
  <div class="header">
    <div class="head-left">
      <a href="/main"><i class="iconfont icon-fangzi01-copy"></i></a>
      <span style="margin-left: 5px;">租房信息分析平台</span>
    </div>
    <div class="head-right">
      <el-tooltip class="message" effect="light" visible-arrow="false" :content="message?`新增${message}条留言`:`建议留言`" placement="bottom">
        <el-badge is-dot class="item">
          <i class="iconfont icon-jinggao" ></i>
        </el-badge>
      </el-tooltip>

      <span class="loginOut">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link" style="color:white; padding: 0 15px;">
            <span class="username">{{username}}</span>
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="updatePwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="homePage" divided>返回首页</el-dropdown-item>
            <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
      </div>
  </div>
</template>

<script>
    export default {
      name: "header",
      data(){
        return{
          message: 2,
          imgurl: require('../../assets/img/房子.png')
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
          if(command === 'userInfo'){
            this.$router.push('/userInfo');
          }
          if(command === 'updatePwd'){
            this.$router.push('/updatePwd');
          }
          if(command === 'homePage'){
            this.$router.push('/')
          }
          else if(command === 'loginOut'){
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
  .head-left a {
    color: white;
  }
  .head-right {
    float: right;
    margin-right: 2%
  }
  .loginOut :hover{
    cursor: pointer;
    background-color: #3a0088;
  }
  .message :hover{
    cursor: pointer;
  }
</style>
<style>
  .item .el-badge__content.is-fixed {
    top: 18px;
    left: 10px;
  }
</style>
