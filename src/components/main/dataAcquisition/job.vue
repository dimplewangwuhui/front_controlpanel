<template>
  <div class="main" style="margin: 10px auto">
    <el-form  :inline="true" ref="formSearch" :model="formSearch" class="demo-form">
      <el-form-item label="" prop="city">
        <el-input class="input-form" v-model="formSearch.city" placeholder="城市"></el-input>
      </el-form-item>
      <el-form-item label="" prop="minsalary">
        <el-input class="input-form" v-model="formSearch.minsalary" placeholder="最低薪资"></el-input>
      </el-form-item>
      <el-form-item label="" prop="maxsalary">
        <el-input class="input-form" v-model="formSearch.maxsalary" placeholder="最高薪资"></el-input>
      </el-form-item>
      <!--<el-form-item label="" prop="create_date">-->
        <!--<el-date-picker-->
          <!--v-model="formSearch.create_date"-->
          <!--type="datetimerange"-->
          <!--range-separator="至"-->
          <!--start-placeholder="开始日期"-->
          <!--end-placeholder="结束日期">-->
        <!--</el-date-picker>-->
      <!--</el-form-item>-->
      <el-form-item label="">
        <el-button type="primary" size="small" @click="getJob" style="height: 32px">查询</el-button>
        <el-button type="warning" size="small" plain @click="onReset">重置</el-button>
      </el-form-item>
      <hr style="height:1px;border:none;border-top:1px dashed rgba(0, 0, 0, .05);" />
      <el-form-item label="操作">
        <!--<i class="iconfont icon-iconfontzhizuobiaozhun47"></i>-->
        <el-button size="small" @click="add">添加</el-button>
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
      <el-table-column prop="id" label="ID" sortable align="center" width="120">
      </el-table-column>
      <el-table-column prop="city" label="城市" align="center" width="120">
      </el-table-column>
      <el-table-column prop="maxsalary" label="最高薪资" sortable align="center" width="120">
      </el-table-column>
      <el-table-column prop="minsalary" label="最低薪资" sortable align="center" width="120">
      </el-table-column>
      <el-table-column prop="avgsalary" label="平均薪资" sortable align="center" width="120">
      </el-table-column>
      <el-table-column prop="jobcount" label="职位数量" sortable align="center" width="120">
      </el-table-column>
      <el-table-column prop="create_date" label="创建时间"  align="center" width="160">
      </el-table-column>
      <el-table-column prop="update_date" label="更新时间"  align="center" width="160">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope" v-if= "scope.row.id">
          <el-tooltip content="详情" placement="top">
            <el-button @click="handleClick(scope.row)" type="primary" size="mini" icon="el-icon-more"></el-button>
          </el-tooltip>
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
        <el-form-item label="城市:" prop="city">
          <el-input v-model="editForm.city" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="最高薪资:" prop="maxsalary">
          <el-input v-model="editForm.maxsalary" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="最低薪资:" prop="minsalary">
          <el-input v-model="editForm.minsalary" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="平均薪资:" prop="avgsalary">
          <el-input v-model="editForm.avgsalary" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="职位数量:" prop="jobcount">
          <el-input v-model.number="editForm.jobcount" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加" :visible.sync="addVisible">
      <el-form :model="addForm" :rules="Rules" ref="addForm" status-icon label-width="130px" label-position="right" style="margin: 0 auto;">
        <el-form-item label="城市:" prop="city">
          <el-input v-model="addForm.city" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="最高薪资:" prop="maxsalary">
          <el-input v-model="addForm.maxsalary" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="最低薪资:" prop="minsalary">
          <el-input v-model="addForm.minsalary" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="平均薪资:" prop="avgsalary">
          <el-input v-model="addForm.avgsalary" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="职位数量:" prop="jobcount">
          <el-input v-model.number="addForm.jobcount" style="width: 80%"></el-input>
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
    name: "job",
    data() {
      let checkJobCount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入职位数量'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {     //Number.isInteger(value): 判断给定值是否是整数的 Boolean 值。
            console.log(typeof value);
            callback(new Error('请输入数字值'));
          } else {
            if (value < 0) {
              callback(new Error('请输入大于0的值'));
            } else {
              callback();
            }
          }
        }, 0);
      };
      return {
        tableData1: [],
        pageIndex: 1,
        pageSize: 5,
        total: 0,
        currentId:'',
        loading: true,
        multipleSelection: [], // 当前页选中的行

        formSearch:{
          city:'',
          maxsalary:'',
          minsalary: '',
          // avgsalary:'',
          // jobcount:'',
          // startdate:null,
          // enddate:null
        },
        editVisible: false,
        editForm:{
          id:'',
          city:'',
          maxsalary:'',
          minsalary: '',
          avgsalary:'',
          jobcount:''
        },
        addVisible: false,
        addForm:{
          city:'',
          maxsalary:'',
          minsalary: '',
          avgsalary:'',
          jobcount:''
        },
        Rules:{
          city:[
            { required: true, message: '请输入城市', trigger: 'blur' }
          ],
          maxsalary:[
            { required: true, message: '请输入最高薪资', trigger: 'blur' }
          ],
          minsalary:[
            { required: true, message: '请输入最低薪资', trigger: 'blur' }
          ],
          avgsalary:[
            { required: true, message: '请输入平均薪资', trigger: 'blur' }
          ],
          jobcount:[
            { validator: checkJobCount, trigger: 'blur' }
          ]
        }
      }
    },

    created(){
      this.getJob();
    },

    methods: {
      getJob() {
        // if(this.formSearch.createtime){
        //   console.log('这里'+this.formSearch.createtime);
        //   this.formSearch.startdate=this.formSearch.createtime[0];
        //   this.formSearch.enddate=this.formSearch.createtime[1];
        // }
        let params = Object.assign({}, this.formSearch);
        let data = new URLSearchParams();
        for (let key in params) {
          data.append(key, params[key]);
        }
        api.job_get(data)
          .then((response) => {
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
      },
      handleSizeChange(val) {
        if (this.pageSize !== val) {
          this.pageSize = val;
          this.getJob();
        }
      },
      handleCurrentChange(val) {
        if (this.pageIndex !== val) {
          this.pageIndex = val;
          this.getJob();
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
          this.$message({message: '您不是管理员,没有修改权限', type: 'warning'});
        }
      },
      //编辑提交
      editSubmit(){
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let params = Object.assign({}, this.editForm);
              api.job_put(this.currentId, params)
                .then((response) => {
                  if(response){
                    this.$message({message: '提交成功', type: 'success'});
                    this.editVisible = false;
                    this.getJob();
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
              // let data = new URLSearchParams();
              // for (let key in params) {
              //   data.append(key, params[key]);
              // }
              this.$axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/jobAdd',
                data: params
            }).then((response) => {
                if(response){
                  this.$message({message: '提交成功', type: 'success'});
                  this.$refs.addForm.resetFields();
                  this.addVisible = false;
                  this.loading = false;
                  this.getJob();
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
            api.job_remove(row).then(res => {
              this.$message.success('删除成功!');
              this.getJob();
            }).catch((res) => {
              this.$message.error('删除失败!');
            });
          }).catch(() => {
            this.$message.info('已取消操作!');
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
          if (ids.length == 0){
            this.$message({message: '请选择要删除的项',type: "warning"});
            return;
          }
          this.$confirm('确认删除选中的记录吗？', '提示', {
            type: 'warning'
          }).then(() => {
            api.job_removes(ids)
              .then((response) => {
                this.$message({message: '删除成功', type: 'success'});
                this.getJob();
              }).catch((err)=>{
              this.$message({message: '执行失败，请重试',type: "error"});
              console.log(err)
            });
          }).catch(() => {
            this.$message({type: 'info',message: '删除失败'});
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
</style>
