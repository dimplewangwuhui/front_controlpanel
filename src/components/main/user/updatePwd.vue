<template>
  <div class="updatePwd">
    <el-form :model="form" ref="form" :rules="Rules" status-icon label-width="130px" class="updatePwd-form">
      <el-form-item label="旧密码" prop="userPwd">
        <el-input v-model="form.userPwd" show-password placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newUserPwd">
        <el-input v-model="form.newUserPwd" show-password placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="reNewUserPwd">
        <el-input v-model="form.reNewUserPwd" show-password placeholder="请确认新密码"></el-input>
      </el-form-item>
      <div v-if="errorInfo">
        <span class="errInfo">{{errInfo}}</span>
      </div>
      <el-form-item label="">
        <el-button type="primary" @click="submitForm('form')" style="width: 100%">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "updatePwd",
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
        form: {
          userPwd:'',
          newUserPwd:'',
          reNewUserPwd:'',
          errorInfo:'false',
        },
        Rules:{
          userPwd:[
            { required:true, message:'请输入旧密码', trigger:'blur'}
          ],
          newUserPwd: [
            { required:true, validator: newUserPwd, trigger: 'blur' },
            { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/, message: '密码为6-16位字符，且必须包含大写字母、小写字母和数字,不能包含特殊字符' }
          ],
          reNewUserPwd: [
            { required:true, validator: reNewUserPwd, trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'put',
              url: 'http://127.0.0.1:5000/updatePwd',
              data: {
                'username': sessionStorage.getItem('ms_username'),
                'userpwd': this.form.userPwd,
                'newUserPwd': this.form.newUserPwd,
                'reNewUserPwd': this.form.reNewUserPwd,
              }
            }).then(response => {
              console.log(response);
              if (response.data.code === 'success') {
                sessionStorage.clear();
                this.$router.push('/updatePwd2login');
                console.log('密码修改成功');

              } else {
                this.$notify.error({
                  title: 'Error',
                  message: response.data.msg
                });
              }
            }).catch(err => {
              this.$notify.error({
                title: 'Error',
                message: '修改失败'
              });
              console.log('修改失败');
              console.log(err);
            })
          } else {
            console.log('用户信息错误');
            return false
          }
        })
      },
    },
  }
</script>

<style scoped>
  .updatePwd {
    padding: 50px 30%;
  }
  .el-form-item {
    margin-bottom: 30px;
  }
</style>
