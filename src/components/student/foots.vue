<template>
    <div>
      <el-footer >
        <el-col :span="12">
            <div id="left-box">
              <span>XXX大学<br></span>
              <span>联系人：王女士</span>
            </div>
        </el-col>
        <el-divider direction="vertical"></el-divider>
        <el-col :span="12">
          <div id="right-box">
            <span>讲座信息网<br></span>
            <span>电话：15760232967</span>
          </div>
        </el-col>
      </el-footer>
      <el-footer>
      </el-footer>
    </div>
</template>

<script>
    export default {
        name: "foots"
    }
</script>

<style scoped>
  .el-footer {
    background-color: #3C3C43;
    color: white;
    width: 100%;
    padding-bottom: 0;
    padding-top: 2%;
    display: flex;
    font-size: 16px;
  }
  .left-box{
    text-align: right;
    height: 100%;
    width: 100%;
    float: right;
  }
  .right-box{
    text-align: left;
    height: 100%;
    width: 100%;
    float: left;
  }
</style>
