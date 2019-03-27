<template>
    <div class="login-wrap">
      <div class="title">登录界面</div>
      <el-tabs class="tabs" type="border-card">
        <el-tab-pane class="tabpane" label="账号登录">
          <div class="login">
            <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" class="ruleForm">
              <el-form-item prop="username">
                <el-input class="form-input" v-model="ruleForm.username" placeholder="账号">
                  <template slot="prepend"><i class="iconfont icon-yonghu1"></i></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="userpwd">
                <el-input class="form-input" v-model="ruleForm.userpwd" show-password placeholder="请输入密码">
                  <template slot="prepend"><i class="iconfont icon-icon-"></i></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="validate">
                <el-input v-model="ruleForm.validate" class="validate-code" placeholder="验证码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                <div class="code" @click="refreshCode">
                  <s-identify :identify-code="identifyCode"></s-identify>
                </div>
              </el-form-item>
              <div v-if="errorInfo">
                <span>{{errInfo}}</span>
              </div>
              <el-form-item class="button">
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              </el-form-item>
              <el-form-item  style="margin-top: -25px; margin-left: 244px;">
                <el-button class="goRegister" type="text" @click="goRegister">立即注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="人脸登录">
          <div class="face_login" style="margin: 15px auto;">
            <div class="top">
              <video id="video" autoplay="" style="width: 50%; border: 1px dashed #409EFF; border-radius: 12px; float: left"></video>
              <canvas id="canvas" style="width:25%; height: 169.5px; border: 1px dashed #409EFF; border-radius: 12px; margin-left: 15px; float: left"></canvas>
              <div id="result" style="width: 20%; height: 169.5px; border-radius: 12px; float: right; background-color: #409EFF; color: white;">
                <ul style="list-style: none; padding: 0 20px; text-align: left; font-size: 0.9em;">
                  <li id="age" style="border-bottom: 1px solid #4093e5; line-height:30px">年龄：32</li>
                  <li id="gender" style="border-bottom: 1px solid #4093e5; line-height:30px">性别：男</li>
                  <li id="expression" style="border-bottom: 1px solid #4093e5; line-height:30px">表情：微笑</li>
                  <li id="glasses" style="border-bottom: 1px solid #4093e5; line-height:30px">眼镜：带眼镜</li>
                  <li id="beauty" style="border-bottom: 1px solid #4093e5; line-height:30px">颜值：88</li>
                </ul>
              </div>
            </div>
            <div class="bottom">
              <el-button type="primary" style="float: left">获取脸部特征</el-button>
              <el-button type="primary">登录</el-button>
              <el-button type="primary" @click="goRegister">立即注册</el-button>
            </div>

            <div style="margin: 0 auto">
              <audio id="myaudio" controls style="margin-top: 10px; height: 80px">
                您的浏览器不支持audio元素组件
              </audio>
            </div>

          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    import SIdentify from './Identify.vue'
    import '../../assets/scripts/video_to_base64.js'

    export default {
      name: "login",
      data(){
        var userpwd = (rule, value, callback) => {
          if(!value){
            callback(new Error('请输入密码'));
          }else if(value.length < 4){
            callback(new Error('密码不能小于4位'));
          }else {
            callback();
          }
        };
        return{
          identifyCodes: "1234567890",
          identifyCode: "",
          userToken: "",
          errorInfo : false,
          ruleForm: {
            username: '',
            userpwd: '',
            validate: ''
          },
          rules:{
            username: [
              {required: true, message: '请输入账号', trigger:'blur'}
            ],
            userpwd: [
              {validator: userpwd, trigger: 'blur'}
            ],
            validate: [
              {required: true, message: '请输入验证码', trigger:'blur'},
            ]
          }
        }
      },
      mounted() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
        document.querySelector('body').setAttribute('style', 'background-color:#2d3a4b');
      },
      methods:{
        //点击登录
        ...mapMutations(['set_token']),
        submitForm (formName) {
          let codestatus = this.checkCode();
          if (codestatus) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$axios({
                  method: 'post',
                  url: 'http://127.0.0.1:5000/loginValidate',
                  data: {
                    'username': this.ruleForm.username,
                    'userpwd': this.ruleForm.userpwd,
                  },
                  headers:{
                    "Authorization": ""
                  }
                }).then(response => {
                  console.log(response);
                  if (response.data.code == 'success') {
                    sessionStorage.setItem('ms_username', this.ruleForm.username);
                    this.userToken= response.data.token;
                    console.log('获取到的token:'+this.userToken);  //根据api接口获取token
                    this.set_token({ token: this.userToken });  //将token存储到store里
                    this.$router.push('/main');
                  } else {
                    this.$notify.error({
                      title: 'Error',
                      message: response.data.msg
                    });
                  }
                }).catch(err => {
                  this.$notify.error({
                    title: 'Error',
                    message: '登陆失败'
                  });
                  console.log('登录失败');
                  console.log(err);
                })
              } else {
                console.log('用户信息错误');
                return false
              }
            })
          }
        },
        //立即注册
        goRegister () {
          this.$router.push('/register')
        },
        //返回首页
        goHomePage(){
          this.$router.push('/homepage')
        },

        //检验验证码
        checkCode () {
          let vcode = this.ruleForm.validate;  //用户输入的验证码
          let ccode = this.identifyCode;  //自动生成的验证码
          if (vcode !== ccode) {
            this.$message.error('验证码不正确!');
            this.$set(this.ruleForm, 'validate', '');
            this.$set(this.ruleForm, 'password', '')
          } else {
            return 1
          }
        },
        // 点击刷新验证码
        refreshCode() {
          this.identifyCode = "";
          this.makeCode(this.identifyCodes, 4);
        },
        // 生成四位随机验证码
        makeCode(o, l) {
          for (let i = 0; i < l; i++) {
            this.identifyCode += this.identifyCodes[
              this.randomNum(0, this.identifyCodes.length)
              ];
          }
          console.log('验证码:'+this.identifyCode);
        },
        // 生成随机数
        randomNum(min, max) {
          return Math.floor(Math.random() * (max - min) + min);
        }
      },

      created() {
        // 使用video_to_base64.js中的call_camera()函数启动摄像头
        call_camera();
        // 创建一个Canvas对象
        var context = canvas.getContext('2d');


      }
    }
</script>

<style scoped>
    .tabs{
      width: 700px;
      height: 450px;
      margin: 0 auto;
    }
    .el-form-item {
      margin-bottom: 30px;
    }
    .login-wrap{
      /*position: relative;*/
      width:100%;
      height: 100%;
      /*background: url(../../assets/img/bg.jpg) no-repeat center center;*/
      /*background-size: 100% 100%;*/
    }
    .login-wrap .title{
      /*position: absolute;*/
      padding-top: 50px;
      margin-bottom: 30px;
      font-size: 30px;
      text-align: center;
      color: #fff;
    }
    .login-wrap .login{
      width: 300px;
      margin: 60px auto;
      /*padding: 40px;*/
      border-radius: 5px;
      background-color: #fff;
      /*box-shadow:0px 0px 10px #333333;*/
    }
    .login span {
      font-size: 5px;
      color: red;
    }
    .button button{
      width:100%;
      height:36px;
    }
    .validate-code {
      width: 136px;
      float: left;
    }
    .code {
      width: 112px;
      height: 35px;
      border: 1px solid #ccc;
      float: right;
      border-radius: 2px;
    }
    .goRegister :hover{
      color: #409EFF;
    }
    .el-input__inner {
      height: 40px;
      line-height: 40px;
    }
</style>

<style>
  .form-input {
    height: 36px;
  }
  .el-input-group__append, .el-input-group__prepend {
    padding: 0 0 0 10px;
  }
</style>


