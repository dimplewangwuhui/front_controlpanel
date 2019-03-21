<template>
  <div class="userinfo_table">
    <el-table :data="tableData" border tooltip-effect="light" :highlight-current-row="true"
      :header-cell-style="{color: '#000', backgroundColor: '#F4F5F9'}"
      style="width: 405px; margin: 0 auto">
      <el-table-column prop="username" label="用户名" align="center" width="150">
      </el-table-column>
      <el-table-column prop="userpwd" label="密码" align="center" width="150">
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" size="mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑" :visible.sync="editVisible">
      <el-form :model="editForm" ref="editForm" rules="Rules" status-icon label-width="100px" label-position="right" style="margin: 0 auto">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userpwd">
          <el-input v-model="editForm.userpwd" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="reUserpwd">
          <el-input v-model="editForm.reUserpwd" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog--footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from '../../../api/api'
    export default {
      name: "userInfo",
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
          tableData: [],
          editVisible: false,
          editForm:{
            username:'',
            userpwd:'',
            reUserpwd:''
          },
          Rules:{
            // username:[{ required: true, message: '请输入用户名', trigger: 'blur' }]
            userpwd: [
              { validator: userpwd, trigger: 'blur' }
            ],
            reUserpwd: [
              { validator: reUserpwd, trigger: 'blur' }
            ],
          }
        }
      },
      created() {
        this.getUser()
      },
      methods: {
        getUser(){
          let params =  sessionStorage.getItem('ms_username');
          this.$axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/getUser/' + params,
          }).then((response) => {
            console.log(response.data);
            if(response){
              this.tableData = response.data;
            }
          }).catch((err) => {
            console.log(err);
            this.$alert('请求超时，刷新重试！')
          })
        },
        edit(row, index){
          this.editVisible = true;
          this.editForm = Object.assign({},row);
        },
        editSubmit(){
          this.$refs.editForm.validate((valid) => {
            if (valid) {
              this.$confirm('确认提交吗？', '提示', {}).then(() => {
                let params = Object.assign({}, this.editForm);
                api.user_put(params)
                  .then((response) => {
                    if(response){
                      this.$message({message: '提交成功', type: 'success'});
                      this.editVisible = false;
                      this.getUser();
                    }
                    else {
                      this.$message({message: '执行失败，请重试',type: "error"});
                    }
                  });
              }).catch((err) => {
                this.$message({message: '执行失败，请重试',type: "error"});
              });
            }
          });
        },
      }
    }
</script>

<style scoped>

</style>
