<template>
  <section class="chart-container">
    <el-row>
      <el-col :span="12">
        <div id="bjCountChart" style="width: 100%; height: 300px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="shCountChart" style="width: 100%; height: 300px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="gzCountChart" style="width: 100%; height: 300px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="szCountChart" style="width: 100%; height: 300px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="whCountChart" style="width: 100%; height: 300px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="hzCountChart" style="width: 100%; height: 300px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="tyCountChart" style="width: 100%; height: 300px;"></div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "echarts_count",
    data() {
      return {
        bjCountChart: null,
        shCountChart: null,
        gzCountChart: null,
        szCountChart: null,
        whCountChart: null,
        hzCountChart: null,
        tyCountChart: null,

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
      }
    },
    methods: {
      drawBjCountCharts(){
        this.bjCountChart = echarts.init(document.getElementById('bjCountChart'));
        this.bjCountChart.setOption({
          title : {
            text: '北京市租房数量比较',
            subtext: '数据来源:安居客',
            sublink: 'https://beijing.anjuke.com',
            x:'center',
          },
          tooltip : this.tooltip,
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['海淀区','大兴区','通州区','昌平区','朝阳区','西城区','密云区','门头沟区','东城区','房山区','石景山区','延庆区','丰台区','顺义区','北京周边区']
          },
          series : this.series,
        });
        this.$axios.get('http://127.0.0.1:5000/count')
          .then((response) => {
            if(response){
              console.log(response.data);
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

      drawShCountCharts(){
        this.shCountChart = echarts.init(document.getElementById('shCountChart'));
        this.shCountChart.setOption({
          title : {
            text: '上海市租房数量比较',
            subtext: '数据来源:安居客',
            sublink: 'https://sh.anjuke.com',
            x:'center',
          },
          tooltip: this.tooltip,
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['奉贤区','普陀区','嘉定区','长宁区','松江区','杨浦区','上海周边区','静安区','黄浦区','虹口区','青浦区','金山区','徐汇区','浦东区','宝山区', '闵行区']
          },
          series : this.series
        });
        this.$axios.get('http://127.0.0.1:5000/count')
          .then((response) => {
            if(response){
              console.log(response.data);
              this.shCountChart.setOption({
                series: [{
                  name: '上海市',
                  type: 'pie',
                  data:[
                    { name:'奉贤区', value: response.data[0]['shanghai'][0] },
                    { name:'普陀区', value: response.data[0]['shanghai'][1] },
                    { name:'嘉定区', value: response.data[0]['shanghai'][2] },
                    { name:'长宁区', value: response.data[0]['shanghai'][3] },
                    { name:'松江区', value: response.data[0]['shanghai'][4] },
                    { name:'杨浦区', value: response.data[0]['shanghai'][5] },
                    { name:'上海周边区', value: response.data[0]['shanghai'][6] },
                    { name:'静安区', value: response.data[0]['shanghai'][7] },
                    { name:'黄浦区', value: response.data[0]['shanghai'][8] },
                    { name:'虹口区', value: response.data[0]['shanghai'][9] },
                    { name:'青浦区', value: response.data[0]['shanghai'][10] },
                    { name:'金山区', value: response.data[0]['shanghai'][11] },
                    { name:'徐汇区', value: response.data[0]['shanghai'][12] },
                    { name:'浦东区', value: response.data[0]['shanghai'][13] },
                    { name:'宝山区', value: response.data[0]['shanghai'][14] },
                    { name:'闵行区', value: response.data[0]['shanghai'][15] },
                  ]
                }],
              });
            }
          }).catch(err => {
          console.error(err);
          this.$alert('请求超时，刷新重试！')
        });
      },

      drawGzCountCharts(){
        this.gzCountChart = echarts.init(document.getElementById('gzCountChart'));
        this.gzCountChart.setOption({
          title : {
            text: '广州市租房数量比较',
            subtext: '数据来源:安居客',
            sublink: 'https://gz.anjuke.com',
            x:'center',
          },
          tooltip: this.tooltip,
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['从化区','越秀区','荔湾区','广州周边区','番禺区','白云区','天河区','增城区','南沙区','花都区','黄埔区','海珠区']
          },
          series : this.series
        });
        this.$axios.get('http://127.0.0.1:5000/count')
          .then((response) => {
            if(response){
              console.log(response.data);
              this.gzCountChart.setOption({
                series: [{
                  name: '广州市',
                  type: 'pie',
                  data:[
                    { name:'从化区', value: response.data[0]['guangzhou'][0] },
                    { name:'越秀区', value: response.data[0]['guangzhou'][1] },
                    { name:'荔湾区', value: response.data[0]['guangzhou'][2] },
                    { name:'广州周边区', value: response.data[0]['guangzhou'][3] },
                    { name:'番禺区', value: response.data[0]['guangzhou'][4] },
                    { name:'白云区', value: response.data[0]['guangzhou'][5] },
                    { name:'天河区', value: response.data[0]['guangzhou'][6] },
                    { name:'增城区', value: response.data[0]['guangzhou'][7] },
                    { name:'南沙区', value: response.data[0]['guangzhou'][8] },
                    { name:'花都区', value: response.data[0]['guangzhou'][9] },
                    { name:'黄埔区', value: response.data[0]['guangzhou'][10] },
                    { name:'海珠区', value: response.data[0]['guangzhou'][11] },
                  ]
                }],
              });
            }
          }).catch(err => {
          console.error(err);
          this.$alert('请求超时，刷新重试！')
        });
      },

      drawSzCountCharts(){
        this.szCountChart = echarts.init(document.getElementById('szCountChart'));
        this.szCountChart.setOption({
          title : {
            text: '深圳市租房数量比较',
            subtext: '数据来源:安居客',
            sublink: 'https://sz.anjuke.com',
            x:'center',
          },
          tooltip: this.tooltip,
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['坪山区','福田区','宝安区','盐田区','光明区','南山区','罗湖区','龙华区','龙岗区']
          },
          series : this.series
        });
        this.$axios.get('http://127.0.0.1:5000/count')
          .then((response) => {
            if(response){
              console.log(response.data);
              this.szCountChart.setOption({
                series: [{
                  name: '深圳市',
                  type: 'pie',
                  data:[
                    { name:'坪山区', value: response.data[0]['shenzhen'][0] },
                    { name:'福田区', value: response.data[0]['shenzhen'][1] },
                    { name:'宝安区', value: response.data[0]['shenzhen'][2] },
                    { name:'盐田区', value: response.data[0]['shenzhen'][3] },
                    { name:'光明区', value: response.data[0]['shenzhen'][4] },
                    { name:'南山区', value: response.data[0]['shenzhen'][5] },
                    { name:'罗湖区', value: response.data[0]['shenzhen'][6] },
                    { name:'龙华区', value: response.data[0]['shenzhen'][7] },
                    { name:'龙岗区', value: response.data[0]['shenzhen'][8] },
                  ]
                }],
              });
            }
          }).catch(err => {
          console.error(err);
          this.$alert('请求超时，刷新重试！')
        });
      },

      drawWhCountCharts(){
        this.whCountChart = echarts.init(document.getElementById('whCountChart'));
        this.whCountChart.setOption({
          title : {
            text: '武汉市租房数量比较',
            subtext: '数据来源:安居客',
            sublink: 'https://wh.anjuke.com',
            x:'center',
          },
          tooltip: this.tooltip,
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['江夏区','硚口区','东西湖区','武昌区','黄陂区','新洲区','江汉区','江岸区','洪山区','青山区','蔡甸区','汉阳区']
          },
          series : this.series
        });
        this.$axios.get('http://127.0.0.1:5000/count')
          .then((response) => {
            if(response){
              console.log(response.data);
              this.whCountChart.setOption({
                series: [{
                  name: '武汉市',
                  type: 'pie',
                  data:[
                    { name:'江夏区', value: response.data[0]['wuhan'][0] },
                    { name:'硚口区', value: response.data[0]['wuhan'][1] },
                    { name:'东西湖区', value: response.data[0]['wuhan'][2] },
                    { name:'武昌区', value: response.data[0]['wuhan'][3] },
                    { name:'黄陂区', value: response.data[0]['wuhan'][4] },
                    { name:'新洲区', value: response.data[0]['wuhan'][5] },
                    { name:'江汉区', value: response.data[0]['wuhan'][6] },
                    { name:'江岸区', value: response.data[0]['wuhan'][7] },
                    { name:'洪山区', value: response.data[0]['wuhan'][8] },
                    { name:'青山区', value: response.data[0]['wuhan'][9] },
                    { name:'蔡甸区', value: response.data[0]['wuhan'][10] },
                    { name:'汉阳区', value: response.data[0]['wuhan'][11] },
                  ]
                }],
              });
            }
          }).catch(err => {
          console.error(err);
          this.$alert('请求超时，刷新重试！')
        });
      },

      drawHzCountCharts(){
        this.hzCountChart = echarts.init(document.getElementById('hzCountChart'));
        this.hzCountChart.setOption({
          title : {
            text: '杭州市租房数量比较',
            subtext: '数据来源:安居客',
            sublink: 'https://hz.anjuke.com',
            x:'center',
          },
          tooltip: this.tooltip,
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['滨江区','拱墅区','西湖区','萧山区','江干区','下城区','杭州周边区','上城区','余杭区']
          },
          series : this.series
        });
        this.$axios.get('http://127.0.0.1:5000/count')
          .then((response) => {
            if(response){
              console.log(response.data);
              this.hzCountChart.setOption({
                series: [{
                  name: '深圳市',
                  type: 'pie',
                  data:[
                    { name:'滨江区', value: response.data[0]['hangzhou'][0] },
                    { name:'拱墅区', value: response.data[0]['hangzhou'][1] },
                    { name:'西湖区', value: response.data[0]['hangzhou'][2] },
                    { name:'萧山区', value: response.data[0]['hangzhou'][3] },
                    { name:'江干区', value: response.data[0]['hangzhou'][4] },
                    { name:'下城区', value: response.data[0]['hangzhou'][5] },
                    { name:'杭州周边区', value: response.data[0]['hangzhou'][6] },
                    { name:'上城区', value: response.data[0]['hangzhou'][7] },
                    { name:'余杭区', value: response.data[0]['hangzhou'][8] },
                  ]
                }],
              });
            }
          }).catch(err => {
          console.error(err);
          this.$alert('请求超时，刷新重试！')
        });
      },

      drawTyCountCharts(){
        this.tyCountChart = echarts.init(document.getElementById('tyCountChart'));
        this.tyCountChart.setOption({
          title : {
            text: '太原市租房数量比较',
            subtext: '数据来源:安居客',
            sublink: 'https://ty.anjuke.com',
            x:'center',
          },
          tooltip: this.tooltip,
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['太原周边区','清徐区','小店区','杏花岭区','万柏林区','迎泽区','尖草坪区','晋源区','古交区']
          },
          series : this.series
        });
        this.$axios.get('http://127.0.0.1:5000/count')
          .then((response) => {
            if(response){
              console.log(response.data);
              this.tyCountChart.setOption({
                series: [{
                  name: '太原市',
                  type: 'pie',
                  data:[
                    { name:'太原周边区', value: response.data[0]['taiyuan'][0] },
                    { name:'清徐区', value: response.data[0]['taiyuan'][1] },
                    { name:'小店区', value: response.data[0]['taiyuan'][2] },
                    { name:'杏花岭区', value: response.data[0]['taiyuan'][3] },
                    { name:'万柏林区', value: response.data[0]['taiyuan'][4] },
                    { name:'迎泽区', value: response.data[0]['taiyuan'][5] },
                    { name:'尖草坪区', value: response.data[0]['taiyuan'][6] },
                    { name:'晋源区', value: response.data[0]['taiyuan'][7] },
                    { name:'古交区', value: response.data[0]['taiyuan'][8] },
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
      this.drawBjCountCharts();
      this.drawShCountCharts();
      this.drawGzCountCharts();
      this.drawSzCountCharts();
      this.drawWhCountCharts();
      this.drawHzCountCharts();
      this.drawTyCountCharts();
    }
  }
</script>

<style scoped>
  .chart-container {
    width: 100%;
    float: left;
  }
  .el-col {
    padding: 10px 10px;
  }
</style>
