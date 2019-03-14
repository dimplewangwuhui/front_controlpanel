<template>
  <div class="main" style="margin: 0 auto">
    <el-form  :inline="true" ref="formSearch" :model="formSearch" class="demo-form">
      <el-form-item label="" prop="city">
        <el-input class="input-form" v-model="formSearch.region" placeholder="区域"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" size="small" @click="getHouse" style="height: 32px">查询</el-button>
        <el-button type="warning" size="small" plain @click="onReset">重置</el-button>
      </el-form-item>
      <hr style="height:1px;border:none;border-top:1px dashed rgba(0, 0, 0, .05);" />
      <el-form-item label="操作">
        <el-button size="small" @click="add">添加</el-button>
        <el-button size="small" @click="multi_remove">批量删除</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData1.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)"
      ref="table"
      border
      tooltip-effect="light"
      v-loading="loading"
      element-loading-text="拼命加载中..."
      :highlight-current-row="true"
      :header-cell-style="{color: '#000', backgroundColor: '#F4F5F9'}"
      @selection-change="handleSelectionChange">
      <el-table-column fixed="left" type="selection" align="center" width="50">
      </el-table-column>
      <el-table-column prop="id" label="ID" sortable align="center" width="60">
      </el-table-column>
      <el-table-column prop="title" label="标题" show-overflow-tooltip align="center" width="200">
      </el-table-column>
      <el-table-column prop="room" label="户型"  align="center" width="120">
      </el-table-column>
      <el-table-column prop="area" label="面积" sortable align="center" width="120">
      </el-table-column>
      <el-table-column prop="floor" label="楼层" sortable align="center" width="120">
      </el-table-column>
      <el-table-column prop="username" label="中介" align="center" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip align="center" width="200">
      </el-table-column>
      <el-table-column prop="region" label="区域" align="center" width="120">
      </el-table-column>
      <el-table-column prop="rentway" label="租赁方式" align="center" width="120">
      </el-table-column>
      <el-table-column prop="direction" label="朝向"  align="center" width="120">
      </el-table-column>
      <el-table-column prop="subway" label="地铁" align="center" width="150">
      </el-table-column>
      <el-table-column prop="price" label="价格" sortable align="center" width="120">
      </el-table-column>
      <el-table-column prop="create_date" label="创建时间" show-overflow-tooltip align="center" width="160">
      </el-table-column>
      <el-table-column prop="update_date" label="更新时间" show-overflow-tooltip align="center" width="160">
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
        :page-sizes="[10,20,30,40,50]"
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
        <el-form-item label="户型:" prop="room">
          <el-input v-model="editForm.room" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="面积:" prop="area">
          <el-input v-model="editForm.area" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="楼层:" prop="floor">
          <el-input v-model="editForm.floor" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="中介:" prop="username">
          <el-input v-model="editForm.username" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="地址:" prop="address">
          <el-input v-model="editForm.address" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="区域:" prop="region">
          <el-input v-model="editForm.region" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="租赁方式:" prop="rentway">
          <el-input v-model="editForm.rentway" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="朝向:" prop="direction">
          <el-input v-model="editForm.direction" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="地铁:" prop="subway">
          <el-input v-model="editForm.subway" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="价格:" prop="price">
          <el-input v-model="editForm.price" style="width: 80%"></el-input>
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
        <el-form-item label="户型:" prop="room">
          <el-input v-model="addForm.room" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="面积:" prop="area">
          <el-input v-model="addForm.area" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="楼层:" prop="floor">
          <el-input v-model="addForm.floor" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="中介:" prop="username">
          <el-input v-model="addForm.username" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="地址:" prop="address">
          <el-input v-model="addForm.address" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="区域:" prop="region">
          <el-input v-model="addForm.region" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="租赁方式:" prop="rentway">
          <el-input v-model="addForm.rentway" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="朝向:" prop="direction">
          <el-input v-model="addForm.direction" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="地铁:" prop="subway">
          <el-input v-model="addForm.subway" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="价格:" prop="price">
          <el-input v-model="addForm.price" style="width: 80%"></el-input>
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
    name: "house_ajk",
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
        pageSize: 20,
        total: 0,
        currentId:'',
        loading: true,
        multipleSelection: [], // 当前页选中的行

        formSearch:{
          // title:'',
          // room:'',
          // area: '',
          // floor:'',
          // username:'',
          // address :'',
          region:'',
          // rentway:'',
          // direction:'',
          // subway:'',
          // price:''
        },
        editVisible: false,
        editForm:{
          id:'',
          title:'',
          room:'',
          area: '',
          floor:'',
          username:'',
          address :'',
          region:'',
          rentway:'',
          direction:'',
          subway:'',
          price:''
        },
        addVisible: false,
        addForm:{
          title:'',
          room:'',
          area: '',
          floor:'',
          username:'',
          address :'',
          region:'',
          rentway:'',
          direction:'',
          subway:'',
          price:''
        },
        Rules:{
          title:[
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          room:[
            { required: true, message: '请输入户型', trigger: 'blur' }
          ],
          area:[
            { required: true, message: '请输入面积', trigger: 'blur' }
          ],
          floor:[
            { required: true, message: '请输入楼层', trigger: 'blur' }
          ],
          address:[
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          region:[
            { required: true, message: '请输入区域', trigger: 'blur' }
          ],
          rentway:[
            { required: true, message: '请输入租赁方式', trigger: 'blur' }
          ],
          // direction:[
          //   { required: true, message: '请输入朝向', trigger: 'blur' }
          // ],
          // subway:[
          //   { required: true, message: '请输入地铁', trigger: 'blur' }
          // ],
          price:[
            { required: true, message: '请输入价格', trigger: 'blur' }
          ]
        }
      }
    },

    created(){
      this.getHouse();
    },

    methods: {
      getHouse() {
        let params = Object.assign({}, this.formSearch);
        let data = new URLSearchParams();
        for (let key in params) {
          data.append(key, params[key]);
        }
        api.house_get(data)
          .then((response) => {
            // console.log(response.data[0]['address']);
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
          this.getHouse();
        }
      },
      handleCurrentChange(val) {
        if (this.pageIndex !== val) {
          this.pageIndex = val;
          this.getHouse();
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
              api.house_put(this.currentId, params)
                .then((response) => {
                  if(response){
                    this.$message({message: '提交成功', type: 'success'});
                    this.editVisible = false;
                    this.getHouse();
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
                data: params
              }).then((response) => {
                if(response){
                  this.$message({message: '提交成功', type: 'success'});
                  this.$refs.addForm.resetFields();
                  this.addVisible = false;
                  this.loading = false;
                  this.getHouse();
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
        this.$confirm('是否执行删除操作?', '提示',{
          type: 'warning'
        }).then(() => {
          api.house_remove(row).then(res => {
            this.$message.success('删除成功!');
            this.getHouse();
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
        console.log('ids: '+ids);
        if (ids.length == 0){
          this.$message({message: '请选择要删除的项',type: "warning"});
          return;
        }
        this.$confirm('确认删除选中的记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          api.house_removes({ids:ids})
            .then((response) => {
              this.$message({message: '删除成功', type: 'success'});
              this.getHouse();
            }).catch((err)=>{
            this.$message({message: '执行失败，请重试',type: "error"});
            console.log(err)
          });
        }).catch(() => {
          this.$message({type: 'info',message: '删除失败'});
        });
      },
      handleClick(){
        this.$router.push('http://www.baidu.com')
      }

    }
  }
</script>

<style>
  .demo-form{
    text-align: left;
    background-color: #F4F5F9;
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
</style>
