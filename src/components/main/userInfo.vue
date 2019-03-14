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
  </div>
</template>

<script>
    export default {
      name: "userInfo",
      data(){
        return{
          tableData: []
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
              this.tableData.push(response.data);
              console.log('tableData:',this.tableData)
            }
          }).catch((err) => {
            console.log(err);
            this.$alert('请求超时，刷新重试！')
          })
        }
      }
    }
</script>

<style scoped>

</style>
