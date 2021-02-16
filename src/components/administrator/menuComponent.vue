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
          <el-menu-item-group>
            <el-menu-item index="/lectureHome">编辑讲座</el-menu-item>
            <el-menu-item index="/createNewLecture">新增讲座</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>教室资源管理</span>
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
            <el-menu-item index="admin/userCenter">编辑用户信息</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span> 个人信息管理</span>
          </template>
          <el-menu-item-group>
            <!--            <template slot="title">分组一</template>-->
            <el-menu-item index="personalInfo">个人中心</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
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
</style>
