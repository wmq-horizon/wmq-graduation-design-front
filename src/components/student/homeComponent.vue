<template>
  <div class="parent">
      <!--    导航菜单-->
      <div >
          <img src="../../assets/标题.png" height="90%" width="70%" alt="title"/>
      </div>
      <div>
        <el-menu :default-active="$route.path"
                 class="el-menu-demo"
                 mode="horizontal"
                 router="router"
                 @select="handleSelect"
                 text-color="#000"
                 active-text-color="#006080">

          <el-menu-item index="/home"><i class="el-icon-office-building"></i>讲座大厅</el-menu-item>

          <el-menu-item index="/popularityList"><i class="el-icon-finished"></i>数据分析</el-menu-item>

          <el-menu-item index="/studentHome"><i class="el-icon-s-custom"></i>个人中心</el-menu-item>

        </el-menu>
      </div>
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
            // logOut(){
            //     sessionStorage.removeItem("session");
            //     sessionStorage.removeItem("status");
            //     window.location.href='/homePage';
            //     this.$axios.get("/logOut").then(res=>{
            //         console.log("logout");
            //         console.log(res);
            //     }).catch(err=>{console.log(err)});
            // },
        },
        created() {
            console.log("userName"+this.userName)
        }

    }
</script>
<style scoped>
  .parent{
    display: flex;
    justify-content: space-between;
    height: 100%;
    padding-bottom: 15%;
  }

</style>
