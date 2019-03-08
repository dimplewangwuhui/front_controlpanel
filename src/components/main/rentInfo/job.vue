<template>
  <div class="main" style="margin: 0 auto">
    <el-button type="primary" plain size="mini" icon="el-icon-circle-plus-outline" @click="add">添加</el-button>
    <el-table
      :data="tableData1.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)"
      ref="table"
      border
      v-loading="loading"
      element-loading-text="拼命加载中..."
      :highlight-current-row="true"
      :header-cell-style="{color: '#000'}"
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
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope" v-if= "scope.row.id">
          <el-tooltip content="详情" placement="top">
            <el-button @click="handleClick(scope.row)" type="primary" size="mini" icon="el-icon-more"></el-button>
          </el-tooltip>
          <el-tooltip content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" size="mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index)"></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" size="mini"  style="cursor: pointer;" @click="deletejob(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagelist" style="margin-top: 20px; text-align: center">
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
          <el-input v-model="editForm.jobcount" style="width: 80%"></el-input>
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
          <el-input v-model="addForm.jobcount" style="width: 80%"></el-input>
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
      return {
        tableData1: [],
        pageIndex: 1,
        pageSize: 5,
        total: 0,
        currentId:'',
        loading: true,
        multipleSelection: [], // 当前页选中的行

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
            { required: true, message: '请输入职位数量', trigger: 'blur' }
          ]
        }
      }
    },

    created(){
      this.getHost();
    },

    methods: {
      getHost() {
        api.jobinfo_get()
          .then((response) => {
            console.log('======================'+JSON.stringify(response.data));
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
          this.getHost();
        }
      },
      handleCurrentChange(val) {
        if (this.pageIndex !== val) {
          this.pageIndex = val;
          this.getHost();
        }
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
              api.host_put(this.currentId, params)
                .then((response) => {
                  if(response){
                    this.$message({message: '提交成功', type: 'success'});
                    this.editVisible = false;
                    this.getHost();
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
        this.addVisible = true;
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
                data: params,
                // emulateJSON:true
            }).then((response) => {
                  if(response){
                    this.$message({message: '提交成功', type: 'success'});
                    this.$refs.addForm.resetFields();  //resetFields 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
                    this.addVisible = false;
                    this.loading = false;
                    this.getHost();
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
      deletejob(row) {
        this.$confirm('是否执行删除操作?', '提示',{
          type: 'warning'
        }).then(() => {
          api.host_remove(row).then(res => {
            this.$message.success('删除成功!');
            this.getHost();
          }).catch((res) => {
            this.$message.error('删除失败!');
          });
        }).catch(() => {
          this.$message.info('已取消操作!');
        });
      },
      //批量删除库存
      hostMultiRemove(){
        let ids= this.multipleSelection.map(item => item.id);
        console.log('ids: '+ids);
        if (ids.length == 0){
          this.$message({message: '请选择要删除的项',type: "warning"});
          return;
        }
        this.$confirm('确认删除选中的记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          api.host_removes({ids:ids})
            .then((response) => {
              this.$message({message: '删除成功', type: 'success'});
              this.getHost();
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

<style scoped>

</style>
