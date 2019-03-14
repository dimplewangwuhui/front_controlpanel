<template>
  <div class="register-wrap">
    <div class="title">注册界面</div>
    <div class="register">
      <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" class="ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="userpwd">
          <el-input v-model="ruleForm.userpwd" show-password placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="reUserpwd">
          <el-input v-model="ruleForm.reUserpwd" show-password placeholder="确认密码"></el-input>
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
        <el-form-item  style="margin-top: -15px; margin-left: 230px;">
          <el-button class="goLogin" type="text" @click="goLogin">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
  import { mapMutations } from 'vuex';
  import SIdentify from './Identify.vue'
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
          validate: ''
        },
        rules:{
          username: [
            {required: true, message: '请输入账号', trigger:'blur'}
          ],
          userpwd: [
            { validator: userpwd, trigger: 'blur' }
          ],
          reUserpwd: [
            { validator: reUserpwd, trigger: 'blur' }
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
    methods: {
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
                }
              }).then(response => {
                console.log(response);
                if (response.data.code == 'success') {
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
            } else {
              console.log('用户信息错误');
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
    }
  }
</script>

<style scoped>
  .register-wrap{
    width:100%;
    height: 100%;
  }
  .register-wrap .title{
    /*position: absolute;*/
    padding-top: 50px;
    margin-bottom: 30px;
    font-size: 30px;
    text-align: center;
    color: #fff;
  }
  .register-wrap .register{
    width: 320px;
    height: 370px;
    margin: 0 auto;
    padding: 40px;
    /*border-radius: 5px;*/
    background-color: #fff;
    box-shadow:0px 0px 20px #333333;
  }
  .ruleForm {
    margin-top: 25px;
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
</style>
