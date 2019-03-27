<template>
  <div class="register2login">
    <div class="sucicon"><i class="el-icon-success"></i></div>
    <div class="title">恭喜您，密码修改成功，{{count}}秒后自动跳转到登录界面</div>
    <div class="buttons">
      <el-button type="primary" @click="goLogin">去登录</el-button>
      <el-button type="primary" @click="goRegister">去注册</el-button>
      <el-button type="primary" @click="goHomePage">去首页</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        count:"",
      }
    },
    created(){
      document.querySelector('body').setAttribute('style', 'background-color:#fff');
      this.countDown()
    },
    methods: {
      countDown(){
        const TIME_COUNT = 5;
        if(!this.timer){
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(()=>{
            if(this.count > 0 && this.count <= TIME_COUNT){
              this.count--;
            }else{
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
              this.$router.push('/login')
            }
          },1000)
        }
      },
      goLogin(){
        this.$router.push('/login')
      },
      goRegister(){
        this.$router.push('/register')
      },
      goHomePage(){
        this.$router.push('/homepage')
      },
    }
  }
</script>

<style scoped>
  .sucicon {
    font-size: 100px;
    color: green;
    margin-top: 80px
  }
  .title {
    margin-bottom: 30px;
    font-size: 20px;
  }
  .el-button+.el-button {
    margin-left: 20px;
  }
</style>
