<template>
  <div class="sidebar">
    <div class="collapsebar"><a @click="collapse"><i class="el-icon-menu"></i></a></div>
    <el-menu class="el-menu-vertical-demo"
             unique-opened
             router
             text-color="#333"
             active-text-color=#20a0ff
             background-color="#F4F5F9"
             :collapse="isCollapse"
             style="text-align: left">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-location"></i><span slot="title">导航一呀</span></template>
        <el-menu-item-group>
          <el-menu-item index="job">找工作</el-menu-item>
          <el-menu-item index="house">找房子</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i><span slot="title">导航二呀</span></template>
        <el-menu-item-group>
          <el-menu-item index="aaa">aaa</el-menu-item>
          <el-menu-item index="bbb">bbb</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i><span slot="title">导航三呀</span></template>
        <el-menu-item-group>
          <el-menu-item index="ccc">ccc</el-menu-item>
          <el-menu-item index="ddd">ddd</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
    import bus from './bus';
    export default {
      name: "aside",
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

<style scoped>
  .sidebar {
    display: block;
    top: 56px;
    left: 0;
    bottom: 0;
    float: left;
    position: fixed;
    background-color: #F4F5F9
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
  .el-menu-vertical-demo:not(.el-menu--collapse){
    width: 200px;
  }
</style>
