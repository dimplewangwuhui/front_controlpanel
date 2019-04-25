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
          <el-menu-item index="job">找工作</el-menu-item>
          <el-menu-item index="house">找房子</el-menu-item>
          <el-menu-item index="agency">找中介</el-menu-item>
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
          </el-submenu>
          <el-menu-item index="wordCloud">词云展示</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">用户管理</template>
        <el-menu-item-group>
          <el-menu-item index="userInfo">个人信息</el-menu-item>
          <el-menu-item index="updatePwd">修改密码</el-menu-item>
          <el-menu-item index="userManage" v-if="show">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">留言管理</template>
        <el-menu-item-group>
          <el-menu-item index="advise">留言反馈</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">公告管理</template>
        <el-menu-item-group>
          <el-menu-item index="notice">查看公告</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">更多</template>
        <el-menu-item-group>
          <el-menu-item index="news">租房资讯</el-menu-item>
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
        <div id="mapChart" style="width: 600px; height: 600px; float: right; margin-top: -20px; margin-right: 50px"></div>
      </el-carousel-item>
      <el-carousel-item>
        <div id="allChart" style="width: 600px; height: 300px; float: right; margin-top: 130px; margin-right: 50px"></div>
      </el-carousel-item>

      <!--<el-carousel-item>-->
        <!--<div id="mapChart3" style="width: 500px; height: 500px; margin-left: 800px; padding-top: 80px"></div>-->
      <!--</el-carousel-item>-->
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
        allChart: null,
        mapChart: null,
        mapChart3: null,
        imagesbox: {
          idView1: require("../../assets/img/timg.jpg"),
          idView2: require("../../assets/img/sky.jpg"),
        },
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

      drawAllChart() {
        this.allChart = echarts.init(document.getElementById('allChart'));
        this.allChart.setOption({
          //标题
          title: {
            text: '安居客各城市平均租金比较',
            subtext: '数据来源：安居客',
            sublink: 'https://beijing.anjuke.com/',
            x: 'center'
          },
          //提示框，鼠标悬浮交互时的信息提示
          tooltip: this.tooltip,
          toolbox: this.toolbox,
          legend: this.legend,
          grid: { left: '16%'},
          xAxis: [
            {
              type: 'category',
              data: ['上海', '北京', '太原',  '广州', '杭州', '武汉', '深圳'],
              axisPointer: {
                type: 'shadow'
              },
            }
          ],
          yAxis: this.yAxis,
          series: this.series
        });
        this.$axios.get('http://127.0.0.1:5000/getAjkCityPrice')
          .then((response) => {
            if(response){
              console.log(response.data);
              this.allChart.setOption({
                series: [
                  { name:'最低租金', type:'bar', data: response.data[0]['ajkCityMinPrice'] },
                  { name:'最高租金', type:'bar', data: response.data[0]['ajkCityMaxPrice'] },
                  { name:'平均租金', type:'line', data: response.data[0]['ajkCityAvgPrice'] }],
              });
            }
          }).catch(err => {
          console.error(err);
          this.$alert('请求超时，刷新重试！')
        });
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
                {name: '北京',value: randomData() },
                {name: '天津',value: randomData() },
                {name: '上海',value: randomData() },
                {name: '重庆',value: randomData() },
                {name: '河北',value: randomData() },
                {name: '河南',value: randomData() },
                {name: '云南',value: randomData() },
                {name: '辽宁',value: randomData() },
                {name: '黑龙江',value: randomData() },
                {name: '湖南',value: randomData() },
                {name: '安徽',value: randomData() },
                {name: '山东',value: randomData() },
                {name: '新疆',value: randomData() },
                {name: '江苏',value: randomData() },
                {name: '浙江',value: randomData() },
                {name: '江西',value: randomData() },
                {name: '湖北',value: randomData() },
                {name: '广西',value: randomData() },
                {name: '甘肃',value: randomData() },
                {name: '山西',value: randomData() },
                {name: '内蒙古',value: randomData() },
                {name: '陕西',value: randomData() },
                {name: '吉林',value: randomData() },
                {name: '福建',value: randomData() },
                {name: '贵州',value: randomData() },
                {name: '广东',value: randomData() },
                {name: '青海',value: randomData() },
                {name: '西藏',value: randomData() },
                {name: '四川',value: randomData() },
                {name: '宁夏',value: randomData() },
                {name: '海南',value: randomData() },
                {name: '台湾',value: randomData() },
                {name: '香港',value: randomData() },
                {name: '澳门',value: randomData() }
              ]
            }
          ]
        };
        mapChart.setOption(optionMap);
      }
    },
    mounted() {
      let username = sessionStorage.getItem('ms_username');
      if (username) {
        this.logins = username;
        if (username === 'admin'){
          this.show = true
        }
      }


      this.drawAllChart();
      this.drawMapChart();
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
</style>

