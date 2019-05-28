<template>
  <div class="userinfo_table">
    <el-form  :inline="true" ref="formSearch" :model="formSearch" class="demo-form">
      <el-form-item label="" prop="username">
        <el-input class="input-form" v-model="formSearch.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" size="small" @click="getUsers" style="height: 32px">查询</el-button>
        <el-button type="warning" size="small" plain @click="onReset">重置</el-button>
      </el-form-item>
      <hr style="height:1px;border:none;border-top:1px dashed rgba(0, 0, 0, .05);" />
      <el-form-item label="操作">
        <el-button size="small" @click="add">添加用户</el-button>
        <el-button size="small" @click="removes">批量删除</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)"
              border
              tooltip-effect="light"
              v-loading="loading"
              :highlight-current-row="true"
              :header-cell-style="{color: '#000', backgroundColor: '#DDE2EF'}"
              style="width: 100%; margin: 0 auto"
              @selection-change="handleSelectionChange">
      <el-table-column fixed="left" type="selection" align="center" width="50">
      </el-table-column>
      <el-table-column prop="id" label="ID" sortable align="center" width="60">
      </el-table-column>
      <el-table-column prop="username" label="用户名" align="center" width="150">
      </el-table-column>
      <el-table-column prop="sex" label="性别" align="center" width="150"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center" width="160"></el-table-column>
      <el-table-column prop="number" label="手机号" align="center" width="150"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" size="mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index)"></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" size="mini"  style="cursor: pointer;" @click="remove(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagelist" style="margin-top: 20px; margin-bottom: 50px; text-align: center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="pageIndex"
        :page-sizes="[5,10,15,20]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>

    <el-dialog title="编辑" :visible.sync="editVisible">
      <el-form :model="editForm" ref="editForm" rules="Rules" status-icon label-width="100px" label-position="right" style="margin: 0 auto">
        <el-form-item label="用户名:" prop="username">
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
    <el-dialog title="添加" :visible.sync="addVisible">
      <el-form :model="addForm" :rules="Rules" ref="addForm" status-icon label-width="130px" label-position="right" style="margin: 0 auto;">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="addForm.username" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="userpwd">
          <el-input v-model="addForm.userpwd" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import api from '../../../api/api'
  export default {
    name: "userManage",
    data(){
      return{
        tableData: [],
        pageIndex: 1,
        pageSize: 5,
        total: 0,
        currentId:'',
        loading: true,
        multipleSelection: [], // 当前页选中的行

        formSearch:{
          username:'',
        },
        editVisible: false,
        editForm:{
          username:'',
          sex:'',
          age:'',
          email:'',
          number:''
        },
        addVisible: false,
        addForm:{
          username: '',
          userpwd: '',
          number:''
        },

        Rules:{
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          userpwd:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/, message: '密码为6-16位字符，且必须包含大写字母、小写字母和数字,不能包含特殊字符' }
          ],
          number:[
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getUsers()
    },
    methods: {
      getUsers(){
        let params = Object.assign({}, this.formSearch);
        let data = new URLSearchParams();
        for (let key in params) {
          data.append(key, params[key]);
        }
        api.users_get(data)
          .then((response) => {
            console.log(response.data);
            if(response){
              this.tableData = response.data;
              this.total = this.tableData.length;
              this.loading = false;
            }
          }).catch((err) => {
            console.log(err);
            this.$alert('请求超时，刷新重试！')
          })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        if (this.pageSize !== val) {
          this.pageSize = val;
          this.getUsers();
        }
      },
      handleCurrentChange(val) {
        if (this.pageIndex !== val) {
          this.pageIndex = val;
          this.getUsers();
        }
      },
      onReset(){
        this.$refs['formSearch'].resetFields();
      },
      edit(row, index){
        if(sessionStorage.getItem('ms_username') === 'admin'){
          this.currentId = row.id;
          this.editVisible = true;
          this.editForm = Object.assign({},row);
        }
        else {
          this.$message({message: '您不是管理员,没有修改权限', type: 'warning'});
        }
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
                    this.getUsers();
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
      //添加
      add(){
        if(sessionStorage.getItem('ms_username') === 'admin'){
          this.addVisible = true;
        }
        else {
          this.$message({message: '您不是管理员,没有添加权限', type: 'warning'});
        }
      },
      //添加提交
      addSubmit(){
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let params = Object.assign({}, this.addForm);
              console.log(params);
              this.$axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/register',
                data: params
              }).then((response) => {
                if (response.data.code == 'success') {
                  this.$message({message: '添加成功', type: 'success'});
                  this.$refs.addForm.resetFields();
                  this.addVisible = false;
                  this.loading = false;
                  this.getUsers();
                } else {
                  this.$notify.error({
                    title: 'Error',
                    message: response.data.msg
                  });
                }
              }).catch((err) => {
                this.$message({message: '执行失败，请重试',type: "error"});
                this.loading = false;
              });
            });
          }
        });
      },
      //删除
      remove(row) {
        if(sessionStorage.getItem('ms_username') === 'admin'){
          this.$confirm('是否执行删除操作?', '提示',{
            type: 'warning'
          }).then(() => {
            this.loading = true;
            api.users_remove(row).then(res => {
              if(res.code === 'success'){
                this.$message.success(res.msg);
                this.loading = false;
                this.getUsers();
              }else {
                this.$message.error(res.msg);
                this.loading = false;
              }
            }).catch((res) => {
              this.$message.error('删除失败!');
              this.loading = false;
            });
          }).catch(() => {
            this.$message.info('已取消操作!');
            this.loading = false;
          });
        }
        else {
          this.$message({message: '您不是管理员,没有删除权限', type: 'warning'});
        }
      },
      //批量删除
      removes(){
        if(sessionStorage.getItem('ms_username') === 'admin'){
          let ids= this.multipleSelection.map(item => item.id);
          console.log(ids);
          if (ids.length === 0){
            this.$message({message: '请选择要删除的项',type: "warning"});
            return;
          }
          this.$confirm('确认删除选中的记录吗？', '提示', {
            type: 'warning'
          }).then(() => {
            this.loading = true;
            api.users_removes(ids)
              .then((response) => {
                if(response.code === 'success'){
                  this.$message.success(response.msg);
                  this.loading = false;
                  this.getUsers();
                }else {
                  this.$message.error(response.msg);
                  this.loading = false
                }
              }).catch((err)=>{
              this.$message({message: '执行失败，请重试',type: "error"});
              this.loading = false;
              console.log(err)
            });
          }).catch(() => {
            this.$message({type: 'info',message: '删除失败'});
            this.loading = false
          });
        }
        else {
          this.$message({message: '您不是管理员,没有批量删除权限', type: 'warning'});
        }
      },
    }
  }
</script>

<style>
  .demo-form{
    text-align: left;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    padding: 10px 10px 0 10px;
    margin-bottom: 20px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .input-form{
    width: 300px;
  }
  .el-input__inner{
    height: 32px;
    line-height: 32px;
  }
</style>

