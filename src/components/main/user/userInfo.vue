<template>
  <div class="userinfo_table">
    <!--<el-table :data="tableData"-->
              <!--border-->
              <!--tooltip-effect="light"-->
              <!--:highlight-current-row="true"-->
              <!--:header-cell-style="{color: '#000', backgroundColor: '#DDE2EF'}"-->
              <!--style="width: 975px; margin: 10px auto">-->
      <!--<el-table-column fixed="left" type="selection" align="center" width="50"></el-table-column>-->
      <!--<el-table-column prop="id" label="ID" align="center" width="60"></el-table-column>-->
      <!--<el-table-column prop="username" label="姓名" align="center" width="150"></el-table-column>-->
      <!--<el-table-column prop="sex" label="性别" align="center" width="150"></el-table-column>-->
      <!--<el-table-column prop="age" label="年龄" align="center" width="150"></el-table-column>-->
      <!--<el-table-column prop="email" label="邮箱" align="center" width="160"></el-table-column>-->
      <!--<el-table-column prop="number" label="手机号" align="center" width="150"></el-table-column>-->
      <!--<el-table-column fixed="right" label="操作" align="center" width="100">-->
        <!--<template slot-scope="scope">-->
          <!--&lt;!&ndash;<el-button type="primary" size="small" style="cursor: pointer;" @click="edit(scope.row,scope.$index)">完善信息</el-button>&ndash;&gt;-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->

    <el-row :gutter="10">
      <el-col :span="4">
        <div class="info">
          <div style="padding: 10px; border-bottom: 1px dotted #909399; background-color: #409EFF">个人信息</div>
          <img :src=headURL @click="dialogFormVisible = true">
          <div style="margin-top: 10px">
            <el-tooltip placement="left" effect="light">
              <div slot="content">编号：{{infos.id}}</div>
              <el-button class="infos_button" type="primary"><i class="iconfont icon-id" style="padding-right: 0; font-size: 25px"></i></el-button>
            </el-tooltip>
            <el-tooltip placement="right" effect="light">
              <div slot="content">用户名：{{infos.username}}</div>
              <el-button class="infos_button" type="primary"><i class="iconfont icon-yonghu" style="padding-right: 0; font-size: 25px"></i></el-button>
            </el-tooltip>
          </div>
          <div>
            <el-tooltip placement="left" effect="light">
              <div slot="content">性别：{{infos.sex}}</div>
              <el-button class="infos_button" type="primary"><i class="iconfont icon-xingbie" style="padding-right: 0; font-size: 25px"></i></el-button>
            </el-tooltip>
            <el-tooltip placement="right" effect="light">
              <div slot="content">年龄：{{infos.age}}岁</div>
              <el-button class="infos_button" type="primary"><i class="iconfont icon-chushengnianyue" style="padding-right: 0; font-size: 25px"></i></el-button>
            </el-tooltip>
          </div>
          <div>
            <el-tooltip placement="left" effect="light">
              <div slot="content">邮箱：{{infos.email}}</div>
              <el-button class="infos_button" type="primary"><i class="iconfont icon-youxiang" style="padding-right: 0; font-size: 25px"></i></el-button>
            </el-tooltip>
            <el-tooltip :content=infos.number placement="right" effect="light">
              <div slot="content">手机号：{{infos.number}}</div>
              <el-button class="infos_button" type="primary"><i class="iconfont icon-shouji" style="padding-right: 0; font-size: 30px"></i></el-button>
            </el-tooltip>
          </div>
          <el-button type="primary" size="small" style="cursor: pointer; margin-top: 10px; margin-bottom: 20px" @click="edit">信息完善</el-button>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="focus">
          <div style="padding: 10px; border-bottom: 1px dotted #909399; background-color: #dea726">收藏房源</div>
          <div v-for="(item, index) in focus_house" :key="focus_house.title" style="text-align: left;">
            <p style="margin-bottom: 0">【{{ item.city }}-{{ item.region }}】</p>
            <p style="margin: 5px 10px; font-size: 14px">标题：{{ item.title }}</p>
            <p style="margin-top: 0; margin-left: 10px; font-size: 14px">地址：{{ item.address }}</p>
          </div>
          <el-button type="text" class="moreHouse" @click="moreFocus_house">更多>>></el-button>
        </div>
        <div class="focus">
          <div style="padding: 10px; border-bottom: 1px dotted #909399; background-color: #dea726">关注中介</div>
          <div v-for="(item, index) in focus_agency" :key="focus_agency.name" style="text-align: left;">
            <p style="margin-bottom: 0">【{{ item.name }}】</p>
            <p style="margin: 5px 10px; font-size: 14px">
              <span>主营板块：{{ item.city }}-{{ item.plate }}</span>
              <span style="padding-left: 30px">门店：{{ item.store }}</span>
            </p>
            <p style="margin-top: 0; margin-left: 10px; font-size: 14px">电话：{{ item.number }}</p>
          </div>
          <el-button type="text" class="moreHouse" @click="moreFocus_agency">更多>>></el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="message">
          <div style="padding: 10px; border-bottom: 1px dotted #909399; background-color: #00a854">历史留言</div>
          <div v-for="(item, index) in messages" :key="messages.create_date" style="text-align: left;">
            <p style="margin-bottom: 0">【{{ item.create_date }}】</p>
            <p style="margin: 5px 10px; font-size: 14px">评价：{{ item.evaluation }}</p>
            <p style="margin-top: 0; margin-left: 10px; font-size: 14px">留言：{{ item.message }}</p>
          </div>
          <el-button type="text" class="moreAdvice" @click="moreAdvices">更多>>></el-button>
        </div>
      </el-col>
    </el-row>

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

    <el-dialog title="完善个人信息" :visible.sync="editVisible">
      <el-form :model="editForm" ref="editForm" :rules="Rules" status-icon label-width="100px" label-position="right" style="margin: 0 auto">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="editForm.username" disabled style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="editForm.sex" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="editForm.age" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="number">
          <el-input v-model="editForm.number" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog--footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from '../../../api/api'
  import bus from '../../common/bus.js'

    export default {
      name: "userInfo",
      data(){
        return{
          headURL: require("../../../assets/img/bg.jpg"),
          dialogFormVisible: false,
          imgId: '',
          imgArray:[],

          tableData: [],
          editVisible: false,
          currentId:'',
          infos: '',
          focus_house: '',
          focus_agency: '',
          messages: '',
          editForm:{
            username:'',
            sex:'',
            age:'',
            email:'',
            number:''
          },
          Rules:{
            username:[
              { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            number:[
              { required: true, message: '请输入手机号', trigger: 'blur' },
              { pattern: /^1[34578]\d{9}$/, message: '请输入合法的手机号码' }

            ]
          },
        }
      },
      created() {
        this.getUser();
        this.get5UserMessage();
        this.getFocus_house();
        this.getFocus_agency();
        this.getHeadImg()
      },
      methods: {
        // handleAvatarSuccess(res, files) {
        //   console.log('如果成功调用这个函数');
        //   this.headURL = URL.createObjectURL(files.raw);
        // },
        getHeadImg() {
          let data = {'username': sessionStorage.getItem("ms_username")};
          this.$axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/getHeadImg',
            data: data
          }).then(response => {
              if(response.data.code === 'success'){
                console.log('获取头像成功');
                this.headURL = response.data.data;
              }else {
                this.headURL = require("../../../assets/img/bg.jpg")
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

        getUser(){
          let params =  sessionStorage.getItem('ms_username');
          this.$axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/getUser/' + params,
          }).then((response) => {
            console.log(response.data);
            if(response){
              this.tableData = response.data;
              this.infos = response.data[0];
              console.log(this.infos)
            }
          }).catch((err) => {
            console.log(err);
            this.$alert('请求超时，刷新重试！')
          })
        },
        edit(){
          this.editVisible = true;
          this.editForm.id = this.infos.id;
          this.editForm.username = this.infos.username;
          this.editForm.sex = this.infos.sex;
          this.editForm.age = this.infos.age;
          this.editForm.email = this.infos.email;
          this.editForm.number = this.infos.number;
        },
        editSubmit(){
          this.$refs.editForm.validate((valid) => {
            if (valid) {
              this.$confirm('确认提交吗？', '提示', {}).then(() => {
                let params = Object.assign({}, this.editForm);
                this.$axios({
                  method: 'put',
                  url: 'http://127.0.0.1:5000/update',
                  data: params
                })
                  .then((response) => {
                    if(response.data.code === 'success'){
                      this.$message({message: '提交成功', type: 'success'});
                      this.editVisible = false;
                      this.getUser();
                    }
                    else {
                      this.$message({message: '执行失败，请重试',type: "error"});
                    }
                  });
              }).catch((err) => {
                this.$message({message: '执行失败，请重试',type: "error"});
              });
            }
          });
        },
        // 获取用户个人历史留言
        get5UserMessage() {
          this.$axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/get5UserMessage',
            data: {'username': sessionStorage.getItem("ms_username")}
          }).then((response) => {
            console.log(response.data);
            this.messages = response.data.data;
          }).catch(err => {
            console.error(err);
            this.$alert('请求超时，刷新重试！')
          })
        },
        // 更多留言
        moreAdvices() {
          this.$router.push('/moreAdvices')
        },
        // 获取收藏的房源
        getFocus_house() {
          this.$axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/get3Focus_house',
            data: {'focusName': sessionStorage.getItem("ms_username")}
          }).then((response) => {
              console.log('获取3条收藏房源结果:', response.data.data);
              this.focus_house = response.data.data;
            }).catch(err => {
            console.error(err);
            this.$alert('请求超时，刷新重试！')
          })
        },
        moreFocus_house() {
          this.$router.push('/moreFocus_house')
        },
        // 获取关注中介
        getFocus_agency() {
          this.$axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/get3Focus_agency',
            data: {'focusName': sessionStorage.getItem("ms_username")}
          }).then((response) => {
            console.log('获取3条关注中介结果:', response.data.data);
            this.focus_agency = response.data.data;
          }).catch(err => {
            console.error(err);
            this.$alert('请求超时，刷新重试！')
          })
        },
        moreFocus_agency() {
          this.$router.push('/moreFocus_agency')
        },

      }
    }
</script>

<style scoped>
  .info {
    min-height:300px; background-color: #fff; text-align: center;
  }
  .info img {
    width:80px;
    height:80px;
    border-radius: 50%;
    margin-top: 20px;
    cursor: pointer;
  }
  .focus {
    min-height: 300px; background-color: #fff; margin-bottom: 10px;
  }
  .message {
    min-height: 400px; background-color: #fff;
  }
  .infos_button {
    background-color: #fff; border: 1px solid #fff; color: #000; padding: 10px
  }
  .moreHouse {
    margin-left: 500px;
    padding-top: 20px;
    color: #dea726;
  }
  .moreAdvice {
    margin-left: 150px;
    color: #00a854;
  }
</style>
