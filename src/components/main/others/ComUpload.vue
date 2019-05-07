<template>
  <div class="com-upload-img">
    <div class="img_group">
      <div class="img_box" v-if="allowAddImg">
        <input type="file" accept="image/*" @change="changeImg($event)">
        <!--<div class="filter"></div>-->
      </div>
      <div class="img_box" v-for="(item,index) in imgArr" :key="index">
        <div class="img_show_box">
          <img :src="item" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'ComUpLoad',
    data () {
      return {
        imgData:'',
        imgArr:[],
        imgSrc:'',
        allowAddImg:true,
      }
    },
    methods: {
      changeImg: function(e) {
        var _this = this;
        var imgLimit = 1024;
        var files = e.target.files;
        console.log('files:', files);  //{0: File, length: 1}
        var image = new Image();
        if(files.length>0){
          var dd = 0;
          console.log('=============', files.item(dd));
          console.log('=============', files.item(dd).type);
          var timer = setInterval(function(){
            if(files.item(dd).type !== 'image/png'&&files.item(dd).type !== 'image/jpeg'&&files.item(dd).type !== 'image/gif'){
              return false;
            }
            // if(files.item(dd).size>imgLimit*102400){
            //   //to do sth
            // }
            else{
              image.src = window.URL.createObjectURL(files.item(dd));
              image.onload = function(){
                // 默认按比例压缩
                let w = image.width,
                  h = image.height,
                  scale = w / h;
                w = 200;
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
                console.log('---------------------', base64);
                // 回调函数返回base64的值
                console.log('++++++++++++++', _this.imgArr.length);
                // if(_this.imgArr.length<=4){
                  _this.imgArr.unshift('');
                  _this.imgArr.splice(0, 1, base64);//替换数组数据的方法，此处不能使用：this.imgArr[index] = url;
                console.log('++++++++++++++', _this.imgArr.length);
                //   if(_this.imgArr.length>=5){
                //     _this.allowAddImg = false;
                //   }
                // }
              }
            }
            if(dd<files.length-1){
              dd++;
            }else{
              clearInterval(timer);
            }
          },1000)
        }
      },
      // deleteImg: function(index){
      //   this.imgArr.splice(index,1);
      //   if(this.imgArr.length<5){
      //     this.allowAddImg = true;
      //   }
      // },
    },
  }
</script>
