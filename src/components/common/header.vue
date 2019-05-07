<template>
  <div class="header">
    <div class="head-left">
      <a href="/firstPage"><i class="iconfont icon-fangzi01-copy"></i></a>
      <span style="margin-left: 5px;">租房信息分析平台</span>
    </div>
    <div class="head-right">



      <div>
        <div class="message">
          <el-tooltip effect="light" visible-arrow="false" :content="message?`新增${message}条留言`:`建议留言`" placement="bottom">
            <el-badge is-dot class="item">
              <i class="iconfont icon-jinggao" ></i>
            </el-badge>
          </el-tooltip>
        </div>
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="light" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom" style=" transform: rotate(45deg);">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <img class="headImg" :src=imgurl>
        <div class="loginOut" style="float: right">
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
        </div>
      </div>
      </div>
  </div>
</template>

<script>
    export default {
      name: "header",
      data(){
        return{
          message: 2,
          fullscreen: false,
          imgurl: require('../../assets/img/bg.jpg')
        }
      },
      computed:{
        username(){
          let username = sessionStorage.getItem('ms_username');
          return username ? username : this.name;
        }
      },
      methods:{
        // 全屏事件
        handleFullScreen(){
          let element = document.documentElement;
          if (this.fullscreen) {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.webkitCancelFullScreen) {
              document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            }
          } else {
            if (element.requestFullscreen) {
              element.requestFullscreen();
            } else if (element.webkitRequestFullScreen) {
              element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
              // IE11
              element.msRequestFullscreen();
            }
          }
          this.fullscreen = !this.fullscreen;
        },
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
  .headImg {
    float:left;
    width:40px;
    height:40px;
    border-radius: 50%;
    margin-top: 8px
  }

  .btn-fullscreen{
    float: left;
    -webkit-transform: rotate(0deg);
    /*transform: rotate(45deg);*/
    margin-right: 50px;
    margin-left: 15px;
    font-size: 24px;
    color: #fff;
    cursor: pointer;
  }
  .message {
    float: left;
    margin-right: 25px;
    font-size: 24px;
    cursor: pointer;
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
