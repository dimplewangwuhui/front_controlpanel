<template>
  <div class="userinfo_table">
    <el-table :data="tableData"
              border
              tooltip-effect="light"
              :highlight-current-row="true"
              :header-cell-style="{color: '#000', backgroundColor: '#DDE2EF'}"
              style="width: 975px; margin: 10px auto">
      <el-table-column fixed="left" type="selection" align="center" width="50"></el-table-column>
      <el-table-column prop="id" label="ID" align="center" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" align="center" width="150"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center" width="150"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center" width="160"></el-table-column>
      <el-table-column prop="number" label="手机号" align="center" width="150"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="primary" size="small" style="cursor: pointer;" @click="edit(scope.row,scope.$index)">完善信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑个人信息" :visible.sync="editVisible">
      <el-form :model="editForm" ref="editForm" :rules="Rules" status-icon label-width="100px" label-position="right" style="margin: 0 auto">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="editForm.username" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="editForm.sex" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="editForm.age" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="number">
          <el-input v-model="editForm.number" style="width: 80%"></el-input>
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
        return{
          tableData: [],
          editVisible: false,
          currentId:'',
          editForm:{
            username:'',
            sex:'',
            age:'',
            email:'',
            number:''
          },
          Rules:{
            username:[
              { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            number:[
              { required: true, message: '请输入手机号', trigger: 'blur' }
            ]
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
          this.currentId = row.id;
          this.editVisible = true;
          this.editForm = Object.assign({},row);
        },
        editSubmit(){
          this.$refs.editForm.validate((valid) => {
            if (valid) {
              this.$confirm('确认提交吗？', '提示', {}).then(() => {
                let params = Object.assign({}, this.editForm);
                api.users_put(this.currentId, params)
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
