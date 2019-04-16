<template>
  <section>
    <el-row>
      <el-col :span="12">
        <div id="question" style="width: 100%;height: 500px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="title" style="width: 100%;height: 500px;"></div>
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
        var maskImage = new Image();
        //重点：云彩图片的base64码
        maskImage.src = 'data:image/png;base64,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';
        this.question.showLoading({
          text: 'Loading...',
          textColor: '#333',
        });
        this.$axios.get('http://127.0.0.1:5000/question_wordCloud')
          .then((response) => {
            if (response) {
              console.log('词云图:', response.data);
              this.question.setOption({
                title: {
                  text: '安居客用户租房最关心问题词云图',
                  subtext: '数据来源: 安居客',
                  sublink: 'http://bj.anjuke.com',
                  x: 'center'
                },
                tooltip: {},
                series: [{
                  type: 'wordCloud',
                  gridSize: 2,
                  sizeRange: [12, 50],
                  rotationRange: [-90, 90],
                  // maskImage: maskImage,
                  shape: 'pentagon',
                  drawOutOfBound: true,
                  textStyle: {
                    normal: {
                      color: function () {
                        return 'rgb(' + [
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160)
                        ].join(',') + ')'
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
      },

      drawTitle(){
        this.title = echarts.init(document.getElementById('title'));
        // var maskImage = new Image();
        //重点：云彩图片的base64码
        // maskImage.src = 'data:image/png;base64,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';
        this.title.showLoading({
          text: 'Loading...',
          textColor: '#333',
        });
        this.$axios.get('http://127.0.0.1:5000/title_wordCloud')
          .then((response) => {
            if (response) {
              console.log('词云图:', response.data);
              this.title.setOption({
                title: {
                  text: '安居客标题词云图',
                  subtext: '数据来源: 安居客',
                  sublink: 'http://bj.anjuke.com',
                  x: 'center'
                },
                tooltip: {},
                series: [{
                  type: 'wordCloud',
                  gridSize: 2,
                  sizeRange: [12, 50],
                  rotationRange: [-90, 90],
                  // maskImage: maskImage,
                  shape: 'pentagon',
                  drawOutOfBound: true,
                  textStyle: {
                    normal: {
                      color: function () {
                        return 'rgb(' + [
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160)
                        ].join(',') + ')'
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
              this.title.hideLoading()
            }
          }).catch(err => {
          console.error(err);
          this.$alert('这里请求超时，刷新重试！')
        });
      },
    },
    mounted() {
      this.drawQuestion();
      this.drawTitle();
    }
  }
</script>

<style scoped>

</style>
