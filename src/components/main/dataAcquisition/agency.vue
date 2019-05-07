<template>
  <div class="main" style="margin: 10px auto">
    <el-form  :inline="true" ref="formSearch" :model="formSearch" class="demo-form">
      <el-form-item label="" prop="city">
        <el-select class="select-form" v-model="formSearch.city" clearable placeholder="城市">
          <el-option-group v-for="group in optionsAll" :key="group.label" :label="group.label">
            <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="name">
        <el-input class="input-form" v-model="formSearch.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="" prop="number">
        <el-input class="input-form" v-model="formSearch.number" placeholder="电话"></el-input>
      </el-form-item>
      <el-form-item label="" prop="card">
        <el-input class="input-form" v-model="formSearch.card" placeholder="身份信息卡号"></el-input>
      </el-form-item>
      <el-form-item label="" prop="code">
        <el-input class="input-form" v-model="formSearch.code" placeholder="公司执照编码"></el-input>
      </el-form-item>
      <el-form-item label="" prop="company" v-show="isMore==true">
        <el-input class="input-form" v-model="formSearch.company" placeholder="公司(模糊搜索)"></el-input>
      </el-form-item>
      <el-form-item label="" prop="store" v-show="isMore==true">
        <el-input class="input-form" v-model="formSearch.store" placeholder="门店(模糊搜索)"></el-input>
      </el-form-item>
      <el-form-item label="" prop="plate" v-show="isMore==true">
        <el-input class="input-form" v-model="formSearch.plate" placeholder="主营板块(模糊搜索)"></el-input>
      </el-form-item>
      <el-form-item label="" prop="main_village" v-show="isMore==true">
        <el-input class="input-form" v-model="formSearch.main_village" placeholder="主营小区(模糊搜索)"></el-input>
      </el-form-item>

      <div>
        <el-form-item label="">
          <el-button type="primary" size="small" @click="isMore=!isMore">更多条件</el-button>
          <el-button type="primary" size="small" @click="getAgency" style="height: 32px">查询</el-button>
          <el-button type="warning" size="small" plain @click="onReset">重置</el-button>
        </el-form-item>
      </div>
      <hr style="height:1px;border:none;border-top:1px dashed rgba(0, 0, 0, .05);" />
      <el-form-item label="操作">
        <el-button size="small" @click="add">添加</el-button>
        <el-button size="small" @click="removes">批量删除</el-button>
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
      :header-cell-style="{color: '#000', backgroundColor: '#DDE2EF'}"
      @selection-change="handleSelectionChange">
      <el-table-column fixed="left" type="selection" align="center" width="50">
      </el-table-column>
      <el-table-column prop="id" label="ID" sortable align="center" width="60">
      </el-table-column>
      <el-table-column prop="city" label="城市" align="center" width="120">
      </el-table-column>
      <el-table-column prop="name" label="姓名" align="center" width="120">
      </el-table-column>
      <el-table-column prop="resource" label="房源得分" sortable align="center" width="120">
      </el-table-column>
      <el-table-column prop="service" label="服务得分" sortable align="center" width="120">
      </el-table-column>
      <el-table-column prop="evaluation" label="评价得分" sortable align="center" width="120">
      </el-table-column>
      <el-table-column prop="company" label="公司" show-overflow-tooltip align="center" width="150">
      </el-table-column>
      <el-table-column prop="store" label="门店" show-overflow-tooltip align="center" width="150">
      </el-table-column>
      <el-table-column prop="card" label="身份信息卡号" sortable align="center" width="150">
      </el-table-column>
      <el-table-column prop="code" label="公司执照编码" show-overflow-tooltip sortable align="center" width="150">
      </el-table-column>
      <el-table-column prop="number" label="电话" align="center" width="120">
      </el-table-column>
      <el-table-column prop="years" label="服务年限" sortable align="center" width="120">
      </el-table-column>
      <el-table-column prop="plate" label="主营板块" align="center" width="120">
      </el-table-column>
      <el-table-column prop="main_village" label="主营小区" show-overflow-tooltip align="center" width="120">
      </el-table-column>
      <el-table-column prop="introduction" label="个人简介" show-overflow-tooltip align="center" width="160">
      </el-table-column>
      <el-table-column prop="agencyurl" label="中介详情链接" show-overflow-tooltip align="center" width="160">
      </el-table-column>
      <el-table-column prop="create_date" label="创建时间" show-overflow-tooltip align="center" width="160">
      </el-table-column>
      <el-table-column prop="update_date" label="更新时间" show-overflow-tooltip align="center" width="160">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="250" align="center">
        <template slot-scope="scope" v-if= "scope.row.id">
          <el-tooltip content="详情" placement="top">
            <el-button type="primary" size="mini" icon="el-icon-more" @click="handleClick(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip content="关注" placement="top">
            <el-button type="primary" size="mini" @click="focus(scope.row)"><i class="iconfont icon-guanzhu" style="padding-right: 0"></i></el-button>
          </el-tooltip>
          <el-tooltip content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row,scope.$index)"></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="remove(scope.row)"></el-button>
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
        :page-sizes="[10,20,30,40,50,100]"
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
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="editForm.name" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="房源:" prop="resource">
          <el-input v-model="editForm.resource" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="服务:" prop="service">
          <el-input v-model="editForm.service" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="评价:" prop="evaluation">
          <el-input v-model="editForm.evaluation" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="公司:" prop="company">
          <el-input v-model="editForm.company" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="门店:" prop="store">
          <el-input v-model="editForm.store" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="身份信息卡号:" prop="card">
          <el-input v-model="editForm.card" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="公司执照编码:" prop="code">
          <el-input v-model="editForm.code" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="number">
          <el-input v-model="editForm.number" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="服务年限:" prop="years">
          <el-input v-model="editForm.years" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="主营板块:" prop="plate">
          <el-input v-model="editForm.plate" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="主营小区:" prop="mian_village">
          <el-input v-model.number="editForm.main_village" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="个人简介:" prop="introduction">
          <el-input v-model="editForm.introduction" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="中介详情链接:" prop="agencyurl">
          <el-input v-model="editForm.agencyurl" style="width: 80%"></el-input>
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
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="addForm.name" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="房源:" prop="resource">
          <el-input v-model="addForm.resource" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="服务:" prop="service">
          <el-input v-model="addForm.service" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="评价:" prop="evaluation">
          <el-input v-model="addForm.evaluation" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="公司:" prop="company">
          <el-input v-model="addForm.company" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="门店:" prop="store">
          <el-input v-model="addForm.store" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="身份信息卡号:" prop="card">
          <el-input v-model="addForm.card" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="公司执照编码:" prop="code">
          <el-input v-model="addForm.code" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="number">
          <el-input v-model="addForm.number" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="服务年限:" prop="years">
          <el-input v-model="addForm.years" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="主营板块:" prop="plate">
          <el-input v-model="addForm.plate" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="主营小区:" prop="main_village">
          <el-input v-model.number="addForm.main_village" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="个人简介:" prop="introduction">
          <el-input v-model="addForm.introduction" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="详情链接:" prop="agencyurl">
          <el-input v-model="addForm.agencyurl" style="width: 80%"></el-input>
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
    name: "agency",
    data() {
      return {
        tableData1: [],
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        currentId:'',
        loading: true,
        isMore: false,
        multipleSelection: [], // 当前页选中的行

        optionsAll: [{
          label: '热门城市',
          options: [{value: '北京', label: '北京'},
            {value: '上海', label: '上海'}]
        },{
          label: '其他城市',
          options: [{value: '广州', label: '广州'},
            {value: '深圳', label: '深圳'},
            {value: '武汉', label: '武汉'},
            {value: '太原', label: '太原'},
            {value: '杭州', label: '杭州'}]
        }],

        formSearch:{
          city:'',
          name:'',
          number:'',
          card:'',
          code:'',
          company:'',
          store:'',
          plate:'',
          main_village:''
        },
        editVisible: false,
        editForm:{
          id:'',
          name:'',
          resource:'',
          service:'',
          evaluation:'',
          company:'',
          store:'',
          card:'',
          code:'',
          number:'',
          years:'',
          plate:'',
          main_village:'',
          introduction:'',
          agencyurl:''
        },
        addVisible: false,
        addForm:{
          name:'',
          resource:'',
          service:'',
          evaluation:'',
          company:'',
          store:'',
          card:'',
          code:'',
          number:'',
          years:'',
          plate:'',
          main_village:'',
          introduction:'',
          agencyurl:''
        },
        Rules:{
          city:[
            { required: true, message: '请输入城市', trigger: 'blur' }
          ],
          name:[
            { required: true, message: '请输入中介姓名', trigger: 'blur' }
          ],
          resource:[
            { required: true, message: '请输入房源得分', trigger: 'blur' }
          ],
          service:[
            { required: true, message: '请输入服务得分', trigger: 'blur' }
          ],
          evaluation:[
            { required: true, message: '请输入评价得分', trigger: 'blur' }
          ],
          company:[
            { required: true, message: '请输入公司名称', trigger: 'blur' }
          ],
          store:[
            { required: true, message: '请输入门店名称', trigger: 'blur' }
          ],
          card:[
            { required: true, message: '请输入身份信息卡号', trigger: 'blur' }
          ],
          code:[
            { required: true, message: '请输入公司执照编码', trigger: 'blur' }
          ],
          number:[
            { required: true, message: '请输入电话号码', trigger: 'blur' }
          ],
          years:[
            { required: true, message: '请输入服务年限', trigger: 'blur' }
          ],
          plate:[
            { required: true, message: '请输入主营板块', trigger: 'blur' }
          ],
          main_village:[
            { required: true, message: '请输入主营小区', trigger: 'blur' }
          ],
          introduction:[
            { required: true, message: '请输入个人简介', trigger: 'blur' }
          ],
        }
      }
    },

    mounted(){
      this.getAgency();
    },

    methods: {
      getAgency() {
        let params = Object.assign({}, this.formSearch);
        console.log(params);
        let data = new URLSearchParams();
        for (let key in params) {
          data.append(key, params[key]);
        }
        api.agency_get(data)
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
          this.getAgency();
        }
      },
      handleCurrentChange(val) {
        if (this.pageIndex !== val) {
          this.pageIndex = val;
          this.getAgency();
        }
      },
      onReset(){
        this.$refs['formSearch'].resetFields();
      },
      handleClick(row){
        if(row.agencyurl){
          window.open(row.agencyurl);  //window.open(url):打开新窗。。window.location.href = url:在本窗口打开
        }
        else {
          this.$message({message: '抱歉，该中介暂未开通详情店铺，敬请期待！！！', type: 'warning'});
        }
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
              api.agency_put(this.currentId, params)
                .then((response) => {
                  if(response){
                    this.$message({message: '提交成功', type: 'success'});
                    this.editVisible = false;
                    this.getAgency();
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
                url: 'http://127.0.0.1:5000/agencyAdd',
                data: params
              }).then((response) => {
                if(response){
                  this.$message({message: '提交成功', type: 'success'});
                  this.$refs.addForm.resetFields();
                  this.addVisible = false;
                  this.loading = false;
                  this.getAgency();
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
            api.agency_remove(row).then(res => {
              this.$message.success('删除成功!');
              this.getAgency();
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
            api.agency_removes(ids)
              .then((response) => {
                this.$message({message: '删除成功', type: 'success'});
                this.getAgency();
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
      focus(row) {
        this.$confirm('确认关注吗？', '提示', {}).then(() => {
          let params = Object.assign({}, row);
          params['focusName'] = sessionStorage.getItem("ms_username");
          console.log(params);
          this.$axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/focusAgency',
            data: params
          }).then((response) => {
            if(response){
              this.$message({message: '关注成功', type: 'success'});
            }
            else {
              this.$message({message: '关注失败，请重试',type: "error"});
            }
          }).catch((err) => {
            this.$message({message: '关注失败，请重试',type: "error"});
            this.loading = false;
          });
        });
      }

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
</style>
