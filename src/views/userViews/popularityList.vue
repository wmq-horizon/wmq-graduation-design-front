<template>
<el-container>
  <el-row>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="grid-content" style="padding-left:3%;float: left">
        <img src="../../assets/校徽.png" height="50" width="50"/>
        <img src="../../assets/标题.png" height="50" width="250"/>
      </div>
    </el-col>
  </el-row>
  <el-header>
    <!--    导航菜单-->
    <homeComponent></homeComponent>
  </el-header>
  <el-container>

  </el-container>
</el-container>
</template>
<script>
    export default {
        name: "popularityList"
    }
</script>

<style scoped>
  .lecture-class {
    background-color: white;
    font-size: 16px;
  }

  .lecture-text-class {
    background-color: white;
    font-size: 16px;
    font-weight: bold;
  }

  /*登录卡片内容*/
  .box-card {
    width: 100%;
    margin-top: 10%;
  }

  /*整体布局*/
  .el-header {
    text-align: center;
    float: left;
    line-height: 3%;
    width: 100%;
    padding: 0;
    font-size: x-small;
  }

  .el-footer {
    background-color: #3C3C43;
    color: white;
    text-align: center;
    float: left;
    width: 100%;
    padding-bottom: 0;
    padding-top: 2%;
  }

  .el-aside {
    text-align: center;
    line-height: 100px;
  }

  .el-main {
    padding-right: 6%;
    padding-left: 6%;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 40px;
    padding-top: 0;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  /*轮播图css*/
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  /*标题栏css*/
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 50px;
  }
</style>
