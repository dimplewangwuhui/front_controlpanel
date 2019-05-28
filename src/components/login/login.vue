<template>
    <div class="login-wrap">
      <div class="loginTop">
        <a href="/homePage" style="margin-left: 75px;color: #409EFF"><i class="iconfont icon-fangzi01-copy"></i></a>
        <span style="margin-left: 5px;">租房信息分析平台</span>
      </div>
      <el-tabs class="tabs" type="border-card" @tab-click="handleTabChange">
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
              <el-form-item  style="margin-top: -25px;">
                <el-button class="forgetPwd" type="text" @click="forgetPwd" style="float: left">忘记密码?</el-button>
                <el-button class="goRegister" type="text" @click="goRegister" style="float: right">没有账号?&nbsp;立即注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="手机登录">
          <div class="phone_login">
            <el-form status-icon :model="phoneRuleForm" :rules="phoneRules" ref="phoneRuleForm" class="ruleForm">
              <el-form-item prop="number">
                <el-input class="form-input" v-model="phoneRuleForm.number" placeholder="请输入手机号">
                  <template slot="prepend"><i class="iconfont icon-shouji"></i></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="phone_validate">
                <el-input class="form-input" v-model="phoneRuleForm.phone_validate" placeholder="请输入验证码">
                  <template slot="prepend"><i class="iconfont icon-yanzhengma"></i></template>
                  <el-button slot="append" @disabled="isSend" @click="send_code">{{phone_validate_code}}</el-button>
                </el-input>
              </el-form-item>
              <div v-if="errorInfo">
                <span>{{errInfo}}</span>
              </div>
              <el-form-item class="button">
                <el-button type="primary" @click="phoneLogin('phoneRuleForm')">登录</el-button>
              </el-form-item>
              <el-form-item  style="margin-top: -25px; margin-left: 244px;">
                <el-button class="goRegister" type="text" @click="goRegister">立即注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="人脸登录">
          <div class="face_login" style="margin: 15px auto;">
            <div class="top" style="width: 100%; height: 220px">
              <video id="video" autoplay="" style="width: 300px; border: 1px dashed #409EFF; border-radius: 12px"></video>
              <canvas id="canvas" style="width: 0; height: 0"></canvas>
            </div>
            <div class="bottom" style="margin-top: 10px">
              <!--<el-button type="primary" @click="getfeatures">获取脸部特征</el-button>-->
              <el-button class="buttton" type="primary" @click="faceLogin">登录</el-button>
              <!--<el-button type="primary" @click="goRegister">立即注册</el-button>-->
            </div>

            <div style="margin: 0 auto">
              <!--1、 controls="controls" 表示在页面上显示：开始/暂停 的控制按钮。-->
              <!--2、 autoplay="true" 表示打开网页时，自动播放。-->
              <!--3、 .volume=0.06 控制音量大小，下面的代码控制自动播放时，将音量调的很小。-->
              <audio id="myaudio" controls autoplay src="" style="margin-top: 10px; height: 80px">
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
    import { call_camera } from '../../assets/scripts/video_to_base64.js'

    export default {
      name: "login",
      data(){
        var userpwd = (rule, value, callback) => {
          if(!value){
            callback(new Error('请输入密码'));
          }else if(value.length < 6){
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
          timer:null,
          url:'/apis/',
          isSend:true,
          phone_code:'',
          phone_validate_code:'获取验证码',

          ruleForm: {
            username: '',
            userpwd: '',
            validate: ''
          },
          phoneRuleForm: {
            number:'',
            phone_validate:''
          },
          rules:{
            username: [
              {required: true, message: '请输入账号', trigger:'blur'},
              { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
            ],
            userpwd: [
              {required: true, message: '请输入密码', trigger:'blur'},
              { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
            ],
            validate: [
              {required: true, message: '请输入验证码', trigger:'blur'},
            ]
          },
          phoneRules: {
            number: [
              {required: true, message: '请输入手机号码', trigger:'blur'},
              { pattern: /^1[34578]\d{9}$/, message: '请输入合法的手机号码' }
            ],
            phone_validate: [
              {required: true, message: '请输入手机验证码', trigger:'blur'},
            ]
          }
        }
      },
      mounted() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
        // document.querySelector('body').setAttribute('style', 'background-color:#2d3a4b');
      },
      methods:{
        handleTabChange: function (tab, event) {
          // console.log(event);
          let tabId = event.target.getAttribute('id');
          console.log('当前tab:', tabId);  //获取到当前元素的id（0,1,2）
          if(tabId === 'tab-2'){
            call_camera();
          }
          // return tabId
        },

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
                  if (response.data.code === 'success') {
                    sessionStorage.setItem('ms_username', this.ruleForm.username);
                    this.userToken= response.data.token;
                    console.log('获取到的token:'+this.userToken);  //根据api接口获取token
                    this.set_token({ token: this.userToken });  //将token存储到store里
                    this.$router.push('/firstPage');
                  } else {
                    this.$notify.error({
                      title: 'Error',
                      message: response.data.msg
                    });
                    this.$set(this.ruleForm, 'validate', '');
                    this.$set(this.ruleForm, 'userpwd', '');
                    this.refreshCode();
                  }
                }).catch(err => {
                  this.$notify.error({
                    title: 'Error',
                    message: '登陆失败'
                  });
                  console.log('登录失败');
                  console.log(err);
                  this.$set(this.ruleForm, 'validate', '');
                  this.$set(this.ruleForm, 'userpwd', '');
                  this.refreshCode();
                })
              } else {
                console.log('用户信息错误');
                this.$set(this.ruleForm, 'validate', '');
                this.$set(this.ruleForm, 'userpwd', '');
                this.refreshCode();
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
        //忘记密码
        forgetPwd(){
          this.$router.push('/forgetPwd')
        },

        //检验验证码
        checkCode () {
          let vcode = this.ruleForm.validate;  //用户输入的验证码
          let ccode = this.identifyCode;  //自动生成的验证码
          if (vcode !== ccode) {
            this.$message.error('验证码不正确!');
            this.$set(this.ruleForm, 'validate', '');
            this.$set(this.ruleForm, 'userpwd', '');
            this.refreshCode();
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
        },

        //手机发送随机验证码
        send_code(){
          if(this.phoneRuleForm.number === '')
          {
            this.$notify.error({
              title: 'Error',
              message: '电话号码不能为空'
            });
          }
          else if(!(/^1[34578]\d{9}$/.test(this.phoneRuleForm.number)))
          {
            this.$notify.error({
              title: 'Error',
              message: '请输入合法的电话号码'
            });
          }
          else {
            const count = 60;
            let times = 60;
            if (!this.timer)
            {
              this.isSend = false;//按钮禁用
              this.phone_code = this.random_code();//调用随机生成随机验证码的方法
              this.send_note(this.phoneRuleForm.number, this.phone_code);//调用发送短信的方法
              this.timer = setInterval(()=> //倒计时;
              {
                if(times>0 && times<= count)
                {
                  this.phone_validate_code = times-- + 's后重新发送'
                }
                else
                {
                  this.isSend = true;//按钮可用
                  this.phone_validate_code = '获取验证码';
                  clearInterval(this.timer);
                  this.timer = null;
                }
              },1000);
            }
          }
        },
        //生成随机6位手机验证码
        random_code(){
          let code="";
          let code_lenght=6;
          let random= new Array(0,1,2,3,4,5,6,7,8,9);
          for(let i=0;i<code_lenght;i++)//随机生成6位验证码
          {
            let index=Math.floor(Math.random()*10);
            code+=random[index]
          }
          return code
        },
        //检验手机验证码
        check_phone_validate () {
          let vcode = this.phoneRuleForm.phone_validate;  //用户输入的验证码
          let ccode = this.phone_code;  //自动生成的验证码
          if (vcode !== ccode) {
            this.$message.error('验证码不正确!');
          } else {
            return 1
          }
        },
        //发送短信模板
        send_note(tel,code){
          // const text='验证码：'+code+'，您正在使用手机号进行登陆，该验证码仅用于身份验证，在五分钟之内有效，请勿泄露给其他人使用。'; //短信内容模板，已经在sms平台绑定此内容，所以会比普通的更快到达用户手机。
          // let param = new URLSearchParams();
          // param.append('Uid','Dimple老王');
          // param.append('Key', 'd41d8cd98f00b204e980');
          // param.append('smsMob',tel);
          // param.append('smsText',text);
          // console.log(param);

          // 云之讯短信API
          let param = {
            "sid":"d0403809897d8a09b0cb77e2eaa30bcb",
            "token":"97cbcd80d6ed7d3ba90ab972a9cb7e43",
            "appid":"d4599eca5f6c4cb7941ec11d600cf838",
            "templateid":"469825",
            "param": code,
            "mobile": tel,
            "uid":""
          };
          console.log(param);
          this.$http.post(this.url,param,{
            headers:{
              'Content-Type':'application/json'
            },
          }).then(function (response) {
            console.log('=====', response)}
          ).catch(e => {
            console.log('-----', e)
          })
        },
        phoneLogin(formName){
          console.log('自动生成的验证码:', this.phone_code);
          console.log('用户输入的验证码:', this.phoneRuleForm.phone_validate);
          let codestatus = this.check_phone_validate();
          if (codestatus) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$axios({
                  method: 'post',
                  url: 'http://127.0.0.1:5000/phoneLogin',
                  data: {
                    'number': this.phoneRuleForm.number,
                  },
                  headers:{
                    "Authorization": ""
                  }
                }).then(response => {
                  console.log(response);
                  if (response.data.code === 'success') {
                    sessionStorage.setItem('ms_username', this.phoneRuleForm.number);
                    this.userToken= response.data.token;
                    console.log('获取到的token:'+this.userToken);  //根据api接口获取token
                    this.set_token({ token: this.userToken });  //将token存储到store里
                    this.$router.push('/firstPage');
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





        create_img(){
          // 获取canva容器组件中的图片数据信息
          let imageData = document.getElementById('canvas').toDataURL();
          // 截取掉前22位头部信息数据（保留图片的Base64编码数据部分）
          let imgData = imageData.substring(22);
          // 将数据转换成json数据格式
          let data = {'face_img':imgData};
          this.$axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/commitImageData',
            data: data
          }).then((response) => {
            if(response){
              console.log('===============================', response.data);
              if(response.data['error_code'] === 'face_detect_failed')
                return false;
              // 解析人脸特征值数据
              // 年龄
              let age = Math.ceil(parseFloat(response.data['age']));
              // 性别
              let gender = (response.data['gender'] === "male")?"男":"女";
              // 表情
              let expression = response.data['expression'];
              let expression_res;
              if(expression === 'none'){
                expression_res = "不笑";
              }else if(expression === 1){
                expression_res = "微笑";
              }else{
                expression_res = "大笑";
              }
              // 眼镜
              let glasses = response.data['glasses'];
              let glasses_res;
              if(glasses === 'none'){
                glasses_res = "无眼镜";
              }else if(glasses === 'common'){
                glasses_res = "有眼镜";
              }else{
                glasses_res = "带墨镜";
              }
              // 颜值
              let beauty = parseFloat(response.data['beauty']).toFixed(2);
            }
          }).catch(err=>{
            console.log('获取人脸特征失败');
            console.log(err);
          })
        },
        face_login(){
          // 获取canva容器组件中的图片数据信息
          let imageData = document.getElementById('canvas').toDataURL();
          // 截取掉前22位头部信息数据（保留图片的Base64编码数据部分）
          let imgData = imageData.substring(22);
          // 将数据转换成json数据格式
          let data = {'face_img':imgData};
          this.$axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/faceLogin',
            data: data
          }).then(response => {
            console.log('=========================================', response.data);
            if (response.data.code === 'success') {
              sessionStorage.setItem('ms_username', response.data.username);
              this.userToken= response.data.token;
              console.log('获取到的token:'+this.userToken);  //根据api接口获取token
              this.set_token({ token: this.userToken });  //将token存储到store里
              this.$router.push('/firstPage');
            } else {
              this.$notify.error({
                title: 'Error',
                message: '登陆失败'
              });
            }
          }).catch(err => {
            this.$notify.error({
              title: 'Error',
              message: '登录失败'
            });
            console.log('登录失败');
            console.log(err);
          })
        },
        // 获取面部特征
        getfeatures(){
          let context = canvas.getContext('2d');
          // 在canvas中生成静态人脸图片
          context.drawImage(video,0,0,302,150);
          // 调用上传数据的函数
          this.create_img();
        },
        // 人脸登录
        faceLogin(){
          let context = canvas.getContext('2d');
          // 在canvas中生成静态人脸图片
          context.drawImage(video,0,0,302,150);
          // 调用上传数据的函数
          this.face_login();
        }

      },
    }
</script>

<style scoped>
    .loginTop{
      background-color: #fff;
      height: 66px;
      line-height: 66px;
      width: 100%;
      text-align: left;
      font-size: 22px;
      border-bottom: 1px solid #909399;
      /*opacity: 0.75;*/
    }
    .tabs{
      width: 400px;
      height: 450px;
      margin: 58px auto;
    }
    .el-form-item {
      margin-bottom: 30px;
    }
    .login-wrap{
      width:100%;
      height: 100%;
      background: url(../../assets/img/center.jpg) no-repeat center center;
      background-size: 100% 100%;
    }

    .login-wrap .login{
      width: 300px;
      margin: 60px auto;
      /*padding: 40px;*/
      border-radius: 5px;
      background-color: #fff;
      /*box-shadow:0px 0px 10px #333333;*/
    }
    .login-wrap .phone_login{
      width: 300px;
      margin: 60px auto;
      border-radius: 5px;
      background-color: #fff;
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
    .forgetPwd {
      color: #000;
    }
    .goRegister{
      color: #000;
    }
    .forgetPwd :hover{
      color: red;
    }
    .goRegister :hover{
      color: #409EFF;
    }
    .el-input__inner {
      height: 40px;
      line-height: 40px;
    }
    .bottom button{
      width:300px;
      height:36px;
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


