<template>
  <div class="main">
    <el-col :span="24">
      <el-menu :default-active="$route.path"
        class="el-menu-vertical-demo"
        router="router"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>讲座信息管理</span>
          </template>
          <el-menu-item-group >
            <el-menu-item index="/admin/todayLecture">签到管理</el-menu-item>
            <el-menu-item index="/lectureHome">编辑讲座</el-menu-item>
            <el-menu-item index="/createNewLecture">新增讲座</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>宣讲室管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/classRoomHome">编辑宣讲室</el-menu-item>
            <el-menu-item index="/newRoom">新增宣讲室</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>用户信息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin/userCenter">编辑用户信息</el-menu-item>
            <el-menu-item index="/admin/upLoadUsers">上传用户信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span> 个人信息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin/personalInfo">个人中心</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>

    </el-col>
  </div>
</template>

<script>
    export default {
        name: "menuComponent",
        data(){
            return{

            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
  .main{
    background-color: #434A50
  }

  element.style {
    padding-left: 40px;
    color: rgb(255, 255, 255);
    background-color: rgb(84, 92, 100);
  }
  .el-submenu .el-menu-item{
    min-width: 0px;
  }
</style>
