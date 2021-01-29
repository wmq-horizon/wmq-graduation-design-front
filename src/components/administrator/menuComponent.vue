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
<!--            <template slot="title">分组一</template>-->
            <el-menu-item index="/lectureHome">新增讲座</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
<!--          <el-menu-item-group title="分组2">-->
<!--            <el-menu-item index="1-3">选项3</el-menu-item>-->
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>教室资源管理</span>
          </template>
          <el-menu-item-group>
            <!--            <template slot="title">分组一</template>-->
            <el-menu-item index="/classRoomHome">创建宣讲室</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <!--          <el-menu-item-group title="分组2">-->
          <!--            <el-menu-item index="1-3">选项3</el-menu-item>-->
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>学生信息管理</span>
          </template>
          <el-menu-item-group>
            <!--            <template slot="title">分组一</template>-->
            <el-menu-item index="/studentCenter">编辑学生信息</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <!--          <el-menu-item-group title="分组2">-->
          <!--            <el-menu-item index="1-3">选项3</el-menu-item>-->
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
          <!--          <el-menu-item-group title="分组2">-->
          <!--            <el-menu-item index="1-3">选项3</el-menu-item>-->
        </el-submenu>
<!--        <el-menu-item index="2">-->
<!--          <i class="el-icon-menu"></i>-->
<!--          <span slot="title">教室资源管理</span>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="3">-->
<!--          <i class="el-icon-document"></i>-->
<!--          <span slot="title">学生信息管理</span>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="4">-->
<!--          <i class="el-icon-setting"></i>-->
<!--          <span slot="title">个人信息管理</span>-->
<!--        </el-menu-item>-->
      </el-menu>
    </el-col>
  </div>
</template>

<script>
    export default {
        name: "menuComponent",
        data(){
            return{
                // activeIndex:'1',
                // activeIndex2:'1',
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
