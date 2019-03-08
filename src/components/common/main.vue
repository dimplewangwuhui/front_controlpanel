<template>
  <div>
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">

      <div class="breadcrumb-container">
        <el-breadcrumb class="breadcrumb-inner" separator-class="el-icon-arrow-right">
          <!--<el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>-->
          <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="content_wrapper">
        <div class="content" style="flex:1;">
          <div class="content_inner">
            <router-view></router-view>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import bus from './bus'
  import vHead from './Header.vue';
  import vSidebar from './Sidebar.vue';
    export default {
      name: "main",
      components: {
        vHead, vSidebar
      },
      data() {
        return {
          collapse: false
        }
      },
      mounted() {
        bus.$on('isCollapse', msg => {
          this.collapse = msg;
        });
        document.querySelector('body').setAttribute('style', 'background-color:#fff');
        // console.log(this.$route.matched)
      },
    }
</script>

<style scoped>
  .breadcrumb-container {
    height: 51px;
    line-height: 51px;
    width: 100%;
    border-bottom: 1px dotted #909399;
  }
  .breadcrumb-inner{
    line-height: 51px;
    padding-left: 10px;
  }
  .content-box {
    position: absolute;
    float: left;
    top: 56px;
    left: 200px;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    background-color: #fff;
  }
  .content_wrapper{
    display: flex;
    flex-direction: column;
    height:100%;
  }
  .content {
    width: auto;
    padding: 10px;
  }
  .content-collapse {
    left: 65px;
  }

</style>
