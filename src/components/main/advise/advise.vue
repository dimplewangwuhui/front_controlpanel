<template>
  <div class="advise">
    <el-form :model="Form" :rules="Rules" ref="Form">
      <el-form-item>
        <el-input type="textarea" :rows="5"  v-model="form.message" placeholder="请输入留言内容......"></el-input>
      </el-form-item>
      <el-form-item label="亲，给本平台个好评吧"  style="margin-top: -15px;">
        <el-rate v-model="form.evaluation"></el-rate>
      </el-form-item>
      <el-form-item  style="margin-top: -15px; text-align: right">
        <el-button type="primary" @click="onsubmit" style="background-color: #494090; border: 1px solid #494090">发表</el-button>
      </el-form-item>
    </el-form>
    <div class="demo-form">
      <div style="margin: 10px; text-align: center; font-size: 16px; font-weight: 600">留言板</div>
      <el-timeline>
        <el-timeline-item v-for="(item, index) in messages" :timestamp="item.create_date" :key = "item.create_date" placement="top">
          <el-card>
            <h4 style="margin: 0">历史留言：{{ item.message }}</h4>
            <p style="margin-top: 10px; margin-bottom: 0">历史评价：{{ item.evaluation }}</p>
            <p style="margin-top: 10px; margin-bottom: 0">用户名称：{{ item.username }}</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item v-for="(item, index) in leaveMessages" :timestamp="item.create_date" :key = "item.create_date"  v-show="isMore==true" placement="top">
          <el-card>
            <h4 style="margin: 0">历史留言：{{ item.message }}</h4>
            <p style="margin-top: 10px; margin-bottom: 0">历史评价：{{ item.evaluation }}</p>
            <p style="margin-top: 10px; margin-bottom: 0">{{ item.username }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <div style="background-color: #e2e1e8; text-align: center; margin-bottom: 20px; margin-left: 30px">
        <el-button type="text" @click="loadLeaveMessages" style="color: #666;">加载全部留言</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "advise",
    data(){
      return{
        form:{
          username: sessionStorage.getItem('ms_username'),
          message: '',
          evaluation: null
        },
        messages: '',
        leaveMessages: '',
        isMore: false,
      }
    },
    mounted() {
      this.get5Message()
    },
    methods: {
      //发表留言
      onsubmit() {
        this.$confirm('确认发表留言吗？', '提示', {}).then(() => {
          let params = Object.assign({}, this.form);
          console.log(params);
          this.$axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/messageAdd',
            data: params
          }).then((response) => {
            if(response){
              this.$message({message: '提交成功', type: 'success'});
              this.get5Message();
            }
            else {
              this.$message({message: '执行失败，请重试',type: "error"});
            }
          }).catch((err) => {
            this.$message({message: '执行失败，请重试',type: "error"});
          });
        });
      },
      get5Message() {
        this.$axios.get('http://127.0.0.1:5000/get5Message')
          .then((response) => {
            console.log(response.data);
            this.messages = response.data.data;
          }).catch(err => {
          console.error(err);
          this.$alert('请求超时，刷新重试！')
        })
      },
      loadLeaveMessages() {
        this.$axios.get('http://127.0.0.1:5000/getLeaveMessage')
          .then((response) => {
          console.log(response.data);
          this.leaveMessages = response.data.data;
          this.isMore = !this.isMore;
        }).catch(err => {
          console.error(err);
          this.$alert('请求超时，刷新重试！')
        });
      }
    }
  }
</script>

<style scoped>
  .demo-form{
    min-height: 400px;
    text-align: left;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    padding: 10px 10px 0 10px;
    margin-bottom: 20px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
  }
  .more {
    margin-left: 1000px;
    padding-top: 20px;
    color: #494090;
  }
</style>

<style>
  .el-rate {
    height: 20px;
    line-height: 2.5;
    margin-left: 50px;
    text-align: left;
  }
  .el-timeline {
    padding-left: 0;
  }
</style>
