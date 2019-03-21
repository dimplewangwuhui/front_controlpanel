<template>
  <div class="sidebar">
    <div class="collapsebar"><a @click="collapse"><i class="iconfont icon-sort"></i></a></div>
    <el-menu class="el-menu-vertical-demo"
             unique-opened
             router
             text-color="#333"
             active-text-color=#fff
             background-color="#DDE2EF"
             :collapse="isCollapse"
             style="text-align: left">
      <el-submenu index="1">
        <template slot="title"><i class="iconfont icon-data"></i><span slot="title">数据采集</span></template>
        <el-menu-item-group>
          <el-menu-item index="job">找工作</el-menu-item>
          <el-menu-item index="house">找房子</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="iconfont icon-zhanshi"></i>可视化展示</template>
        <el-menu-item-group>
          <!--<el-menu-item index="echarts">图表展示</el-menu-item>-->
          <el-submenu index="echarts">
            <template slot="title"><i class="iconfont icon-biaoge"></i>图表展示</template>
            <el-menu-item index="echarts_price">租金比较</el-menu-item>
            <el-menu-item index="echarts_trend">租金走势</el-menu-item>
            <el-menu-item index="echarts_count">租房数量</el-menu-item>
            <el-menu-item index="echarts_area">租房面积</el-menu-item>
          </el-submenu>
          <el-menu-item index="wordCloud"><i class="iconfont icon-fsux_tubiao_ciyun"></i>词云展示</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="userManage">
        <i class="iconfont icon-yonghu"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title"><i class="iconfont icon-qita"></i>其他</template>
        <el-menu-item-group>
          <el-menu-item index="contact">联系我们</el-menu-item>
          <el-menu-item index="advise">建议留言</el-menu-item>
        </el-menu-item-group>
      </el-submenu>


    </el-menu>
  </div>
</template>

<script>
    import bus from './bus';
    export default {
      name: "sidebar",
      data() {
        return {
          isCollapse: false
        };
      },
      methods: {
        collapse(){
          this.isCollapse = !this.isCollapse;
          bus.$emit('isCollapse', this.isCollapse);
        }
      }
    }
</script>

<style>
  .sidebar {
    display: block;
    top: 56px;
    left: 0;
    bottom: 0;
    float: left;
    position: fixed;
    background-color: #DDE2EF
  }
  .collapsebar {
    color: rgb(144, 147, 153);
    height: 50px;
    line-height: 50px;
    width: 100%;
    padding: 0 0 0 5px;
    -webkit-transition: all .3s ease-out;
    transition: all .3s ease-out;
    text-align: left;
    cursor: pointer;
    border-bottom: 1px solid #fff;

    font-size: 22px;
  }
  .collapsebar a {
    margin-left: 16px;
  }
  .sidebar::-webkit-scrollbar{
    width: 0;
  }
  .el-menu-item :hover {
    background-color: red;
  }
  .el-menu-item.is-active {
    background-color: #494090 !important;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse){
    width: 200px;
  }
  .el-menu-item-group__title {
    padding: 0;
  }
</style>
