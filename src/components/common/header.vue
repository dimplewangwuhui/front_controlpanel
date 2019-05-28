<template>
  <div class="header" :style="{backgroundColor: headerBgColor}">
    <div class="head-left">
      <a href="/firstPage"><i class="iconfont icon-fangzi01-copy"></i></a>
      <span style="margin-left: 5px;">租房信息分析平台</span>
    </div>
    <div class="head-right">
      <div>

        <div style="float: left; margin-top: 10px; margin-right: 35px">
          <el-color-picker v-model="headerColor"  @change="changeHeaderColor"></el-color-picker>
        </div>
        <div class="message" @click="goNotice">
          <el-tooltip effect="light" visible-arrow="false" :content="message?`新增${message}条公告`:`查看公告`" placement="bottom">
            <el-badge is-dot class="item">
              <i class="iconfont icon-jinggao" ></i>
            </el-badge>
          </el-tooltip>
        </div>
        <!--<div style="float: left; ">-->
          <!--<el-button type="primary" icon="el-icon-magic-stick" @click="showColor"></el-button>-->
        <!--</div>-->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="light" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom" style=" transform: rotate(45deg);">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <img class="headImg" :src=headURL @click="dialogFormVisible = true">
        <div class="loginOut" style="float: right">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link" style="color:white; padding: 0 15px;">
              <span class="username">{{username}}</span>
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
              <el-dropdown-item command="updatePwd">修改密码</el-dropdown-item>
              <el-dropdown-item command="firstPage" divided>返回主页</el-dropdown-item>
              <el-dropdown-item command="homePage">返回首页</el-dropdown-item>
              <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <el-dialog title="更改头像" :visible.sync="dialogFormVisible">
      <el-upload
        class="uploadHead"
        drag
        action=""
        :multiple="false"
        :limit="1"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg文件，且不超过150KB</div>
      </el-upload>
      <!--<input type="file" accept="image/*" @change="changeImg($event)">-->
      <div class="img_box" v-for="(item,index) in imgArray" :key="index" style="margin-top: 20px">
        <div class="img_show_box">
          <img :src="item" alt="">
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeHead">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import bus from './bus';
    export default {
      name: "header",
      data(){
        return{
          message: 2,
          fullscreen: false,
          headURL: require('../../assets/img/bg.jpg'),
          show: false,
          headerColor: '#409EFF',
          headerBgColor: '#494090',
          dialogFormVisible: false,
          imgArray:[],
        }
      },
      computed:{
        username(){
          let username = sessionStorage.getItem('ms_username');
          return username ? username : this.name;
        }
      },
      methods:{
        changeHeaderColor(value) {
          console.log('=============', value);
          this.headerBgColor = value;
        },
        // 颜色改变
        showColor() {
          this.show = !this.show;
          bus.$emit('isShow', this.show);
        },
        // 转向公告页面
        goNotice() {
          this.$router.push('/notice');
        },
        // 全屏事件
        handleFullScreen(){
          let element = document.documentElement;
          if (this.fullscreen) {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.webkitCancelFullScreen) {
              document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            }
          } else {
            if (element.requestFullscreen) {
              element.requestFullscreen();
            } else if (element.webkitRequestFullScreen) {
              element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
              // IE11
              element.msRequestFullscreen();
            }
          }
          this.fullscreen = !this.fullscreen;
        },
        handleCommand(command){
          if(command === 'userInfo'){
            this.$router.push('/userInfo');
          }
          if(command === 'updatePwd'){
            this.$router.push('/updatePwd');
          }
          if(command === 'firstPage'){
            this.$router.push('/firstPage')
          }
          if(command === 'homePage'){
            this.$router.push('/')
          }
          else if(command === 'loginOut'){
            this.$confirm('确定退出吗？', '提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
              sessionStorage.clear();
              this.$router.push('/');
            })
          }
        },
        getHeadImg() {
          let data = {'username': sessionStorage.getItem("ms_username")};
          this.$axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/getHeadImg',
            data: data
          }).then(response => {
            if(response.data.code === 'success'){
              console.log('获取头像成功');
              this.headURL = response.data.data
            }else {
              this.headURL = require('../../assets/img/bg.jpg')
            }
          }).catch((err) => {
            console.log(err);
          })
        },
        beforeAvatarUpload(files) {
          var _this = this;
          const isJPG = files.type === 'image/jpeg';
          const isLt2M = files.size / 1024 /1024 < 0.15;
          if (!isJPG) {
            _this.$message.error('上传头像图片只能是 JPG 格式!');
            return false;
          }
          if (!isLt2M) {
            _this.$message.error('上传头像图片大小不能超过 150KB!');
            return false;
          }
          var image = new Image();
          if(files){
            console.log('=============', files);
            image.src = window.URL.createObjectURL(files);
            image.onload = function(){
              // 默认按比例压缩
              let w = image.width,
                h = image.height,
                scale = w / h;
              w = 100;
              h = w / scale;
              // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
              var quality = 0.7;

              //生成canvas
              var canvas = document.createElement('canvas');
              // 创建属性节点
              var anw = document.createAttribute("width");
              anw.nodeValue = w;
              console.log('***********', anw.nodeValue);
              var anh = document.createAttribute("height");
              anh.nodeValue = h;
              console.log('***********', anh.nodeValue);
              canvas.setAttributeNode(anw);
              canvas.setAttributeNode(anh);
              console.log('。。。。。。。。。。。。。', canvas);   // <canvas width="200" height=""></canvas>

              var ctx = canvas.getContext('2d');
              ctx.drawImage(image, 0, 0, w, h);
              console.log('---------------------', image.src);
              var ext = image.src.substring(image.src.lastIndexOf(".")+1).toLowerCase();//图片格式
              console.log('---------------------', ext);
              var base64 = canvas.toDataURL("image/"+ext, quality );
              // console.log('---------------------', base64);
              let data = {'username': sessionStorage.getItem("ms_username"), 'blobURL':ext};
              // 回调函数返回base64的值
              _this.imgArray.unshift('');
              _this.imgArray.splice(0, 1, base64);//替换数组数据的方法，此处不能使用：this.imgArr[index] = url;
              console.log('++++++++++++++', _this.imgArray.length);
              if(image.complete){
                console.log('图片加载完成');
                _this.$axios({
                  method: 'post',
                  url: 'http://127.0.0.1:5000/uploadHead',
                  data: data
                }).then((response) => {
                  console.log(response.data);
                  if(response.data.code === 'success'){
                    console.log(response.data);
                  }
                  else {
                    console.log(response.data);
                    _this.$message.error(response.data.msg);
                  }
                }).catch(err => {
                  console.log(err);
                  _this.$message.error('头像选择失败')
                })
              }
            };
          }
        },
        changeHead() {
          this.dialogFormVisible = false;
          let data = {'username': sessionStorage.getItem("ms_username")};
          this.$axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/changeHead',
            data: data
          }).then((response) => {
            if(response){
              this.headURL = response.data.data;
              this.$message.success(response.data.msg);
              this.getHeadImg();
            }
          }).catch(err => {
            console.log(err);
            this.$message.error(response.data.msg);
          })
        },
      },
      mounted() {
        this.getHeadImg();
      }
    }
</script>

<style scoped>
  .header {
    width:100%;
    /*background-color: #494090;*/
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    height: 56px;
    line-height: 56px;
    position: fixed;
    z-index: 999
  }
  .head-left {
    float:left;
    font-size: 22px;
    color:white;
    margin-left:2%;
    height: 56px;
    line-height: 56px;
  }
  .head-left a {
    color: white;
  }
  .head-right {
    float: right;
    margin-right: 2%
  }
  .headImg {
    float:left;
    width:40px;
    height:40px;
    border-radius: 50%;
    margin-top: 8px
  }
  .headImg :hover {
    cursor: pointer;
  }

  .btn-fullscreen{
    float: left;
    -webkit-transform: rotate(0deg);
    /*transform: rotate(45deg);*/
    margin-right: 40px;
    margin-left: 15px;
    font-size: 24px;
    color: #fff;
    cursor: pointer;
  }
  .message {
    float: left;
    margin-right: 10px;
    font-size: 24px;
    cursor: pointer;
  }
  .loginOut :hover{
    cursor: pointer;
    background-color: #3a0088;
  }
  .message :hover{
    cursor: pointer;
  }

</style>

<style>
  .item .el-badge__content.is-fixed {
    top: 22px;
    left: 0;
  }
  .el-color-picker__trigger {
    width: 30px;
    height: 30px;
  }
</style>
