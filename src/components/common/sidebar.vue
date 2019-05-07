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
          <!--<el-menu-item index="job">找工作</el-menu-item>-->
          <el-menu-item index="house">找房源</el-menu-item>
          <el-menu-item index="agency">找中介</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="iconfont icon-zhanshi"></i>数据展示</template>
        <el-menu-item-group>
          <!--<el-menu-item index="echarts">图表展示</el-menu-item>-->
          <el-submenu index="echarts">
            <template slot="title"><i class="iconfont icon-biaoge"></i>图表展示</template>
            <el-menu-item index="echarts_price">租金比较</el-menu-item>
            <el-menu-item index="echarts_trend">租金走势</el-menu-item>
            <el-menu-item index="echarts_count">租房数量</el-menu-item>
            <el-menu-item index="echarts_area">租房面积</el-menu-item>
            <el-menu-item index="ranking">小区排名</el-menu-item>
          </el-submenu>
          <el-menu-item index="wordCloud"><i class="iconfont icon-fsux_tubiao_ciyun"></i>词云展示</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="iconfont icon-yonghu"></i>用户面板</template>
        <el-menu-item-group>
          <el-menu-item index="userInfo">个人主页</el-menu-item>
          <el-menu-item index="updatePwd">修改密码</el-menu-item>
          <el-menu-item index="userManage" v-if="show">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="iconfont icon-liuyan"></i>留言面板</template>
        <el-menu-item-group>
          <el-menu-item index="advise">留言反馈</el-menu-item>
          <el-menu-item index="adviseManage" v-if="show">留言管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="iconfont icon-gonggao"></i>公告面板</template>
        <el-menu-item-group>
          <el-menu-item index="notice">查看公告</el-menu-item>
          <el-menu-item index="moreNotice" v-if="show">公告管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!--<el-menu-item index="advise">-->
        <!--<i class="iconfont icon-liuyan"></i>-->
        <!--<span slot="title">建议留言</span>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="notice">-->
        <!--<i class="iconfont icon-gonggao"></i>-->
        <!--<span slot="title">查看公告</span>-->
      <!--</el-menu-item>-->
      <el-submenu index="6">
        <template slot="title"><i class="iconfont icon-qita"></i>更多</template>
        <el-menu-item-group>
          <el-menu-item index="news">租房资讯</el-menu-item>
          <el-menu-item index="baidu">百度一下</el-menu-item>
          <el-menu-item index="contact">联系我们</el-menu-item>
          <!--<el-menu-item index="ComUpload">上传图片</el-menu-item>-->
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
          isCollapse: false,
          show: false,  //admin时为true，否则为false，为true时显示导航栏（用户管理）
        };
      },
      methods: {
        collapse(){
          this.isCollapse = !this.isCollapse;
          bus.$emit('isCollapse', this.isCollapse);
        }
      },
      mounted() {
        let username = sessionStorage.getItem('ms_username');
        if(username === 'admin'){
          this.show = true
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
