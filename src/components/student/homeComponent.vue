<template>
  <div>
    <el-header>
      <!--    导航菜单-->
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">讲座大厅</el-menu-item>
        <el-submenu index="2">
          <template slot="title">人气榜</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>勤学榜</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">个人中心</a></el-menu-item>
      </el-menu>
    </el-header>
  </div>

</template>

<script>
    export default {
        name: "homeComponent",
        data(){
            return{
                activeIndex:'1',
                activeIndex2:'1',
            }
        },
        methods:{
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
        }

    }
</script>

<style scoped>

</style>
