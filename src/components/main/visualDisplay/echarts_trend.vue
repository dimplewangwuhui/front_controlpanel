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
              {value: '太原', label: '太原'},
              {value: '杭州', label: '杭州'}]
          }],
        }
      },
      methods: {
        handleSelectChange(){
          console.log(this.city);
        },

        drawBjTrendChart(){
          this.bjTrendChart = echarts.init(document.getElementById('bjTrendChart'));
          this.$axios.get('http://127.0.0.1:5000/trend')
            .then((response) => {
              if(response){
                console.log(response.data);
                this.bjTrendChart.setOption({
                  title: {
                    text: '北京市3月份房租租金走势',
                    subtext: '数据来源: 安居客',
                    x: 'center',
                    sublink: 'https://bj.anjuke.com'
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  xAxis: {
                    data: response.data.map(function (item) {
                      return item[1];
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
                    startValue: '2019-03-01'
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
                      return item[0];
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

        drawCharts(){
          console.log(this.city);
          if(this.city === '北京'){
            this.drawBjTrendChart()
          }
        }
      },
      mounted() {
        this.drawCharts()
      }
    }
</script>

<style scoped>

</style>
