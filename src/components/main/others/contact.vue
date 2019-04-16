<template>
  <section>
    <el-row>
      <el-col :span="24">
        <div class="top" style="width:100%; height: 100px; line-height: 100px; background-color: #DDE2EF">
          <span class="top-title">——&nbsp;&nbsp;联系我们&nbsp;&nbsp;——</span>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="bottom" style="width:100%; height: 410px;">
          <img :src="imgURL" style="width: 410px; height: 410px; border-right: 1px solid #e3e3e3; float: left;">
          <div class="bottom-right" style="float:left;">
            <!--<el-form class="bottom-contact" ref="form" :model="form">-->
              <!--<el-form-item label="仓库地址:">-->
                <!--<a href="https://github.com/dimplewangwuhui/front_controlpanel" target="_blank">front_controlpanel</a>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="联系作者:">-->
                <!--<span>Dimple老王</span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="联系微信:">-->
                <!--<img :src="wechatURL" style="width: 150px; height: 150px">-->
              <!--</el-form-item>-->
            <!--</el-form>-->
            <div class="bottom-content">If you have any questions, you can add my WeChat to contact me.</div>
            <div class="bottom-content">I will try my best to answer them for you.</div>
            <div class="bottom-content">仓库地址:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/dimplewangwuhui/front_controlpanel" target="_blank">front_controlpanel</a></div>
            <div class="bottom-content">联系作者:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dimple老王</div>
            <div class="bottom-content">联系微信:</div>
            <div class="bottom-content"><img :src="wechatURL" style="width: 150px; height: 150px"></div>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  export default {
    name: "contact",
    data(){
      return {
        imgURL:require("../../../assets/img/me.jpg"),
        wechatURL:require("../../../assets/img/wechat.jpg"),
        form: {

        }
      }
    },
  }
</script>

<style>
  .top-title {
    font-size: 22px;
  }
  .top {
    border: 1px solid #e3e3e3;
  }
  .bottom {
    border: 1px solid #e3e3e3;
  }
  .bottom-content {
    margin-top: 20px;
    margin-left: 75px;
    font-size: 18px;
    text-align: left;
  }
</style>
