<template>
  <div class="firstPage">
    <el-row>
      <el-col :span="9">
        <el-calendar v-model="value" style="width: 400px; height: 400px">
        </el-calendar>
      </el-col>
      <el-col :span="15">

      </el-col>
    </el-row>

    <!--<div class="counter">-->
      <!--<a href="http://www.reliablecounter.com" target="_blank">-->
        <!--<img src="http://www.reliablecounter.com/count.php?page=localhost:8080/firstPage&digit=style/plain/1/&reloads=1" alt="" title="" border="0">-->
      <!--</a><br />-->
      <!--<a href="http://" target="_blank" style="font-family: Geneva, Arial; font-size: 9px; color: #330010; text-decoration: none;"></a>-->
    <!--</div>-->



  </div>
</template>

<script>
  export default {
    name: "firstPage",
    data() {
      return {
        value: new Date(),
      }
    }
  }
</script>

<style scoped>

</style>

<style>
  .el-calendar-table .el-calendar-day {
    height: 40px;
  }
</style>
