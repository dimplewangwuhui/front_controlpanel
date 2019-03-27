<template>
  <section>
    <el-row>
      <el-col :span="12">
        <div id="question" style="width: 100%;height: 500px; background-color: #00D1B2"></div>
      </el-col>
      <el-col :span="12">
        <div id="title" style="width: 100%;height: 500px; background-color: #dea726"></div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "wordCloud",
    data(){
      return{
        question: null
      }
    },
    methods: {
      drawQuestion(){
        this.question = echarts.init(document.getElementById('question'));
        this.question.showLoading({
          text: 'loading...',
          textColor: '#333',
        });
        this.$axios.get('http://127.0.0.1:5000/question_wordCloud')
          .then((response) => {
            if(response){
              console.log('词云图:',response.data);
              this.question.setOption({
                title:{
                  text: '安居客用户租房最关心问题词云图',
                  subtext: '数据来源: 安居客',
                  sublink: 'http://bj.anjuke.com',
                  x: 'center'
                },
                tooltip: {},
                series: [{
                  type: 'wordCloud',
                  gridSize: 2,
                  sizeRange: [12,50],
                  rotationRange: [-90,90],
                  shape: 'pentagon',
                  drawOutOfBound: true,
                  textStyle: {
                    normal: {
                      color: function () {
                        return 'rgb(' + [
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160)
                        ].join(',')+ ')'
                      }
                    },
                    emphasis: {
                      shadowBlur: 10,
                      shadowColor: '#333'
                    }
                  },
                  data: response.data
                }]
              });
              this.question.hideLoading()
            }
          }).catch(err => {
          console.error(err);
          this.$alert('这里请求超时，刷新重试！')
        });
      }
    },
    mounted() {
      this.drawQuestion()
    }
  }
</script>

<style scoped>

</style>
