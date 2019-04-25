<template>
  <div class="ranking">
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>北京租房小区排行</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="bj_details">查看详情</el-button>
          </div>
          <div class="footer" v-for="(item,index) in bjrank">
            <a class="detail" target="_blank" :href = item.url> {{ item.city +' -- '+ item.region +' -- '+ item.village +' -- '+ item.count }} </a>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>上海租房小区排行</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="sh_details">查看详情</el-button>
          </div>
          <div class="footer" v-for="(item,index) in shrank">
            <a class="detail" target="_blank" :href = item.url> {{ item.city +' -- '+ item.region +' -- '+ item.village +' -- '+ item.count }} </a>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>广州租房小区排行</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="gz_details">查看详情</el-button>
          </div>
          <div class="footer" v-for="(item,index) in gzrank">
            <a class="detail" target="_blank" :href = item.url> {{ item.city +' -- '+ item.region +' -- '+ item.village +' -- '+ item.count }} </a>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>深圳租房小区排行</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="sz_details">查看详情</el-button>
          </div>
          <div class="footer" v-for="(item,index) in szrank">
            <a class="detail" target="_blank" :href = item.url> {{ item.city +' -- '+ item.region +' -- '+ item.village +' -- '+ item.count }} </a>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>武汉租房小区排行</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="wh_details">查看详情</el-button>
          </div>
          <div class="footer" v-for="(item,index) in whrank">
            <a class="detail" target="_blank" :href = item.url> {{ item.city +' -- '+ item.region +' -- '+ item.village +' -- '+ item.count }} </a>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>杭州租房小区排行</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="hz_details">查看详情</el-button>
          </div>
          <div class="footer" v-for="(item,index) in hzrank">
            <a class="detail" target="_blank" :href = item.url> {{ item.city +' -- '+ item.region +' -- '+ item.village +' -- '+ item.count }} </a>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>太原租房小区排行</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="ty_details">查看详情</el-button>
          </div>
          <div class="footer" v-for="(item,index) in tyrank">
            <a class="detail" target="_blank" :href = item.url> {{ item.city +' -- '+ item.region +' -- '+ item.village +' -- '+ item.count }} </a>
          </div>
        </el-card>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  export default {
    name: "ranking",
    data(){
      return {
        bjrank: '',
        shrank: '',
        gzrank: '',
        szrank: '',
        whrank: '',
        hzrank: '',
        tyrank: ''
      }
    },
    mounted(){
      this.getRank()
    },
    methods: {
      getRank(){
        this.$axios.get('http://127.0.0.1:5000/getRank')
          .then((response) => {
            if(response){
              this.bjrank = response.data[0];
              this.shrank = response.data[1];
              this.gzrank = response.data[2];
              this.szrank = response.data[3];
              this.whrank = response.data[4];
              this.hzrank = response.data[5];
              this.tyrank = response.data[6];
              console.log(response.data[0])
            }
          }).catch(err => {
            console.log(err);
            this.$alert('请求超时，刷新重试！')
        })
      },
      bj_details(){
        window.open('http://bj.anjuke.com')
      },
      sh_details(){
        window.open('http://sh.anjuke.com')
      },
      gz_details(){
        window.open('http://gz.anjuke.com')
      },
      sz_details(){
        window.open('http://sz.anjuke.com')
      },
      wh_details(){
        window.open('http://wh.anjuke.com')
      },
      hz_details(){
        window.open('http://hz.anjuke.com')
      },
      ty_details(){
        window.open('http://ty.anjuke.com')
      },
    }
  }
</script>

<style scoped>
  .box-card {
    margin: 10px;
  }
  .clearfix {
    font-size: 16px;
    text-align: left;
  }
  .footer {
    text-align: left;
    padding-left: 20px;
  }
  .detail {
    color: #000;
    font-size: 14px;
    text-decoration-line: none;
  }
  .footer :hover {
    color: #df5000;
  }
</style>
