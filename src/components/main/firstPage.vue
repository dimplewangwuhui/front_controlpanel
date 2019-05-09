<template>
  <div class="firstPage">
    <el-row :gutter="10">
      <el-col :span="16">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-card class="box-card" style="height: 245px">
              <div slot="header" class="clearfix" style="text-align: left">
                <span>快捷按钮</span>
              </div>
              <div>
                <div>
                  <router-link to='/house' style="margin-right: 10px"><el-button style="background-color: #F4F5F9;"><div><i class="iconfont icon-data" style="padding-right: 0"></i></div><div style="margin-top: 10px">房源面板</div></el-button></router-link>
                  <router-link to='/agency' style="margin-right: 10px"><el-button style="background-color: #F4F5F9;"><div><i class="iconfont icon-yonghu" style="padding-right: 0"></i></div><div style="margin-top: 10px">中介面板</div></el-button></router-link>
                  <router-link to='/userInfo'><el-button style="background-color: #F4F5F9;"><div><i class="iconfont icon-yonghu1" style="padding-right: 0"></i></div><div style="margin-top: 10px">个人主页</div></el-button></router-link>
                </div>
                <div style="margin-top: 10px">
                  <router-link to='/advise' style="margin-right: 10px"><el-button style="background-color: #F4F5F9;"><div><i class="iconfont icon-liuyan" style="padding-right: 0"></i></div><div style="margin-top: 10px">留言反馈</div></el-button></router-link>
                  <router-link to='/notice' style="margin-right: 10px"><el-button style="background-color: #F4F5F9;"><div><i class="iconfont icon-gonggao" style="padding-right: 0"></i></div><div style="margin-top: 10px">查看公告</div></el-button></router-link>
                  <router-link to='/news'><el-button style="background-color: #F4F5F9;"><div><i class="iconfont icon-data" style="padding-right: 0"></i></div><div style="margin-top: 10px">租房资讯</div></el-button></router-link>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card class="box-card" style="height: 245px">
              <div slot="header" class="clearfix" style="text-align: left">
                <span>进度表</span>
              </div>
              <div>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="0"></el-progress>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="80" color="rgba(142, 113, 199, 0.7)"></el-progress>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
              </div>
            </el-card>
          </el-col>
          <el-col :span="24" style="margin-top: 15px">
            <el-card class="box-card" >
              <div slot="header" class="clearfix" style="text-align: left">
                <span>好房源，上安居客</span>
              </div>
              <div>
                <el-carousel :interval="2000" type="card" height="200px">
                  <el-carousel-item>
                    <a href="https://bj.zu.anjuke.com/?from=navigation" target="_blank"><img :src="bgimg1" style="width: 100%; height: 100%; background: no-repeat;"></a>
                  </el-carousel-item>
                  <el-carousel-item>
                    <a href="https://bj.zu.anjuke.com/?from=navigation" target="_blank"><img :src="bgimg2" style="width: 100%; height: 100%; background: no-repeat;"></a>
                  </el-carousel-item>
                  <el-carousel-item>
                    <a href="https://bj.zu.anjuke.com/?from=navigation" target="_blank"><img :src="bgimg3" style="width: 100%; height: 100%; background: no-repeat;"></a>
                  </el-carousel-item>
                  <el-carousel-item>
                    <a href="https://bj.zu.anjuke.com/?from=navigation" target="_blank"><img :src="bgimg4" style="width: 100%; height: 100%; background: no-repeat;"></a>
                  </el-carousel-item>
                  <el-carousel-item>
                    <a href="https://bj.zu.anjuke.com/?from=navigation" target="_blank"><img :src="bgimg5" style="width: 100%; height: 100%; background: no-repeat;"></a>
                  </el-carousel-item>
                  <el-carousel-item>
                    <a href="https://bj.zu.anjuke.com/?from=navigation" target="_blank"><img :src="bgimg6" style="width: 100%; height: 100%; background: no-repeat;"></a>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </el-card>
          </el-col>
          <el-col :span="24" style="margin-top: 15px">
            <el-card class="box-card" >
              <div slot="header" class="clearfix" style="text-align: left">
                <span>作者心语</span>
              </div>
              <div style="text-align: left">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                本系统页面是由Vue.js + Element-ui搭建，界面良好，操作简易，适合所有用户上手。
                项目代码已上传至<a href="https://github.com/dimplewangwuhui/front_controlpanel" target="_blank" style="text-decoration: none">GitHub</a>，
                由于作者初学前端框架，有所欠缺的地方，还希望大家联系我， 我们共同学习，共同进步。
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="text-align: left">
            <span>前端框架</span>
          </div>
          <div>
            <table class="versionTable">
              <tr>
                <td style="width: 25%">当前版本</td>
                <td>2.8.2</td>
              </tr>
              <tr>
                <td>基于框架</td>
                <td>Vue.js + Element-ui</td>
              </tr>
              <tr>
                <td>主要特色</td>
                <td>简洁 / 轻量 / 快速 / 数据驱动 / 模块友好 / 组件化</td>
              </tr>
              <tr>
                <td>获取地址</td>
                <td><a style="text-decoration: none" href="https://element.eleme.io/#/zh-CN" target="_blank">https://element.eleme.io/#/zh-CN</a></td>
              </tr>
            </table>
          </div>
        </el-card>
        <el-calendar v-model="value" style="width: 100%; height: 400px; margin-top: 15px">
        </el-calendar>
      </el-col>
    </el-row>



    <!--<div class="counter">-->
      <!--<a href="http://www.reliablecounter.com" target="_blank">-->
        <!--<img src="http://www.reliablecounter.com/count.php?page=localhost:8080/firstPage&digit=style/plain/1/&reloads=1" alt="" title="" border="0">-->
      <!--</a><br />-->
      <!--<a href="http://" target="_blank" style="font-family: Geneva, Arial; font-size: 9px; color: #330010; text-decoration: none;"></a>-->
    <!--</div>-->



  </div>
</template>

<script>
  export default {
    name: "firstPage",
    data() {
      return {
        value: new Date(),
        bgimg1: require('../../assets/img/ajk1.jpg'),
        bgimg2: require('../../assets/img/ajk2.jpg'),
        bgimg3: require('../../assets/img/ajk3.jpg'),
        bgimg4: require('../../assets/img/ajk4.jpg'),
        bgimg5: require('../../assets/img/ajk5.jpg'),
        bgimg6: require('../../assets/img/ajk6.jpg'),
      }
    },
    methods: {
      changeHeaderColor() {
        console.log('=====', this.headerColor);
      }
    }
  }
</script>

<style scoped>

</style>

<style>
  .el-calendar-table .el-calendar-day {
    height: 40px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    text-align: left;
    font-size: 14px;
    color: #606266;
  }
  .versionTable td {
    border: 1px solid #EBEEF5;
    padding: 10px;
  }
  .el-progress {
    margin-bottom: 10px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
