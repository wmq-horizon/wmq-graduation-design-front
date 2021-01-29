<template>
<div>
  <el-row>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="grid-content" style="padding-left:3%;float: left">
        <img src="../../assets/校徽.png" height="50" width="50"/>
        <img src="../../assets/标题.png" height="50" width="250"/>
      </div>
    </el-col>
  </el-row>
  <div>
    <el-col :span="4"><menuComponent></menuComponent></el-col>
    <el-col :span="20">

    </el-col>
  </div>
</div>
</template>

<script>
    export default {
        name: "classRoomHome"
    }
</script>

<style scoped>

</style>
