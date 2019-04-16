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
          <el-menu-item index="userManage">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">其他</template>
        <el-menu-item-group>
          <el-menu-item index="contact">联系我们</el-menu-item>
          <el-menu-item index="advise">建议留言</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="5" style="margin-left: 40%">
        <el-button class="goLogin" type="text" @click="login" style="color: #fff">{{ logins }}</el-button>
      </el-menu-item>
      <el-menu-item index="6">
        <el-button class="goRegister" type="text" @click="register" style="color: #fff">注册</el-button>
      </el-menu-item>
    </el-menu>

    <el-carousel :interval="2000" arrow="hover" height="100%" class="carousel">
      <el-carousel-item>
        <div id="mapChart" style="width: 500px; height: 500px; margin-left: 800px; padding-top: 80px"></div>
      </el-carousel-item>
      <el-carousel-item>
        <div id="mapChart2" style="width: 500px; height: 500px; margin-left: 800px; padding-top: 80px"></div>
      </el-carousel-item>
      <el-carousel-item>
        <div id="mapChart3" style="width: 500px; height: 500px; margin-left: 800px; padding-top: 80px"></div>
      </el-carousel-item>
    </el-carousel>
  </div>


</template>

<script>
  import echarts from 'echarts'
  import '../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
  import '../../../node_modules/echarts/map/js/world.js' // 引入世界地图数据
  // import './baidu_map_api'
  export default {
    name: "homePage",
    data(){
      return{
        logins:'登录',
        mapChart: null,
        mapChart2: null,
        mapChart3: null,
        imagesbox: {
          idView1:require("../../assets/img/timg.jpg"),
          idView2:require("../../assets/img/sky.jpg"),
        },
        data: [{name: "上海",value: 29780},
          {name: "杭州",value: 5632},
          {name: "广州",value: 15769},
          {name: "深圳",value: 8259},
          {name: "武汉",value: 8678},
          {name: "北京",value: 20259},
          {name: "太原",value: 4080},
        ],
        geoCoordMap: {
          "上海": [121.48, 31.22],
          "杭州": [120.19, 30.26],
          "广州": [113.23, 23.16],
          "深圳": [114.07, 22.62],
          "武汉": [114.31, 30.52],
          "北京": [116.46, 39.92],
          "太原": [112.53, 37.87],
        },
        max: 100000,
        min: 900,
        maxSize4Pin: 100,
        minSize4Pin: 20,
      };
    },

    methods:{
      login(){
        this.$router.push('/login')
      },
      register(){
        this.$router.push('/register')
      },
      convertData(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = this.geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      },

      drawMapchart(){
        this.mapChart = echarts.init(document.getElementById('mapChart'));
        this.mapChart.setOption({
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        })
      },

      drawMapchart2(){
        this.mapChart2 = echarts.init(document.getElementById('mapChart2'));
        this.mapChart2.setOption({
          title: {
            text: '购买对象所在省份TOP10',
            subtext: '销售面积区间',
            x: 'center',
            textStyle: {
              color: '#ccc'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function(params) {
              if (typeof(params.value)[2] == "undefined") {
                return params.name + ' : ' + params.value;
              } else {
                return params.name + ' : ' + params.value[2];
              }
            }
          },
          legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data: ['sell_area'],
            textStyle: {
              color: '#fff'
            }
          },
          visualMap: {
            show: false,
            min: 0,
            max: 500,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            seriesIndex: [1],
            inRange: {
              color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            }
          },
          geo: {
            show: true,
            map: 'zhongguo',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false,
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
              },
              emphasis: {
                areaColor: '#2B91B7',
              }
            }
          },
          series: [{
            name: 'credit_pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: this.convertData(this.data),
            symbolSize: function(val) {
              return val[2] / 10000;
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#05C3F9'
              }
            }
          },
            {
              type: 'map',
              map: 'zhongguo',
              geoIndex: 0,
              aspectScale: 0.75, //长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#031525',
                  borderColor: '#3B5077',
                },
                emphasis: {
                  areaColor: '#2B91B7'
                }
              },
              animation: false,
              data: data
            },
            {
              name: '点',
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: 'pin',
              symbolSize: function(val) {
                var a = (this.maxSize4Pin - this.minSize4Pin) / (this.max - this.min);
                var b = this.minSize4Pin - a * this.min;
                b = this.maxSize4Pin - a * this.max;
                return a * val[2] + b;
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 9,
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#F62157', //标志颜色
                }
              },
              zlevel: 6,
              data: this.convertData(this.data),
            },
            {
              name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: this.convertData(this.data.sort(function(a, b) {
                return b.value - a.value;
              }).slice(0, 5)),
              symbolSize: function(val) {
                return val[2] / 5000;
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#05C3F9',
                  shadowBlur: 10,
                  shadowColor: '#05C3F9'
                }
              },
              zlevel: 1
            },
          ]
        })
      }
    },
    mounted() {
      if(sessionStorage.getItem('ms_username')){
        this.logins = sessionStorage.getItem('ms_username');
        // this.$refs.login.style.fontSize = '20px'
      };
      this.drawMapchart();
      this.drawMapchart2();
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

