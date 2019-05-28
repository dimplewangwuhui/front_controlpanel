<template>
  <div class="news_subject" v-loading="loading">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="北京市特色专题">
        <el-card class="box-card" v-for="(item,index) in bjnews" :key="item.id">
          <el-row :gutter="50">
            <el-col :span="4">
              <a :href="item.url" target="_blank"><img v-if="item.image" :src=item.image :title="item.image" alt="图片加载失败"></a>
            </el-col>
            <el-col :span="20">
              <div class="title">
                <a :href="item.url"target="_blank"><span v-text="item.title"></span></a>
              </div>
              <div class="content">
                <a :href="item.url"target="_blank"><span v-text="item.content"></span></a>
                <a :href="item.url"target="_blank">
                  <span v-if="item.images" v-for="(m,i) in item.images" :key="i">
                    <img :src="m" :title="m" alt="图片加载失败" style="margin-right: 20px">
                  </span>
                </a>
              </div>
              <div class="info">
                <span v-text="'类型：'+item.info[0]" style="margin-right: 50px"></span>
                <span v-text="'作者：'+item.info[1]" v-if="item.info[1]" style="margin-right: 50px"></span>
                <span v-text="'发布日期：'+item.info[2]"></span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="上海市特色专题">
        <el-card class="box-card" v-for="(item,index) in shnews" :key="item.id">
          <el-row :gutter="50">
            <el-col :span="4">
              <a :href="item.url" target="_blank"><img v-if="item.image" :src=item.image :title="item.image" alt="图片加载失败"></a>
            </el-col>
            <el-col :span="20">
              <div class="title">
                <a :href="item.url"target="_blank"><span v-text="item.title"></span></a>
              </div>
              <div class="content">
                <a :href="item.url"target="_blank"><span v-text="item.content"></span></a>
                <a :href="item.url"target="_blank">
                  <span v-if="item.images" v-for="(m,i) in item.images" :key="i">
                    <img :src="m" :title="m" alt="图片加载失败" style="margin-right: 20px">
                  </span>
                </a>
              </div>
              <div class="info">
                <span v-text="'类型：'+item.info[0]" style="margin-right: 50px"></span>
                <span v-text="'作者：'+item.info[1]" v-if="item.info[1]" style="margin-right: 50px"></span>
                <span v-text="'发布日期：'+item.info[2]"></span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="广州市特色专题">
        <el-card class="box-card" v-for="(item,index) in gznews" :key="item.id">
          <el-row :gutter="50">
            <el-col :span="4">
              <a :href="item.url" target="_blank"><img v-if="item.image" :src=item.image :title="item.image" alt="图片加载失败"></a>
            </el-col>
            <el-col :span="20">
              <div class="title">
                <a :href="item.url"target="_blank"><span v-text="item.title"></span></a>
              </div>
              <div class="content">
                <a :href="item.url"target="_blank"><span v-text="item.content"></span></a>
                <a :href="item.url"target="_blank">
                  <span v-if="item.images" v-for="(m,i) in item.images" :key="i">
                    <img :src="m" :title="m" alt="图片加载失败" style="margin-right: 20px">
                  </span>
                </a>
              </div>
              <div class="info">
                <span v-text="'类型：'+item.info[0]" style="margin-right: 50px"></span>
                <span v-text="'作者：'+item.info[1]" v-if="item.info[1]" style="margin-right: 50px"></span>
                <span v-text="'发布日期：'+item.info[2]"></span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="深圳市特色专题">
        <el-card class="box-card" v-for="(item,index) in sznews" :key="item.id">
          <el-row :gutter="50">
            <el-col :span="4">
              <a :href="item.url" target="_blank"><img v-if="item.image" :src=item.image :title="item.image" alt="图片加载失败"></a>
            </el-col>
            <el-col :span="20">
              <div class="title">
                <a :href="item.url"target="_blank"><span v-text="item.title"></span></a>
              </div>
              <div class="content">
                <a :href="item.url"target="_blank"><span v-text="item.content"></span></a>
                <a :href="item.url"target="_blank">
                  <span v-if="item.images" v-for="(m,i) in item.images" :key="i">
                    <img :src="m" :title="m" alt="图片加载失败" style="margin-right: 20px">
                  </span>
                </a>
              </div>
              <div class="info">
                <span v-text="'类型：'+item.info[0]" style="margin-right: 50px"></span>
                <span v-text="'作者：'+item.info[1]" v-if="item.info[1]" style="margin-right: 50px"></span>
                <span v-text="'发布日期：'+item.info[2]"></span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="武汉市特色专题">
        <el-card class="box-card" v-for="(item,index) in whnews" :key="item.id">
          <el-row :gutter="50">
            <el-col :span="4">
              <a :href="item.url" target="_blank"><img v-if="item.image" :src=item.image :title="item.image" alt="图片加载失败"></a>
            </el-col>
            <el-col :span="20">
              <div class="title">
                <a :href="item.url"target="_blank"><span v-text="item.title"></span></a>
              </div>
              <div class="content">
                <a :href="item.url"target="_blank"><span v-text="item.content"></span></a>
                <a :href="item.url"target="_blank">
                  <span v-if="item.images" v-for="(m,i) in item.images" :key="i">
                    <img :src="m" :title="m" alt="图片加载失败" style="margin-right: 20px">
                  </span>
                </a>
              </div>
              <div class="info">
                <span v-text="'类型：'+item.info[0]" style="margin-right: 50px"></span>
                <span v-text="'作者：'+item.info[1]" v-if="item.info[1]" style="margin-right: 50px"></span>
                <span v-text="'发布日期：'+item.info[2]"></span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="杭州市特色专题">
        <el-card class="box-card" v-for="(item,index) in hznews" :key="item.id">
          <el-row :gutter="50">
            <el-col :span="4">
              <a :href="item.url" target="_blank"><img v-if="item.image" :src=item.image :title="item.image" alt="图片加载失败"></a>
            </el-col>
            <el-col :span="20">
              <div class="title">
                <a :href="item.url"target="_blank"><span v-text="item.title"></span></a>
              </div>
              <div class="content">
                <a :href="item.url"target="_blank"><span v-text="item.content"></span></a>
                <a :href="item.url"target="_blank">
                  <span v-if="item.images" v-for="(m,i) in item.images" :key="i">
                    <img :src="m" :title="m" alt="图片加载失败" style="margin-right: 20px">
                  </span>
                </a>
              </div>
              <div class="info">
                <span v-text="'类型：'+item.info[0]" style="margin-right: 50px"></span>
                <span v-text="'作者：'+item.info[1]" v-if="item.info[1]" style="margin-right: 50px"></span>
                <span v-text="'发布日期：'+item.info[2]"></span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="太原市特色专题">
        <el-card class="box-card" v-for="(item,index) in tynews" :key="item.id">
          <el-row :gutter="50">
            <el-col :span="4">
              <a :href="item.url" target="_blank"><img v-if="item.image" :src=item.image :title="item.image" alt="图片加载失败"></a>
            </el-col>
            <el-col :span="20">
              <div class="title">
                <a :href="item.url"target="_blank"><span v-text="item.title"></span></a>
              </div>
              <div class="content">
                <a :href="item.url"target="_blank"><span v-text="item.content"></span></a>
                <a :href="item.url"target="_blank">
                  <span v-if="item.images" v-for="(m,i) in item.images" :key="i">
                    <img :src="m" :title="m" alt="图片加载失败" style="margin-right: 20px">
                  </span>
                </a>
              </div>
              <div class="info">
                <span v-text="'类型：'+item.info[0]" style="margin-right: 50px"></span>
                <span v-text="'作者：'+item.info[1]" v-if="item.info[1]" style="margin-right: 50px"></span>
                <span v-text="'发布日期：'+item.info[2]"></span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="其他......">
        <moreNews></moreNews>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import moreNews from './moreNews'
  export default {
    name: "news_subject",
    components: {moreNews},
    data(){
      return {
        loading:'true',
        tabPosition: 'top',
        show:true,
        bjnews:'',
        shnews:'',
        gznews:'',
        sznews:'',
        whnews:'',
        hznews:'',
        tynews:'',
      }
    },
    mounted(){
      this.getNews()
    },
    methods:{
      getNews(){
        this.$axios.get('http://127.0.0.1:5000/getNewsSubject')
          .then((response) => {
            if(response.data.code === 'success'){
              console.log(response.data);
              this.bjnews = response.data.data[0];
              this.shnews = response.data.data[1];
              this.gznews = response.data.data[2];
              this.sznews = response.data.data[3];
              this.whnews = response.data.data[4];
              this.hznews = response.data.data[5];
              this.tynews = response.data.data[6];
              this.loading = false;
            }
          }).catch(err => {
          console.log(err);
          this.$alert('请求超时，刷新重试！')
        })
      }
    }
  }
</script>

<style scoped>
  .news_report {
    min-height: 500px;
  }
  .box-card {
    text-align: left;
  }
  img {
    width: 180px;
  }
  .title {
    font-size: 20px;
  }
  .content {
    font-size: 14px;
    padding: 20px 0;
  }
  .info {
    font-size: 14px;
  }
  a {
    text-decoration-line: none;
    color: #333;
  }
  a :hover{
    color: #FF6600;
  }
</style>

