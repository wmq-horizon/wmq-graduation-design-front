<template>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="grid-content" style="padding-left:3%;float: left">
          <img src="../../assets/校徽.png" height="50" width="50"/>
          <img src="../../assets/标题.png" height="50" width="250"/>
        </div>

        <el-link type="danger" style="float:right;margin-top: 2%;padding-right: 1%" @click="logOut">退出</el-link>
        <span style="float:right;margin-top: 2%;padding-right: 1%;font-size: 15px">你好,{{this.userName}}</span>
      </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "headerBar",
        data(){
            return{
                userName:sessionStorage.getItem("session"),
            }
        },
        methods:{
            logOut(){
                sessionStorage.removeItem("session");
                this.$axios.get("/user/logOut").then(res=>{
                    window.location.href='/admin/login';
                    console.log("logout");
                    console.log(res);
                }).catch(err=>{console.log(err)});
            },
        },

    }

</script>

<style scoped>

</style>
