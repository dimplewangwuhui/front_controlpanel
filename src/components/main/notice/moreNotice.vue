<template>
  <div class="main" style="margin: 10px auto">
    <el-form  :inline="true" ref="formSearch" :model="formSearch" class="demo-form">
      <el-form-item label="" prop="title">
        <el-input class="input-form" v-model="formSearch.title" placeholder="请输入公告标题（模糊查询）"></el-input>
      </el-form-item>
      <el-form-item label="" prop="content">
        <el-input class="input-form" v-model="formSearch.content" placeholder="请输入公告内容（模糊查询）"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" size="small" @click="getNotice" style="height: 32px">查询</el-button>
        <el-button type="warning" size="small" plain @click="onReset">重置</el-button>
      </el-form-item>
      <hr style="height:1px;border:none;border-top:1px dashed rgba(0, 0, 0, .05);" />
      <el-form-item label="操作">
        <el-button size="small" @click="add">发布公告</el-button>
        <el-button size="small" @click="removes">批量删除</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData1.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)"
      ref="table"
      border
      v-loading="loading"
      element-loading-text="拼命加载中..."
      :highlight-current-row="true"
      :header-cell-style="{color: '#000', backgroundColor: '#DDE2EF'}"
      @selection-change="handleSelectionChange">
      <el-table-column fixed="left" type="selection" align="center" width="50">
      </el-table-column>
      <el-table-column prop="id" label="ID" sortable align="center" width="60">
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center" width="115">
      </el-table-column>
      <el-table-column prop="content" label="内容" align="center" width="450">
      </el-table-column>
      <el-table-column prop="date"  label="创建时间" show-overflow-tooltip align="center" width="150">
      </el-table-column>
      <el-table-column prop="update_date" label="更新时间" show-overflow-tooltip  align="center" width="150">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope" v-if= "scope.row.id">
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
      <el-form :model="editForm" :rules="Rules" ref="editForm" status-icon label-width="130px" label-position="right" style="margin: 0 auto;">
        <el-form-item label="序号:" prop="id">
          <el-input disabled v-model="editForm.id" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="标题:" prop="title">
          <el-input v-model="editForm.title" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="内容:" prop="content">
          <el-input v-model="editForm.content" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加" :visible.sync="addVisible">
      <el-form :model="addForm" :rules="Rules" ref="addForm" status-icon label-width="130px" label-position="right" style="margin: 0 auto;">
        <el-form-item label="标题:" prop="title">
          <el-input v-model="addForm.title" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="内容:" prop="content">
          <el-input v-model="addForm.content" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="标识:" prop="name">
          <el-input v-model="addForm.name" style="width: 80%"></el-input>
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
  import api from "../../../api/api";

  export default {
    name: "moreNotice",
    data() {
      return {
        tableData1: [],
        pageIndex: 1,
        pageSize: 5,
        total: 0,
        currentId:'',
        loading: true,
        usermsg:[],
        multipleSelection: [], // 当前页选中的行

        formSearch:{
          title:'',
          content:''
        },
        editVisible: false,
        editForm:{
          id:'',
          title:'',
          content:''
        },
        addVisible: false,
        addForm:{
          title:'',
          content:'',
          name:''
        },
        Rules:{
          title:[
            { required: true, message: '请输入公告标题', trigger: 'blur' }
          ],
          content:[
            { required: true, message: '请输入公告内容', trigger: 'blur' }
          ]
        },
        addRules:{
          title:[
            { required: true, message: '请输入公告标题', trigger: 'blur' }
          ],
          content:[
            { required: true, message: '请输入公告内容', trigger: 'blur' }
          ],
          name:[
            { required: true, message: '请输入公告标识', trigger: 'blur' }
          ]
        }
      }
    },

    created(){
      this.getNotice();
    },

    methods: {
      getNotice() {
        let params = Object.assign({}, this.formSearch);
        let data = new URLSearchParams();
        for (let key in params) {
          data.append(key, params[key]);
        }
        api.notice_get(data)
          .then((response) => {
            console.log(response.data);
            this.tableData1 = response.data;
            this.total = this.tableData1.length;
            this.loading = false;
          }).catch(err => {
          console.error(err);
          this.$alert('请求超时，刷新重试！')
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log('选中的项:', this.multipleSelection);
      },
      handleSizeChange(val) {
        if (this.pageSize !== val) {
          this.pageSize = val;
          this.getNotice();
        }
      },
      handleCurrentChange(val) {
        if (this.pageIndex !== val) {
          this.pageIndex = val;
          this.getNotice();
        }
      },
      onReset(){
        this.$refs['formSearch'].resetFields();
      },

      //编辑
      edit(row, index){
        if(sessionStorage.getItem('ms_username') === 'admin'){
          this.currentId = row.id;
          this.editVisible = true;
          this.editForm = Object.assign({},row);
        }
        else {
          this.$message({message: '您不是管理员,没有修改公告的权限', type: 'warning'});
        }
      },
      //编辑提交
      editSubmit(){
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let params = Object.assign({}, this.editForm);
              api.notice_put(this.currentId, params)
                .then((response) => {
                  if(response){
                    this.$message({message: '提交成功', type: 'success'});
                    this.editVisible = false;
                    this.getNotice();
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
          this.$message({message: '您不是管理员,没有发布公告的权限', type: 'warning'});
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
                url: 'http://127.0.0.1:5000/noticeAdd',
                data: params
              }).then((response) => {
                if(response){
                  this.$message({message: '提交成功', type: 'success'});
                  this.$refs.addForm.resetFields();
                  this.addVisible = false;
                  this.loading = false;
                  this.getNotice();
                }
                else {
                  this.$message({message: '执行失败，请重试',type: "error"});
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
            api.notice_remove(row).then(res => {
              this.$message.success('删除成功!');
              this.getNotice();
            }).catch((res) => {
              this.$message.error('删除失败!');
            });
          }).catch(() => {
            this.$message.info('已取消操作!');
          });
        }
        else {
          this.$message({message: '您不是管理员,没有删除公告的权限', type: 'warning'});
        }
      },
      //批量删除
      removes(){
        if(sessionStorage.getItem('ms_username') === 'admin'){
          let ids= this.multipleSelection.map(item => item.id);
          console.log(ids);
          if (ids.length == 0){
            this.$message({message: '请选择要删除的项',type: "warning"});
            return;
          }
          this.$confirm('确认删除选中的记录吗？', '提示', {
            type: 'warning'
          }).then(() => {
            api.notice_removes(ids)
              .then((response) => {
                this.$message({message: '删除成功', type: 'success'});
                this.getNotice();
              }).catch((err)=>{
              this.$message({message: '执行失败，请重试',type: "error"});
              console.log(err)
            });
          }).catch(() => {
            this.$message({type: 'info',message: '删除失败'});
          });
        }
        else {
          this.$message({message: '您不是管理员,没有批量删除公告的权限', type: 'warning'});
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
  .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {
    width: 300px;
    margin-top: 4px;
  }
  .el-date-editor .el-range__icon {
    margin-bottom: 8px;
  }
  .el-date-editor .el-range-separator {
    margin-bottom: 8px;
  }
  .el-form-item__error {
    top: 86%;
    left: 50px;
  }
  .el-form-item__error {
    top: 86%;
    left: 50px;
  }
  .el-rate {
    height: 20px;
    line-height: 2.5;
    margin-left: 50px;
    text-align: left;
  }
</style>

