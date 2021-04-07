<template>
  <div>
    <el-header>
      <!--    导航菜单-->
      <el-menu :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
        router="router"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/homePage">讲座大厅</el-menu-item>
        <el-menu-item index="/popularityList">人气榜</el-menu-item>
        <el-menu-item index="/hardworkingList">勤学榜</el-menu-item>
        <el-menu-item index="/studentHome">个人中心</el-menu-item>
        <span v-if="userName!==null">
          <el-link type="danger" style="float:right;margin-top: 3%;padding-right: 1%;color: red" @click="logOut">退出</el-link>
        <span style="float:right;margin-top: 3%;padding-right: 1%;font-size: 15px;color: white">你好,{{this.userName}}</span>
        </span>

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
                userName:sessionStorage.getItem("session"),
            }
        },
        methods:{
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            logOut(){
                sessionStorage.removeItem("session");
                sessionStorage.removeItem("status");
                window.location.href='/homePage';
                this.$axios.get("/logOut").then(res=>{
                    console.log("logout");
                    console.log(res);
                }).catch(err=>{console.log(err)});
            },
        },
        created() {
            console.log("userName"+this.userName)
        }

    }
</script>

<style scoped>

</style>
