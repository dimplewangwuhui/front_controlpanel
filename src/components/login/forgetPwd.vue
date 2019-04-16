<template>
  <div class="forgetPwd">
    <div class="top">
      <a href="/main" style="margin-left: 75px; color: #409EFF"><i class="iconfont icon-fangzi01-copy"></i></a>
      <span style="margin-left: 5px;">租房信息分析平台</span>
    </div>
    <div class="bottom">
      <el-card class="box-card">
        <div slot="header" class="header">
          <span>忘记密码</span>
          <el-button style="float: right; padding: 3px 30px" type="text" @click="goLogin">
            <i class="iconfont icon-fanhui"></i>返回登录页
          </el-button>
        </div>
        <div class="footer">
          <el-steps :active="active">
            <el-step title="验证账号"></el-step>
            <el-step title="重置密码"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
          <div class="validate" v-if="active === 0">
            <el-form status-icon :model="phoneRuleForm" :rules="phoneRules" ref="phoneRuleForm" style="margin-top: 40px;">
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
            </el-form>
          </div>
          <div class="resetPwd" v-if="active === 1">
            <el-form :model="form" ref="form" :rules="Rules" status-icon class="updatePwd-form" style="margin-top: 40px;">
              <el-form-item prop="newUserPwd">
                <el-input v-model="form.newUserPwd" show-password placeholder="请输入新密码">
                  <template slot="prepend"><i class="iconfont icon-icon-"></i></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="reNewUserPwd">
                <el-input v-model="form.reNewUserPwd" show-password placeholder="请确认新密码">
                  <template slot="prepend"><i class="iconfont icon-icon-"></i></template>
                </el-input>
              </el-form-item>
              <div v-if="form.errorInfo">
                <span class="errInfo">{{errInfo}}</span>
              </div>
            </el-form>
          </div>
          <div class="finish" v-if="active === 2">
            <span style="font-size: 30px; color: #409EFF">恭喜您，新密码设置成功，点击按钮去登录吧</span>
            <el-button @click="goLogin" style="margin-top: 20px">前往登录页</el-button>
          </div>
          <el-button style="margin-top: 20px;" @click="prev" v-if="active === 1 || active === 2">上一步</el-button>
          <el-button style="margin-top: 20px;" @click="next" v-if="active === 0 || active === 1">下一步</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "forgetPwd",
    data(){
      let newUserPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.reNewUserPwd !== '') {
            this.$refs.form.validateField('reNewUserPwd');
          }
          callback();
        }
      };
      let reNewUserPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.newUserPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        active: 0,
        timer:null,
        url:'/apis/',
        isSend:true,
        phone_code:'',
        phone_validate_code:'获取验证码',
        numberList:[],
        phoneRuleForm: {
          number:'',
          phone_validate:''
        },
        form: {
          newUserPwd:'',
          reNewUserPwd:'',
          errorInfo:'false',
        },

        Rules:{
          newUserPwd: [
            { required:true, validator: newUserPwd, trigger: 'blur' },
            { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/, message: '密码为6-16位字符，且必须包含大写字母、小写字母和数字,不能包含特殊字符' }
          ],
          reNewUserPwd: [
            { required:true, validator: reNewUserPwd, trigger: 'blur' },
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
      document.querySelector('body').setAttribute('style', 'background-color:#fff');
    },
    methods: {
      goLogin(){
        this.$router.push('/login');
      },
      prev() {
        if (this.active-- < 2) this.active = 0;
      },
      next() {
        console.log('当前active:', this.active);
        if (this.active === 0){
          console.log('自动生成的验证码:', this.phone_code);
          console.log('用户输入的验证码:', this.phoneRuleForm.phone_validate);
          let codestatus = this.check_phone_validate();
          if(codestatus){
            this.$axios.get('http://127.0.0.1:5000/getAllNumbers')
              .then(response => {
                console.log('全部手机号:', response.data.numbers);
                if (response.data) {
                  if (this.phoneRuleForm.number !== ''){
                    for(let number of response.data.numbers){
                      if (this.phoneRuleForm.number === number){
                        this.active++
                      }
                    }
                  }
                }
              });
          }
          else {
            this.$message.error('验证码不正确!')
          }
        }
        else if (this.active === 1){
          console.log('************************');
          this.$axios({
            method: 'put',
            url: 'http://127.0.0.1:5000/forgetPwd',
            data: {
              'number':this.ruleForm.number,
              'newUserPwd': this.form.newUserPwd,
              'reNewUserPwd': this.form.reNewUserPwd,
            }
          }).then(response => {
            console.log(response.data);
            if (response.data.code === 'success') {
              this.active++
            } else {
              this.$message.error(response.data.msg);
            }
          }).catch(err => {
            this.$message.error('密码设置失败');
            console.log('密码设置失败');
            console.log(err);
          })
        }
      },

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
        const text='验证码：'+code+'，您正在使用手机号进行登陆，该验证码仅用于身份验证，在五分钟之内有效，请勿泄露给其他人使用。'; //短信内容模板，已经在sms平台绑定此内容，所以会比普通的更快到达用户手机。
        let param = new URLSearchParams();
        param.append('Uid','运城老王');
        param.append('Key', 'd41d8cd98f00b204e981');
        param.append('smsMob',tel);
        param.append('smsText',text);
        this.$http.post(this.url,param,{
          headers:{
            'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
          },
        }).then(function (response) {
          console.log(response)}
        )
      },
    }
  }
</script>

<style scoped>
  .forgetPwd .top{
    height: 66px;
    line-height: 66px;
    width: 100%;
    text-align: left;
    font-size: 22px;
    border-bottom: 1px solid #909399;
  }
  .box-card {
    width: 60%;
    margin: 50px auto;
  }
  .box-card .header {
    text-align: left;
    font-size: 18px;
    font-weight: 700;
  }
  .box-card .footer{
    padding: 35px 200px;
  }
</style>

<style>
  .el-step__title {
    font-size: 14px;
  }
  .form-input {
    height: 36px;
  }
  .el-input-group__append, .el-input-group__prepend {
    padding: 0 0 0 10px;
  }
  .el-step__title.is-process {
    font-weight: 500;
    color: #303133;
  }
</style>
