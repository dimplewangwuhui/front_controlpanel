<template>
  <section class="chart-container">
    <el-row>
      <el-col :span="24" >
        <div id="allChart" style="width: 100%; height: 300px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="bjChart" style="width:100%; height:300px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="shChart" style="width:100%; height:300px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="gzChart" style="width:100%; height:300px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="szChart" style="width:100%; height:300px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="whChart" style="width:100%; height:300px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="hzChart" style="width:100%; height:300px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="tyChart" style="width:100%; height:300px;"></div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {
        allChart: null,
        bjChart: null,
        shChart: null,
        gzChart: null,
        szChart: null,
        whChart: null,
        hzChart: null,
        tyChart: null,
        bjRegionData: [],
        shRegionData: [],
        gzRegionData: [],
        szRegionData: [],
        whRegionData: [],
        hzRegionData: [],
        tyRegionData: [],

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
          { name:'最高租金', type:'bar', data:[],
            // itemStyle : {
            //   normal : {
            //     color:'#494090',
            //     lineStyle:{
            //       color:'#494090'
            //     }
            //   }
            // }
          },
          { name:'平均租金', type:'line', data:[] }
        ],
        xAxis: [
          {
            type: 'category',
            data: [],
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value} 元/月'
            }
          }
        ],

      }
    },

    methods: {
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
          xAxis: [
            {
              // 'value' 数值轴，适用于连续数据。
              // 'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
              // 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
              // 'log' 对数轴。适用于对数数据。
              type: 'category',
              data: ['上海', '北京', '太原',  '广州', '杭州', '武汉', '深圳'],
              axisPointer: {
                type: 'shadow'
              },
            }
          ],
          yAxis: this.yAxis,
          // 系列列表,每个系列通过 type 决定自己的图表类型
          series: this.series
        });
        this.$axios.get('http://127.0.0.1:5000/getAjkAllRegionPrice')
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

      drawBjChart() {
        this.bjChart = echarts.init(document.getElementById('bjChart'));
        this.bjChart.setOption({
          title: {
            text: '北京市各个区平均租金比较',
            subtext: '数据来源：安居客',
            sublink: 'https://bj.anjuke.com/',
            x: 'center'
          },
          tooltip: this.tooltip,
          toolbox: this.toolbox,
          legend: this.legend,
          grid: { left: '16%'},
          xAxis: this.xAxis,
          yAxis: this.yAxis,
          series: this.series,
        });
        this.$axios.get('http://127.0.0.1:5000/getAjkAllRegionPrice')
          .then((response) => {
            if(response){
              this.bjRegionData = response.data[0]['bjRegion'];
              console.log(response.data);
              this.bjChart.setOption({
                xAxis: [
                  {
                    type: 'category',
                    data: this.bjRegionData,
                    axisPointer: {
                      type: 'shadow'
                    },
                    axisLabel: {
                      interval: 0,
                      rotate: 45  //横坐标倾斜显示
                    }
                  }
                ],
                series: [
                  { name:'最低租金', type:'bar', data: response.data[0]['bjMinPrice'] },
                  { name:'最高租金', type:'bar', data: response.data[0]['bjMaxPrice'] },
                  { name:'平均租金', type:'line', data: response.data[0]['bjAvgPrice'] }],
              });
            }
          }).catch(err => {
          console.error(err);
          this.$alert('请求超时，刷新重试！')
        });
      },

      drawShChart() {
        this.shChart = echarts.init(document.getElementById('shChart'));
        this.shChart.setOption({
          title: {
            text: '上海市各个区平均租金比较',
            subtext: '数据来源：安居客',
            sublink: 'https://sh.anjuke.com/',
            x: 'center'
          },
          tooltip: this.tooltip,
          toolbox: this.toolbox,
          legend: this.legend,
          grid: { left: '16%'},
          xAxis: this.xAxis,
          yAxis: this.yAxis,
          series: this.series,
        });
        this.$axios.get('http://127.0.0.1:5000/getAjkAllRegionPrice')
          .then((response) => {
            if(response){
              console.log('上海租金数据:', response.data);
              this.shRegionData = response.data[0]['shRegion'];
              this.shChart.setOption({
                xAxis: [
                  {
                    type: 'category',
                    data: this.shRegionData,
                    axisPointer: {
                      type: 'shadow'
                    },
                    axisLabel: {
                      interval: 0,
                      rotate: 45  //横坐标倾斜显示
                    }
                  }
                ],
                series: [
                  { name:'最低租金', type:'bar', data: response.data[0]['shMinPrice'] },
                  { name:'最高租金', type:'bar', data: response.data[0]['shMaxPrice'] },
                  { name:'平均租金', type:'line', data: response.data[0]['shAvgPrice'] }],
              });
            }
          }).catch(err => {
          console.error(err);
          this.$alert('请求超时，刷新重试！')
        });
      },

      drawGzChart() {
        this.gzChart = echarts.init(document.getElementById('gzChart'));
        this.gzChart.setOption({
          title: {
            text: '广州市各个区平均租金比较',
            subtext: '数据来源：安居客',
            sublink: 'https://gz.anjuke.com/',
            x: 'center'
          },
          tooltip: this.tooltip,
          toolbox: this.toolbox,
          legend: this.legend,
          grid: { left: '16%'},
          xAxis: this.xAxis,
          yAxis: this.yAxis,
          series: this.series,
        });
        this.$axios.get('http://127.0.0.1:5000/getAjkAllRegionPrice')
          .then((response) => {
            if(response){
              this.gzRegionData = response.data[0]['gzRegion'];
              console.log(response.data);
              this.gzChart.setOption({
                xAxis: [
                  {
                    type: 'category',
                    data: this.gzRegionData,
                    axisPointer: {
                      type: 'shadow'
                    },
                    axisLabel: {
                      interval: 0,
                      rotate: 45  //横坐标倾斜显示
                    }
                  }
                ],
                series: [
                  { name:'最低租金', type:'bar', data: response.data[0]['gzMinPrice'] },
                  { name:'最高租金', type:'bar', data: response.data[0]['gzMaxPrice'] },
                  { name:'平均租金', type:'line', data: response.data[0]['gzAvgPrice'] }],
              });
            }
          }).catch(err => {
          console.error(err);
          this.$alert('请求超时，刷新重试！')
        });
      },

      drawSzChart() {
        this.szChart = echarts.init(document.getElementById('szChart'));
        this.szChart.setOption({
          title: {
            text: '深圳市各个区平均租金比较',
            subtext: '数据来源：安居客',
            sublink: 'https://sz.anjuke.com/',
            x: 'center'
          },
          tooltip: this.tooltip,
          toolbox: this.toolbox,
          legend: this.legend,
          grid: { left: '16%'},
          xAxis: this.xAxis,
          yAxis: this.yAxis,
          series: this.series,
        });
        this.$axios.get('http://127.0.0.1:5000/getAjkAllRegionPrice')
          .then((response) => {
            if(response){
              this.szRegionData = response.data[0]['szRegion'];
              console.log(response.data);
              this.szChart.setOption({
                xAxis: [
                  {
                    type: 'category',
                    data: this.szRegionData,
                    axisPointer: {
                      type: 'shadow'
                    },
                    axisLabel: {
                      interval: 0,
                      rotate: 45  //横坐标倾斜显示
                    }
                  }
                ],
                series: [
                  { name:'最低租金', type:'bar', data: response.data[0]['szMinPrice'] },
                  { name:'最高租金', type:'bar', data: response.data[0]['szMaxPrice'] },
                  { name:'平均租金', type:'line', data: response.data[0]['szAvgPrice'] }],
              });
            }
          }).catch(err => {
          console.error(err);
          this.$alert('请求超时，刷新重试！')
        });
      },

      drawWhChart() {
        this.whChart = echarts.init(document.getElementById('whChart'));
        this.whChart.setOption({
          title: {
            text: '武汉市各个区平均租金比较',
            subtext: '数据来源：安居客',
            sublink: 'https://wh.anjuke.com/',
            x: 'center'
          },
          tooltip: this.tooltip,
          toolbox: this.toolbox,
          legend: this.legend,
          grid: { left: '16%'},
          xAxis: this.xAxis,
          yAxis: this.yAxis,
          series: this.series,
        });
        this.$axios.get('http://127.0.0.1:5000/getAjkAllRegionPrice')
          .then((response) => {
            if(response){
              this.whRegionData = response.data[0]['whRegion'];
              console.log(response.data);
              this.whChart.setOption({
                xAxis: [
                  {
                    type: 'category',
                    data: this.whRegionData,
                    axisPointer: {
                      type: 'shadow'
                    },
                    axisLabel: {
                      interval: 0,
                      rotate: 45  //横坐标倾斜显示
                    }
                  }
                ],
                series: [
                  { name:'最低租金', type:'bar', data: response.data[0]['whMinPrice'] },
                  { name:'最高租金', type:'bar', data: response.data[0]['whMaxPrice'] },
                  { name:'平均租金', type:'line', data: response.data[0]['whAvgPrice'] }],
              });
            }
          }).catch(err => {
          console.error(err);
          this.$alert('请求超时，刷新重试！')
        });
      },

      drawHzChart() {
        this.hzChart = echarts.init(document.getElementById('hzChart'));
        this.hzChart.setOption({
          title: {
            text: '杭州市各个区平均租金比较',
            subtext: '数据来源：安居客',
            sublink: 'https://hz.anjuke.com/',
            x: 'center'
          },
          tooltip: this.tooltip,
          toolbox: this.toolbox,
          legend: this.legend,
          grid: { left: '16%'},
          xAxis: this.xAxis,
          yAxis: this.yAxis,
          series: this.series,
        });
        this.$axios.get('http://127.0.0.1:5000/getAjkAllRegionPrice')
          .then((response) => {
            if(response){
              this.hzRegionData = response.data[0]['hzRegion'];
              console.log(response.data);
              this.hzChart.setOption({
                xAxis: [
                  {
                    type: 'category',
                    data: this.hzRegionData,
                    axisPointer: {
                      type: 'shadow'
                    },
                    axisLabel: {
                      interval: 0,
                      rotate: 45  //横坐标倾斜显示
                    }
                  }
                ],
                series: [
                  { name:'最低租金', type:'bar', data: response.data[0]['hzMinPrice'] },
                  { name:'最高租金', type:'bar', data: response.data[0]['hzMaxPrice'] },
                  { name:'平均租金', type:'line', data: response.data[0]['hzAvgPrice'] }],
              });
            }
          }).catch(err => {
          console.error(err);
          this.$alert('请求超时，刷新重试！')
        });
      },

      drawTyChart() {
        this.tyChart = echarts.init(document.getElementById('tyChart'));
        this.tyChart.setOption({
          title: {
            text: '太原市各个区平均租金比较',
            subtext: '数据来源：安居客',
            sublink: 'https://ty.anjuke.com/',
            x: 'center'
          },
          tooltip: this.tooltip,
          toolbox: this.toolbox,
          legend: this.legend,
          grid: { left: '16%'},
          xAxis: this.xAxis,
          yAxis: this.yAxis,
          series: this.series,
        });
        this.$axios.get('http://127.0.0.1:5000/getAjkAllRegionPrice')
          .then((response) => {
            if(response){
              this.tyRegionData = response.data[0]['tyRegion'];
              console.log(response.data);
              this.tyChart.setOption({
                xAxis: [
                  {
                    type: 'category',
                    data: this.tyRegionData,
                    axisPointer: {
                      type: 'shadow'
                    },
                    axisLabel: {
                      interval: 0,
                      rotate: 45  //横坐标倾斜显示
                    }
                  }
                ],
                series: [
                  { name:'最低租金', type:'bar', data: response.data[0]['tyMinPrice'] },
                  { name:'最高租金', type:'bar', data: response.data[0]['tyMaxPrice'] },
                  { name:'平均租金', type:'line', data: response.data[0]['tyAvgPrice'] }],
              });
            }
          }).catch(err => {
          console.error(err);
          this.$alert('请求超时，刷新重试！')
        });
      },



      drawCharts() {
        this.drawAllChart();
        this.drawBjChart();
        this.drawShChart();
        this.drawGzChart();
        this.drawSzChart();
        this.drawWhChart();
        this.drawHzChart();
        this.drawTyChart();
      },
    },

    mounted: function () {
      this.drawCharts()
    },
    updated: function () {
      this.drawCharts()
    }
  }
</script>

<style scoped>
  .chart-container {
    width: 100%;
    float: left;
  }
  .el-col {
    padding: 20px 10px;
  }
</style>
