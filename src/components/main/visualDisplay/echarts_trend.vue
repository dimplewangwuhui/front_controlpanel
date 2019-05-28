<template>
  <section class="chart-container">
    <el-row>
      <el-col :span="24">
        <el-select class="select-form" v-model="city" placeholder="请选择城市" @change="handleSelectChange" style="float: left">
          <el-option-group v-for="group in optionsAll" :key="group.label" :label="group.label">
            <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-option-group>
        </el-select>
      </el-col>
      <el-col :span="24">
        <div id="bjTrendChart" style="width: 100%; height: 300px;margin-top: 20px;"></div>
      </el-col>
      <el-col :span="24">
        <div id="shTrendChart" style="width: 100%; height: 300px;margin-top: 20px;"></div>
      </el-col>
      <el-col :span="24">
        <div id="gzTrendChart" style="width: 100%; height: 300px;margin-top: 20px;"></div>
      </el-col>
      <el-col :span="24">
        <div id="szTrendChart" style="width: 100%; height: 300px;margin-top: 20px;"></div>
      </el-col>
      <el-col :span="24">
        <div id="whTrendChart" style="width: 100%; height: 300px;margin-top: 20px;"></div>
      </el-col>
      <el-col :span="24">
        <div id="hzTrendChart" style="width: 100%; height: 300px;margin-top: 20px;"></div>
      </el-col>
      <el-col :span="24">
        <div id="tyTrendChart" style="width: 100%; height: 300px;margin-top: 20px;"></div>
      </el-col>
    </el-row>
  </section>
</template>


<script>
  import echarts from 'echarts'
    export default {
      name: "echarts_trend",
      data(){
        return{
          bjTrendChart: null,
          shTrendChart: null,
          gzTrendChart: null,
          szTrendChart: null,
          whTrendChart: null,
          hzTrendChart: null,
          tyTrendChart: null,

          city: '北京',  //默认北京
          optionsAll: [{
            label: '热门城市',
            options: [{value: '北京', label: '北京'},
              {value: '上海', label: '上海'}]
          },{
            label: '其他城市',
            options: [{value: '广州', label: '广州'},
              {value: '深圳', label: '深圳'},
              {value: '武汉', label: '武汉'},
              {value: '杭州', label: '杭州'},
              {value: '太原', label: '太原'}]
          }],
          toolbox: {
            left: 100,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
        }
      },
      methods: {
        drawBjTrendChart(){
          this.bjTrendChart = echarts.init(document.getElementById('bjTrendChart'));
          this.$axios.get('http://127.0.0.1:5000/trend')
            .then((response) => {
              if(response){
                console.log('北京租金走势:',response.data);
                this.bjTrendChart.setOption({
                  title: {
                    text: '北京市房租租金走势',
                    subtext: '数据来源: 安居客',
                    x: 'center',
                    sublink: 'https://bj.anjuke.com'
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  toolbox: this.toolbox,
                  xAxis: {
                    data: response.data.map(function (item) {
                      if(item[2] === '北京'){
                        return item[1];
                      }
                    })
                  },
                  yAxis: [{
                    splitLine: {
                      show: false
                    },
                    axisLabel: {
                      formatter: '{value} 元/月'
                    }
                  }],
                  dataZoom: [{
                    startValue: '2019-03-01',
                    endValue: '2019-05-01'
                  }, {
                    type: 'inside'
                  }],
                  visualMap: {
                    top: 10,
                    right: 10,
                    pieces: [{gt: 0, lte: 5000, color: '#096'},
                      {gt: 5000, lte: 10000, color: '#ffde33'},
                      {gt: 10000, lte: 15000, color: '#ff9933'},
                      {gt: 15000, lte: 20000, color: '#cc0033'},
                      {gt: 20000, lte: 30000, color: '#660099'},
                      {gt: 30000, color: '#7e0023'}],
                    outOfRange: {
                      color: '#999'
                    }
                  },
                  series: {
                    name: '平均租金',
                    type: 'line',
                    data: response.data.map(function (item) {
                      if(item[2] === '北京'){
                        return item[0];
                      }
                    }),
                    markLine: {
                      silent: true,
                      data: [{yAxis: 5000}, {yAxis: 10000}, {yAxis: 15000}, {yAxis: 20000}, {yAxis: 30000}]
                    }
                  }
                })
              }
            }).catch(err => {
            console.error(err);
            this.$alert('这里请求超时，刷新重试！')
          });
        },

        drawShTrendChart(){
          this.shTrendChart = echarts.init(document.getElementById('shTrendChart'));
          this.$axios.get('http://127.0.0.1:5000/trend')
            .then((response) => {
              if(response){
                console.log('上海租金走势:',response.data);
                this.shTrendChart.setOption({
                  title: {
                    text: '上海市房租租金走势',
                    subtext: '数据来源: 安居客',
                    x: 'center',
                    sublink: 'https://sh.anjuke.com'
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  toolbox: this.toolbox,
                  xAxis: {
                    data: response.data.map(function (item) {
                      if(item[2] === "上海"){
                        return item[1];
                      }
                    }),
                  },
                  yAxis: [{
                    splitLine: {
                      show: false
                    },
                    axisLabel: {
                      formatter: '{value} 元/月'
                    }
                  }],
                  dataZoom: [{
                    startValue: '2019-03-17',
                    endValue: '2019-05-01'
                  }, {
                    type: 'inside'
                  }],
                  visualMap: {
                    top: 10,
                    right: 10,
                    pieces: [{gt: 0, lte: 5000, color: '#096'},
                      {gt: 5000, lte: 10000, color: '#ffde33'},
                      {gt: 10000, lte: 15000, color: '#ff9933'},
                      {gt: 15000, lte: 20000, color: '#cc0033'},
                      {gt: 20000, lte: 30000, color: '#660099'},
                      {gt: 30000, color: '#7e0023'}],
                    outOfRange: {
                      color: '#999'
                    }
                  },
                  series: {
                    name: '平均租金',
                    type: 'line',
                    data: response.data.map(function (item) {
                      if(item[2] === "上海"){
                        return item[0];
                      }
                    }),
                    markLine: {
                      silent: true,
                      data: [{yAxis: 5000}, {yAxis: 10000}, {yAxis: 15000}, {yAxis: 20000}, {yAxis: 30000}]
                    }
                  }
                })
              }
            }).catch(err => {
            console.error(err);
            this.$alert('这里请求超时，刷新重试！')
          });
        },

        drawGzTrendChart(){
          this.gzTrendChart = echarts.init(document.getElementById('gzTrendChart'));
          this.$axios.get('http://127.0.0.1:5000/trend')
            .then((response) => {
              if(response){
                console.log('广州租金走势:',response.data);
                this.gzTrendChart.setOption({
                  title: {
                    text: '广州市房租租金走势',
                    subtext: '数据来源: 安居客',
                    x: 'center',
                    sublink: 'https://gz.anjuke.com'
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  toolbox: this.toolbox,
                  xAxis: {
                    data: response.data.map(function (item) {
                      if(item[2] === '广州'){
                        return item[1];
                      }
                    })
                  },
                  yAxis: [{
                    splitLine: {
                      show: false
                    },
                    axisLabel: {
                      formatter: '{value} 元/月'
                    }
                  }],
                  dataZoom: [{
                    startValue: '2019-03-17',
                    endValue: '2019-05-01'
                  }, {
                    type: 'inside'
                  }],
                  visualMap: {
                    top: 10,
                    right: 10,
                    pieces: [{gt: 0, lte: 5000, color: '#096'},
                      {gt: 5000, lte: 10000, color: '#ffde33'},
                      {gt: 10000, lte: 15000, color: '#ff9933'},
                      {gt: 15000, lte: 20000, color: '#cc0033'},
                      {gt: 20000, lte: 30000, color: '#660099'},
                      {gt: 30000, color: '#7e0023'}],
                    outOfRange: {
                      color: '#999'
                    }
                  },
                  series: {
                    name: '平均租金',
                    type: 'line',
                    data: response.data.map(function (item) {
                      if(item[2] === '广州'){
                        return item[0];
                      }
                    }),
                    markLine: {
                      silent: true,
                      data: [{yAxis: 5000}, {yAxis: 10000}, {yAxis: 15000}, {yAxis: 20000}, {yAxis: 30000}]
                    }
                  }
                })
              }
            }).catch(err => {
            console.error(err);
            this.$alert('这里请求超时，刷新重试！')
          });
        },

        drawSzTrendChart(){
          this.szTrendChart = echarts.init(document.getElementById('szTrendChart'));
          this.$axios.get('http://127.0.0.1:5000/trend')
            .then((response) => {
              if(response){
                console.log('深圳租金走势:',response.data);
                this.szTrendChart.setOption({
                  title: {
                    text: '深圳市房租租金走势',
                    subtext: '数据来源: 安居客',
                    x: 'center',
                    sublink: 'https://sz.anjuke.com'
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  toolbox: this.toolbox,
                  xAxis: {
                    data: response.data.map(function (item) {
                      if(item[2] === '深圳'){
                        return item[1];
                      }
                    })
                  },
                  yAxis: [{
                    splitLine: {
                      show: false
                    },
                    axisLabel: {
                      formatter: '{value} 元/月'
                    }
                  }],
                  dataZoom: [{
                    startValue: '2019-03-17',
                    endValue: '2019-05-01'
                  }, {
                    type: 'inside'
                  }],
                  visualMap: {
                    top: 10,
                    right: 10,
                    pieces: [{gt: 0, lte: 5000, color: '#096'},
                      {gt: 5000, lte: 10000, color: '#ffde33'},
                      {gt: 10000, lte: 15000, color: '#ff9933'},
                      {gt: 15000, lte: 20000, color: '#cc0033'},
                      {gt: 20000, lte: 30000, color: '#660099'},
                      {gt: 30000, color: '#7e0023'}],
                    outOfRange: {
                      color: '#999'
                    }
                  },
                  series: {
                    name: '平均租金',
                    type: 'line',
                    data: response.data.map(function (item) {
                      if(item[2] === '深圳'){
                        return item[0];
                      }
                    }),
                    markLine: {
                      silent: true,
                      data: [{yAxis: 5000}, {yAxis: 10000}, {yAxis: 15000}, {yAxis: 20000}, {yAxis: 30000}]
                    }
                  }
                })
              }
            }).catch(err => {
            console.error(err);
            this.$alert('这里请求超时，刷新重试！')
          });
        },

        drawWhTrendChart(){
          this.whTrendChart = echarts.init(document.getElementById('whTrendChart'));
          this.$axios.get('http://127.0.0.1:5000/trend')
            .then((response) => {
              if(response){
                console.log('武汉租金走势:',response.data);
                this.whTrendChart.setOption({
                  title: {
                    text: '武汉市房租租金走势',
                    subtext: '数据来源: 安居客',
                    x: 'center',
                    sublink: 'https://wh.anjuke.com'
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  toolbox: this.toolbox,
                  xAxis: {
                    data: response.data.map(function (item) {
                      if(item[2] === '武汉'){
                        return item[1];
                      }
                    })
                  },
                  yAxis: [{
                    splitLine: {
                      show: false
                    },
                    axisLabel: {
                      formatter: '{value} 元/月'
                    }
                  }],
                  dataZoom: [{
                    startValue: '2019-03-17',
                    endValue: '2019-05-01'
                  }, {
                    type: 'inside'
                  }],
                  visualMap: {
                    top: 10,
                    right: 10,
                    pieces: [{gt: 0, lte: 5000, color: '#096'},
                      {gt: 5000, lte: 10000, color: '#ffde33'},
                      {gt: 10000, lte: 15000, color: '#ff9933'},
                      {gt: 15000, lte: 20000, color: '#cc0033'},
                      {gt: 20000, lte: 30000, color: '#660099'},
                      {gt: 30000, color: '#7e0023'}],
                    outOfRange: {
                      color: '#999'
                    }
                  },
                  series: {
                    name: '平均租金',
                    type: 'line',
                    data: response.data.map(function (item) {
                      if(item[2] === '武汉'){
                        return item[0];
                      }
                    }),
                    markLine: {
                      silent: true,
                      data: [{yAxis: 5000}, {yAxis: 10000}, {yAxis: 15000}, {yAxis: 20000}, {yAxis: 30000}]
                    }
                  }
                })
              }
            }).catch(err => {
            console.error(err);
            this.$alert('这里请求超时，刷新重试！')
          });
        },

        drawHzTrendChart(){
          this.hzTrendChart = echarts.init(document.getElementById('hzTrendChart'));
          this.$axios.get('http://127.0.0.1:5000/trend')
            .then((response) => {
              if(response){
                console.log('杭州租金走势:',response.data);
                this.hzTrendChart.setOption({
                  title: {
                    text: '杭州市房租租金走势',
                    subtext: '数据来源: 安居客',
                    x: 'center',
                    sublink: 'https://hz.anjuke.com'
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  toolbox: this.toolbox,
                  xAxis: {
                    data: response.data.map(function (item) {
                      if(item[2] === '杭州'){
                        return item[1];
                      }
                    })
                  },
                  yAxis: [{
                    splitLine: {
                      show: false
                    },
                    axisLabel: {
                      formatter: '{value} 元/月'
                    }
                  }],
                  dataZoom: [{
                    startValue: '2019-03-17',
                    endValue: '2019-05-01'
                  }, {
                    type: 'inside'
                  }],
                  visualMap: {
                    top: 10,
                    right: 10,
                    pieces: [{gt: 0, lte: 5000, color: '#096'},
                      {gt: 5000, lte: 10000, color: '#ffde33'},
                      {gt: 10000, lte: 15000, color: '#ff9933'},
                      {gt: 15000, lte: 20000, color: '#cc0033'},
                      {gt: 20000, lte: 30000, color: '#660099'},
                      {gt: 30000, color: '#7e0023'}],
                    outOfRange: {
                      color: '#999'
                    }
                  },
                  series: {
                    name: '平均租金',
                    type: 'line',
                    data: response.data.map(function (item) {
                      if(item[2] === '杭州'){
                        return item[0];
                      }
                    }),
                    markLine: {
                      silent: true,
                      data: [{yAxis: 5000}, {yAxis: 10000}, {yAxis: 15000}, {yAxis: 20000}, {yAxis: 30000}]
                    }
                  }
                })
              }
            }).catch(err => {
            console.error(err);
            this.$alert('这里请求超时，刷新重试！')
          });
        },

        drawTyTrendChart(){
          this.tyTrendChart = echarts.init(document.getElementById('tyTrendChart'));
          this.$axios.get('http://127.0.0.1:5000/trend')
            .then((response) => {
              if(response){
                console.log('太原租金走势:',response.data);
                this.tyTrendChart.setOption({
                  title: {
                    text: '太原市房租租金走势',
                    subtext: '数据来源: 安居客',
                    x: 'center',
                    sublink: 'https://ty.anjuke.com'
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  toolbox: this.toolbox,
                  xAxis: {
                    data: response.data.map(function (item) {
                      if(item[2] === '太原'){
                        return item[1];
                      }
                    })
                  },
                  yAxis: [{
                    splitLine: {
                      show: false
                    },
                    axisLabel: {
                      formatter: '{value} 元/月'
                    }
                  }],
                  dataZoom: [{
                    startValue: '2019-03-01',
                    endValue: '2019-05-01'
                  }, {
                    type: 'inside'
                  }],
                  visualMap: {
                    top: 10,
                    right: 10,
                    pieces: [{gt: 0, lte: 5000, color: '#096'},
                      {gt: 5000, lte: 10000, color: '#ffde33'},
                      {gt: 10000, lte: 15000, color: '#ff9933'},
                      {gt: 15000, lte: 20000, color: '#cc0033'},
                      {gt: 20000, lte: 30000, color: '#660099'},
                      {gt: 30000, color: '#7e0023'}],
                    outOfRange: {
                      color: '#999'
                    }
                  },
                  series: {
                    name: '平均租金',
                    type: 'line',
                    data: response.data.map(function (item) {
                      if(item[2] === '太原'){
                        return item[0];
                      }
                    }),
                    markLine: {
                      silent: true,
                      data: [{yAxis: 5000}, {yAxis: 10000}, {yAxis: 15000}, {yAxis: 20000}, {yAxis: 30000}]
                    }
                  }
                })
              }
            }).catch(err => {
            console.error(err);
            this.$alert('这里请求超时，刷新重试！')
          });
        },

        // handleSelectChange(){
        //   console.log(this.city);
        //   if(this.city === '北京'){
        //     this.drawBjTrendChart()
        //   }
        //   if(this.city === '上海'){
        //     this.drawShTrendChart()
        //   }
        // },

        drawCharts(){
          this.drawBjTrendChart();
          this.drawShTrendChart();
          this.drawGzTrendChart();
          this.drawSzTrendChart();
          this.drawWhTrendChart();
          this.drawHzTrendChart();
          this.drawTyTrendChart();
        }
      },
      mounted() {
        this.drawCharts();
      }
    }
</script>

<style scoped>

</style>
