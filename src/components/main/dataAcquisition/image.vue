<template>
  <div class="image"  v-loading="loading"  element-loading-text="图片加载中......">
    <a :href= item.urlinfo target="_blank" v-for="(item, index) in imageList">
      <img :src= item.imgURL :title= item.imgURL alt="图片加载失败">
    </a>
  </div>
</template>

<script>
  export default {
    name: "image",
    data() {
      return {
        loading: true,
        imageList: [],
      }
    },
    methods: {
      getImgURL() {
        this.$axios.get('http://127.0.0.1:5000/getImgURL')
          .then(response => {
            if(response.data.code === 'success'){
              this.imageList = response.data.data;
              this.loading = false;
            }else {
              console.log('图片获取失败')
            }
          }).catch((err) => {
            this.$message.error('图片加载失败');
            console.log(err);
        })
      }
    },
    mounted() {
      this.getImgURL();
    }
  }
</script>

<style scoped>
  .image {
    width: 100%;
    min-height: 600px;
    overflow: auto;
  }
  img {
    width: 100px;
    height: 100px;
    background: no-repeat;
    margin: 10px;
  }
  img :hover {
    width: 150px;
    height: 150px;
  }
</style>
