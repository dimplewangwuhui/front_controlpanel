<template>
  <div class="main" style="margin: 10px auto">
    <el-form  :inline="true" ref="formSearch" :model="formSearch" class="demo-form">
      <el-form-item label="" prop="message">
        <el-input class="input-form" v-model="formSearch.message" placeholder="请输入所要查询的留言(模糊查询)"></el-input>
      </el-form-item>
      <el-form-item label="" prop="evaluation">
        <el-select class="select-form" v-model="formSearch.evaluation" clearable placeholder="请选择评价等级">
          <el-option v-for="item in evaluationOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" size="small" @click="getUserMessage" style="height: 32px">查询</el-button>
        <el-button type="warning" size="small" plain @click="onReset">重置</el-button>
      </el-form-item>
      <hr style="height:1px;border:none;border-top:1px dashed rgba(0, 0, 0, .05);" />
      <el-form-item label="操作">
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
      <el-table-column prop="username" label="昵称" show-overflow-tooltip sortable align="center" width="115">
      </el-table-column>
      <el-table-column prop="message" label="留言内容" align="center" width="450">
      </el-table-column>
      <el-table-column prop="evaluation" label="评价" align="center" width="100">
      </el-table-column>
      <el-table-column prop="create_date"  label="创建时间" show-overflow-tooltip align="center" width="150">
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
        <el-form-item label="昵称:" prop="username">
          <el-input v-model="editForm.username" disabled style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="留言内容:" prop="message">
          <el-input v-model="editForm.message" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import api from "../../../api/api";

  export default {
    name: "moreAdvices",
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
        evaluationOptions: [
          {value: '0', label: '未评价'},
          {value: '1', label: '偏差'},
          {value: '2', label: '一般'},
          {value: '3', label: '良好'},
          {value: '4', label: '优秀'},
          {value: '5', label: '极好'},
        ],

        formSearch:{
          message:'',
          evaluation: ''
        },
        editVisible: false,
        editForm:{
          id:'',
          username:'',
          message:''
        },
        Rules:{
          username:[
            { required: true, message: '请输入昵称', trigger: 'blur' }
          ],
          message:[
            { required: true, message: '请输入留言内容', trigger: 'blur' }
          ]
        }
      }
    },

    created(){
      this.getUserMessage();
    },

    methods: {
      getUserMessage() {
        let params = Object.assign({}, this.formSearch);
        params['username'] = sessionStorage.getItem("ms_username");
        let data = new URLSearchParams();
        for (let key in params) {
          data.append(key, params[key]);
        }
        api.userMessage_get(data)
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
          this.getUserMessage();
        }
      },
      handleCurrentChange(val) {
        if (this.pageIndex !== val) {
          this.pageIndex = val;
          this.getUserMessage();
        }
      },
      onReset(){
        this.$refs['formSearch'].resetFields();
      },

      //编辑
      edit(row, index){
        this.currentId = row.id;
        this.editVisible = true;
        this.editForm = Object.assign({},row);
      },
      //编辑提交
      editSubmit(){
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let params = Object.assign({}, this.editForm);
              api.message_put(this.currentId, params)
                .then((response) => {
                  if(response){
                    this.$message({message: '提交成功', type: 'success'});
                    this.editVisible = false;
                    this.getUserMessage();
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
      //删除
      remove(row) {
        this.$confirm('是否执行删除操作?', '提示',{
          type: 'warning'
        }).then(() => {
          api.message_remove(row).then(res => {
            this.$message.success('删除成功!');
            this.getUserMessage();
          }).catch((res) => {
            this.$message.error('删除失败!');
          });
        }).catch(() => {
          this.$message.info('已取消操作!');
        });
      },
      //批量删除
      removes(){
        let ids= this.multipleSelection.map(item => item.id);
        console.log(ids);
        if (ids.length == 0){
          this.$message({message: '请选择要删除的项',type: "warning"});
          return;
        }
        this.$confirm('确认删除选中的记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          api.message_removes(ids)
            .then((response) => {
              this.$message({message: '删除成功', type: 'success'});
              this.getUserMessage();
            }).catch((err)=>{
            this.$message({message: '执行失败，请重试',type: "error"});
            console.log(err)
          });
        }).catch(() => {
          this.$message({type: 'info',message: '删除失败'});
        });
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
  /*.el-form-item {*/
  /*margin-bottom: 10px;*/
  /*}*/
  .input-form, .select-form, .cascader-form{
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

