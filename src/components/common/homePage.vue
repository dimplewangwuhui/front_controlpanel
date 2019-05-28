<template>
  <div class="homePage">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      router
      @select="handleSelect"
      background-color="#494090"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1" style="margin-left: 100px">
        <template slot="title"><span slot="title">数据采集</span></template>
        <el-menu-item-group>
          <!--<el-menu-item index="job">找工作</el-menu-item>-->
          <el-menu-item index="house">找房子</el-menu-item>
          <el-menu-item index="agency">找中介</el-menu-item>
          <el-menu-item index="image">找图片</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">可视化展示</template>
        <el-menu-item-group>
          <el-submenu index="echarts">
            <template slot="title">图表展示</template>
            <el-menu-item index="echarts_price">租金比较</el-menu-item>
            <el-menu-item index="echarts_trend">租金走势</el-menu-item>
            <el-menu-item index="echarts_count">租房数量</el-menu-item>
            <el-menu-item index="echarts_area">租房面积</el-menu-item>
            <el-menu-item index="ranking">小区排名</el-menu-item>
          </el-submenu>
          <el-menu-item index="wordCloud">词云展示</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">新闻资讯</template>
        <el-menu-item-group>
          <el-menu-item index="news">楼讯主页</el-menu-item>
          <el-menu-item index="news_report">热点新闻</el-menu-item>
          <el-menu-item index="news_subject">特色专题</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">用户管理</template>
        <el-menu-item-group>
          <el-menu-item index="userInfo">个人信息</el-menu-item>
          <el-menu-item index="updatePwd">修改密码</el-menu-item>
          <el-menu-item index="userManage" v-if="show">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">留言管理</template>
        <el-menu-item-group>
          <el-menu-item index="advise">留言反馈</el-menu-item>
          <el-menu-item index="adviseManage" v-if="show">留言管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">公告管理</template>
        <el-menu-item-group>
          <el-menu-item index="notice">查看公告</el-menu-item>
          <el-menu-item index="moreNotice" v-if="show">公告管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">更多</template>
        <el-menu-item-group>
          <el-menu-item index="baidu">百度一下</el-menu-item>
          <el-menu-item index="contact">联系我们</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="" style="margin-left: 20%">
        <el-button class="goLogin" type="text" @click="login" style="color: #fff">{{ logins }}</el-button>
      </el-menu-item>
      <el-menu-item index="8">
        <el-button class="goRegister" type="text" @click="register" style="color: #fff">注册</el-button>
      </el-menu-item>
    </el-menu>

    <el-carousel :interval="2000" arrow="hover" height="100%" class="carousel">
      <el-carousel-item>
        <div style="float: left; width: 700px; height: 600px;">
          <el-row style="">
            <el-col :span="6">
              <div style="width: 100px; height: 100px; background-color: #fff; margin-left: 50px">
                <img :src=logo style="width: 50px; height: 50px; padding-top: 25px">
              </div>
            </el-col>
            <el-col :span="18">
              <div style="font-size: 25px; margin-top: 120px; margin-left: -150px">基于人工智能的</div>
              <div style="font-size: 50px; margin-top: 15px; margin-left: -150px">租房信息分析平台</div>
              <div style="font-size: 18px; margin-top: 30px; margin-left: -150px">分析安居客大量房源数据</div>
              <div style="font-size: 18px; margin-top: 10px; margin-left: -150px">提供清晰直观的图表展示，良好的界面设计，简易的功能操作</div>
              <div style="font-size: 18px; margin-top: 10px; margin-left: -150px">提供专业化、标准化服务，满足各类用户所需</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div style="margin: 0 auto">
                <i class="el-icon-help" style="font-size: 250px; color: #fff; margin-top: 80px"></i>
              </div>
            </el-col>
          </el-row>
        </div>
        <div id="mapChart" style="width: 600px; height: 600px; float: right; margin-top: -20px; margin-right: 50px"></div>
      </el-carousel-item>

      <el-carousel-item>
        <div style="float: left; width: 700px; height: 600px;">
          <el-row style="">
            <el-col :span="6">
              <div style="width: 100px; height: 100px; background-color: #fff; margin-left: 50px">
                <img :src=logo style="width: 50px; height: 50px; padding-top: 25px">
              </div>
            </el-col>
            <el-col :span="18">
              <div style="font-size: 25px; margin-top: 120px; margin-left: -150px">基于人工智能的</div>
              <div style="font-size: 50px; margin-top: 15px; margin-left: -150px">租房信息分析平台</div>
              <div style="font-size: 18px; margin-top: 30px; margin-left: -150px">分析安居客大量房源数据</div>
              <div style="font-size: 18px; margin-top: 10px; margin-left: -150px">提供清晰直观的图表展示，良好的界面设计，简易的功能操作</div>
              <div style="font-size: 18px; margin-top: 10px; margin-left: -150px">提供专业化、标准化服务，满足各类用户所需</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div style="margin: 0 auto">
                <i class="el-icon-help" style="font-size: 250px; color: #fff; margin-top: 80px"></i>
              </div>
            </el-col>
          </el-row>
        </div>
        <div id="bjCountChart" style="width: 500px; height: 500px; margin-left: 800px; padding-top: 80px"></div>
      </el-carousel-item>

      <el-carousel-item>
        <div style="float: left; width: 700px; height: 600px;">
          <el-row style="">
            <el-col :span="6">
              <div style="width: 100px; height: 100px; background-color: #fff; margin-left: 50px">
                <img :src=logo style="width: 50px; height: 50px; padding-top: 25px">
              </div>
            </el-col>
            <el-col :span="18">
              <div style="font-size: 25px; margin-top: 120px; margin-left: -150px">基于人工智能的</div>
              <div style="font-size: 50px; margin-top: 15px; margin-left: -150px">租房信息分析平台</div>
              <div style="font-size: 18px; margin-top: 30px; margin-left: -150px">分析安居客大量房源数据</div>
              <div style="font-size: 18px; margin-top: 10px; margin-left: -150px">提供清晰直观的图表展示，良好的界面设计，简易的功能操作</div>
              <div style="font-size: 18px; margin-top: 10px; margin-left: -150px">提供专业化、标准化服务，满足各类用户所需</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div style="margin: 0 auto">
                <i class="el-icon-help" style="font-size: 250px; color: #fff; margin-top: 80px"></i>
              </div>
            </el-col>
          </el-row>
        </div>
        <div style=" float: right; margin-top: 0px; margin-right: 50px">
          <div style="margin: 0 auto">
            <i class="el-icon-help" style="font-size: 250px; color: #fff; margin-top: -125px"></i>
          </div>
          <div class="bottom-right" style="font-size: 20px; text-align: center">
            <div class="bottom-content">If you have any questions, you can add my WeChat to contact me.</div>
            <div class="bottom-content">I will try my best to answer them for you.</div>
            <div class="bottom-content">仓库地址:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/dimplewangwuhui/front_controlpanel" target="_blank">front_controlpanel</a></div>
            <div class="bottom-content">联系作者:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dimple老王</div>
            <div class="bottom-content">联系微信:</div>
            <div style="margin-top: -30px; margin-left: -80px"><img :src="wechatURL" style="width: 150px; height: 150px"></div>
          </div>
        </div>
      </el-carousel-item>

    </el-carousel>
  </div>


</template>

<script>
  import echarts from 'echarts'
  import '../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
  import '../../../node_modules/echarts/map/js/world.js' // 引入世界地图数据

  export default {
    name: "homePage",
    data() {
      return {
        logins: '登录',
        show: 'false',
        logo: require('../../assets/img/房子.png'),
        allChart: null,
        mapChart: null,
        bjCountChart: null,
        imagesbox: {
          idView1: require("../../assets/img/timg.jpg"),
          idView2: require("../../assets/img/sky.jpg"),
        },
        wechatURL: require('../../assets/img/wechat.jpg'),
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: true},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          },
          x: 'left'
        },
        legend: {
          data:['最低租金','最高租金','平均租金'],
          x: 'right',
          orient: 'vertical',
          right: 100,
          padding: [0, 50, 0, 0]
        },
        series: [
          { name:'最低租金', type:'bar', data:[] },
          { name:'最高租金', type:'bar', data:[] },
          { name:'平均租金', type:'line', data:[] }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value} 元/月'
            }
          }
        ],
      };
    },

    methods: {
      login() {
        if(this.logins !== '登录'){
          this.$confirm('您已经登录，切勿重复登录，是否退出登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.logins = '登录';
            sessionStorage.clear();
            this.$router.push('/login');
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
        }else {
          this.$router.push('/login')
        }
      },
      register() {
        this.$router.push('/register')
      },

      drawMapChart(){
        // 基于准备好的dom，初始化echarts实例
        var myChartContainer = document.getElementById('mapChart');
        var mapChart = this.$echarts.init(myChartContainer);

        function randomData() {
          return Math.round(Math.random()*500);
        }
        // 绘制图表
        var optionMap = {
          tooltip: {},
          legend: {
            orient: 'vertical',
            left: 'left',
            data:['']
          },
          visualMap: {
            min: 0,
            max: 1500,
            left: '0%',
            top: 'center',
            text: ['高','低'],
            calculable : true,
            color:['#0b50b9','#c3e2f4']
          },
          selectedMode: 'single',
          series : [
            {
              name: '平均租金',
              type: 'map',
              mapType: 'china',
              itemStyle: {
                normal:{
                  borderColor: 'rgba(0, 0, 0, 0.2)'
                },
                emphasis:{
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 20,
                  borderWidth: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              showLegendSymbol: true,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              data:[
                {name: '北京',value: 2317.54 },
                {name: '上海',value: 1927.33 },
                {name: '广州',value: 1626.96 },
                {name: '广东',value: 1646.33 },
                {name: '湖北',value: 963.58 },
                {name: '浙江',value: 1746.99 },
                {name: '山西',value: 1089.52 },
                {name: '河北',value:''},
                {name: '辽宁',value:''},
                {name: '吉林',value:''},
                {name: '黑龙江',value:''},
                {name: '江苏',value:''},
                {name: '安徽',value:''},
                {name: '福建',value:''},
                {name: '江西',value:''},
                {name: '山东',value:''},
                {name: '河南',value:''},
                {name: '湖南',value:''},
                {name: '海南',value:''},
                {name: '四川',value:''},
                {name: '贵州',value:''},
                {name: '云南',value:''},
                {name: '陕西',value:''},
                {name: '甘肃',value:''},
                {name: '青海',value:''},
                {name: '台湾',value:''},
                {name: '重庆',value:''},
                {name: '天津',value:''},
                {name: '广西',value:''},
                {name: '宁夏',value:''},
                {name: '西藏',value:''},
                {name: '内蒙古',value:''},
                {name: '香港',value:''},
                {name: '澳门',value:''},
              ]
            }
          ]
        };
        mapChart.setOption(optionMap);
      },

      drawBjCountCharts(){
        this.bjCountChart = echarts.init(document.getElementById('bjCountChart'));
        this.bjCountChart.setOption({
          title : {
            text: '北京市租房数量比较',
            subtext: '数据来源:安居客',
            sublink: 'https://beijing.anjuke.com',
            x:'center',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['海淀区','大兴区','通州区','昌平区','朝阳区','西城区','密云区','门头沟区','东城区','房山区','石景山区','延庆区','丰台区','顺义区','北京周边区'],
            padding: [20,20,0,0]
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series : [
            {
              type: 'pie',
              radius : '75%',
              center: ['65%', '60%'],
              data:[],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        this.$axios.get('http://127.0.0.1:5000/count')
          .then((response) => {
            if(response){
              console.log('=================', response.data);
              this.bjCountChart.setOption({
                series: [{
                  name: '北京市',
                  type: 'pie',
                  data:[
                    { name:'延庆区', value: response.data[0]['beijing'][0] },
                    { name:'石景山区', value: response.data[0]['beijing'][1] },
                    { name:'昌平区', value: response.data[0]['beijing'][2] },
                    { name:'西城区', value: response.data[0]['beijing'][3] },
                    { name:'顺义区', value: response.data[0]['beijing'][4] },
                    { name:'东城区', value: response.data[0]['beijing'][5] },
                    { name:'门头沟区', value: response.data[0]['beijing'][6] },
                    { name:'通州区', value: response.data[0]['beijing'][7] },
                    { name:'朝阳区', value: response.data[0]['beijing'][8] },
                    { name:'密云区', value: response.data[0]['beijing'][9] },
                    { name:'丰台区', value: response.data[0]['beijing'][10] },
                    { name:'北京周边区', value: response.data[0]['beijing'][11] },
                    { name:'大兴区', value: response.data[0]['beijing'][12] },
                    { name:'海淀区', value: response.data[0]['beijing'][13] },
                    { name:'房山区', value: response.data[0]['beijing'][14] },
                  ]
                }],
              });
            }
          }).catch(err => {
          console.error(err);
          this.$alert('请求超时，刷新重试！')
        });
      },
    },

    mounted() {
      let username = sessionStorage.getItem('ms_username');
      if (username) {
        this.logins = username;
        if (username === 'admin'){
          this.show = true
        }else {
          this.show = false
        }
      }

      this.drawMapChart();
      this.drawBjCountCharts();
    }
  }
</script>


<style scoped>
  .carousel {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #DDE2EF;
  }
  .goLogin :hover{
    color: #409EFF;
  }
  .goRegister :hover{
    color: #409EFF;
  }
  .bottom-content {
    margin-top: 20px;
    margin-left: 75px;
    font-size: 18px;
    text-align: left;
  }
</style>

