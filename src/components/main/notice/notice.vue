<template>
  <div class="notice">
    <div class="top">
      <span class="top-title">——&nbsp;&nbsp;最新公告&nbsp;&nbsp;——</span>
    </div>
    <div class="bottom">
      <el-collapse v-model="activeNames" @change="handleChange" class="noticeCollapse">
        <el-collapse-item v-for="(item,index) in collapseItems" :title="'【'+ item.date+ '】' + item.title" :name="item.name" :key = "item.name">
          <div> {{item.content}} </div>
        </el-collapse-item>
      </el-collapse>
      <el-button type="text" class="more" @click="moreNotice">更多>>></el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "notice",
    data() {
      return {
        active:'',
        activeNames: [], //默认展开的面板（手风琴模式为str，否则为array）
        collapseItems: [],
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      getNotice() {
        this.$axios.get('http://127.0.0.1:5000/get5Notice')
          .then((response) => {
            if(response.data){
              console.log(response.data.data);
              this.collapseItems = response.data.data;
              this.active = response.data.data[0]['name'];
              this.activeNames = [this.active]
            }
          }).catch(err => {
            console.log(err);
            this.$alert('请求超时，刷新重试！')
        })
      },
      moreNotice() {
        this.$router.push('/moreNotice')
      }
    },
    mounted() {
      this.getNotice()
    }
  }
</script>

<style scoped>
  .notice .top {
    width: 100%;
    height: 100px;
    line-height: 100px;
    border: 1px solid #e3e3e3;
    background-color: #DDE2EF
  }
  .notice .top-title {
    font-size: 22px;
  }
  .notice .bottom {
    width: 100%;
    border: 1px solid #e3e3e3;
    padding-bottom: 10px;
  }
  .more {
    margin-left: 1000px;
    padding-top: 20px;
    color: #494090;
  }
</style>
