<template>
  <section class="chart-container">
    <el-row>
      <el-col :span="24">
        <div id="areaChart" style="width: 100%; height: 500px;margin-top: 20px;"></div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "echarts_area",
    data(){
      return{
        areaChart: null
      }
    },
    methods: {
      drawAreaChart(){
        this.areaChart = echarts.init(document.getElementById('areaChart'));
        this.areaChart.setOption({
          title: {
            text: "租房面积与租金关系散点图",
            subtext: "数据来源:安居客",
            sublink: "https://bj.anjuke.com",
            x: 'center'
          },
          xAxis: {
            scale: true,
            type: 'value',
            min: 0,
            max: 600,
            interval: 60,
            axisLabel: {
              formatter: '{value} 平米'
            }
          },
          yAxis: [{
            scale: true,
            min: 0,
            max: 150000,
            interval: 10000,
            axisLabel: {
              formatter: '{value} 元/月'
            }
          }],
          series: [{
            type: 'scatter',
            data: [],
          }]
        });
        this.$axios.get('http://127.0.0.1:5000/area')
          .then((response) => {
            if (response){
              console.log(response.data);
              this.areaChart.setOption({
                series: [{
                  data: response.data,
                }]
              })
            }
          }).catch(err => {
          console.error(err);
          this.$alert('这里请求超时，刷新重试！')
        });
      }
    },
    mounted() {
      this.drawAreaChart()
    }
  }
</script>

<style scoped>

</style>
