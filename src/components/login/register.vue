<template>
  <div class="register-wrap">
    <div class="registerTop">
      <a href="/homePage" style="margin-left: 75px;color: #409EFF"><i class="iconfont icon-fangzi01-copy"></i></a>
      <span style="margin-left: 5px;">租房信息分析平台</span>
    </div>
    <el-tabs class="tabs" type="border-card"  @tab-click="handleTabChange">
      <el-tab-pane class="tabpane" label="账号注册">
        <div class="register">
          <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" class="ruleForm">
            <el-form-item prop="username">
              <el-input class="form-input" v-model="ruleForm.username" placeholder="账号">
                <template slot="prepend"><i class="iconfont icon-yonghu1"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="userpwd">
              <el-input class="form-input" v-model="ruleForm.userpwd" show-password placeholder="密码">
                <template slot="prepend"><i class="iconfont icon-icon-"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="reUserpwd">
              <el-input class="form-input" v-model="ruleForm.reUserpwd" show-password placeholder="确认密码">
                <template slot="prepend"><i class="iconfont icon-icon-"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="number">
              <el-input class="form-input" v-model="ruleForm.number"  placeholder="手机号">
                <template slot="prepend"><i class="iconfont icon-shouji"></i></template>
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
              <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            </el-form-item>
            <el-form-item  style="margin-top: -20px; margin-left: 198px;">
              <el-button class="goLogin" type="text" @click="goLogin">已有账号?&nbsp;立即登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane class="tabpane" label="人脸注册">
        <div class="face_register" style="margin: 15px auto; width: 302px">
          <div class="top" style="width: 100%; height: 220px">
            <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" class="ruleForm">
              <el-form-item prop="username">
                <el-input class="form-input" v-model="ruleForm.username" placeholder="账号" style="width: 300px; margin-bottom: 5px">
                  <template slot="prepend"><i class="iconfont icon-yonghu1"></i></template>
                </el-input>
              </el-form-item>
            </el-form>
            <video id="video" autoplay="" style="width: 300px;height: 200px; border: 1px dashed #409EFF; border-radius: 12px"></video>
            <canvas id="canvas" style="width: 0; height: 0"></canvas>
          </div>
          <div class="bottom" style="margin-top: 80px">
            <el-button class="buttton" type="primary" @click="faceRegister">注册</el-button>
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
    name: "register",
    data(){
      let userpwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.reUserpwd !== '') {
            this.$refs.ruleForm.validateField('reUserpwd');
          }
          callback();
        }
      };
      let reUserpwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.userpwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return{
        identifyCodes: "1234567890",
        identifyCode: "",
        errorInfo : false,
        ruleForm: {
          username: '',
          userpwd: '',
          reUserpwd: '',
          number:'',
          validate: ''
        },
        rules:{
          username: [
            {required: true, message: '请输入账号', trigger:'blur'},
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          userpwd: [
            { validator: userpwd, trigger: 'blur' },
            { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/, message: '密码为6-16位字符，且必须包含大写字母、小写字母和数字,不能包含特殊字符' }
          ],
          reUserpwd: [
            { validator: reUserpwd, trigger: 'blur' },
          ],
          number: [
            {required: true, message: '请输入手机号码', trigger:'blur'},
            { pattern: /^1[34578]\d{9}$/, message: '请输入合法的手机号码' }
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
      // document.querySelector('body').setAttribute('style', 'background-color:#2d3a4b');
    },
    methods: {
      handleTabChange: function (tab, event) {
        let tabId = event.target.getAttribute('id');
        console.log('当前tab:', tabId);  //获取到当前元素的id（0,1,2）
        if(tabId === 'tab-1'){
          call_camera();
        }
      },

      submitForm (formName) {
        let codestatus = this.checkCode();
        if (codestatus) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/register',
                data: {
                  'username': this.ruleForm.username,
                  'userpwd': this.ruleForm.userpwd,
                  'number':this.ruleForm.number
                }
              }).then(response => {
                console.log(response);
                if (response.data.code === 'success') {
                  sessionStorage.clear();
                  this.$router.push('/register2login');
                  console.log('注册成功');
                } else {
                  this.$notify.error({
                    title: 'Error',
                    message: response.data.msg
                  });
                  this.$set(this.ruleForm, 'validate', '');
                  this.$set(this.ruleForm, 'userpwd', '');
                  this.$set(this.ruleForm, 'reUserpwd', '');
                  this.refreshCode();
                }
              }).catch(err => {
                this.$notify.error({
                  title: 'Error',
                  message: '注册失败'
                });
                console.log('注册失败');
                console.log(err);
                this.$set(this.ruleForm, 'validate', '');
                this.$set(this.ruleForm, 'userpwd', '');
                this.$set(this.ruleForm, 'reUserpwd', '');
                this.refreshCode();
              })
            } else {
              console.log('用户信息错误');
              this.$set(this.ruleForm, 'validate', '');
              this.$set(this.ruleForm, 'userpwd', '');
              this.$set(this.ruleForm, 'reUserpwd', '');
              this.refreshCode();
              return false
            }
          })
        }
      },
      goLogin () {
        this.$router.push('/login')
      },
      //返回首页
      goHomePage(){
        this.$router.push('/homepage')
      },

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

      face_register(){
        // 获取canva容器组件中的图片数据信息
        let imageData = document.getElementById('canvas').toDataURL();
        // 截取掉前22位头部信息数据（保留图片的Base64编码数据部分）
        let imgData = imageData.substring(22);
        // 将数据转换成json数据格式
        let data = {'username': this.ruleForm.username, 'face_img':imgData};
        this.$axios({
          method: 'post',
          url: 'http://127.0.0.1:5000/faceRegister',
          data: data
        }).then(response => {
          console.log('=========================================', response.data);
          if (response.data.code === 'success') {
            sessionStorage.clear();
            this.$router.push('/register2login');
            console.log('注册成功');
          } else {
            this.$notify.error({
              title: 'Error',
              message: response.data.msg
            });
          }
        }).catch(err => {
          this.$notify.error({
            title: 'Error',
            message: '注册失败'
          });
          console.log('注册失败');
          console.log(err);
        })
      },
      // 人脸注册
      faceRegister(){
        let context = canvas.getContext('2d');
        // 在canvas中生成静态人脸图片
        context.drawImage(video,0,0,302,150);
        // 调用上传数据的函数
        this.face_register();
      }
    }
  }
</script>

<style scoped>
  .registerTop{
    background-color: rgba(255, 255, 255);
    height: 66px;
    line-height: 66px;
    width: 100%;
    text-align: left;
    font-size: 22px;
    border-bottom: 1px solid #909399;
  }
  .register-wrap{
    width:100%;
    height: 100%;
    background: url(../../assets/img/0008020223417643_b.jpg) no-repeat center center;
    background-size: 100%;
  }
  /*.register-wrap .title{*/
    /*padding-top: 50px;*/
    /*margin-bottom: 30px;*/
    /*font-size: 30px;*/
    /*text-align: center;*/
    /*color: #fff;*/
  /*}*/
  .tabs{
    width: 450px;
    height: 500px;
    margin: 33px auto;
  }
  .register-wrap .register{
    width: 320px;
    height: 400px;
    margin: 0 auto;
    /*border-radius: 5px;*/
    background-color: #fff;
  }
  .el-form-item {
    margin-bottom: 25px;
  }
  .ruleForm {
    margin-top: 20px;
  }
  .register span {
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
  .goLogin {
    color: #000;
  }
  .goLogin :hover{
    color: #409EFF;
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
