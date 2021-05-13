<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="grid-content" style="padding-left:3%;float: left">
        <img src="../../assets/校徽.png" height="50" width="50"/>
        <img src="../../assets/标题.png" height="50" width="250"/>
      </div>
        <span v-if="userName!==null">
          <el-button type="text" style="float:right;margin-top: 1.2%;padding-right: 1%;color: red" @click="logOut">退出</el-button>
          <span style="float:right;margin-top: 2%;padding-right: 1%;font-size: 15px">你好,{{this.userName}}</span>
        </span>
    </el-col>
  </el-row>
</template>

<script>
    export default {
        name: "headerBar",
        data() {
            return {
                loginStatus:sessionStorage.getItem("session"),
                userName: sessionStorage.getItem("session"),
            }
        },
        methods: {
            logOut() {
                sessionStorage.removeItem("session");
                sessionStorage.removeItem("status");
                sessionStorage.removeItem("role");
                this.$axios.get("logOut").then(res => {
                    window.location.href = '/login';
                    console.log("logout");
                    console.log(res);
                }).catch(err => {
                    console.log(err)
                });
            },
        },
        created() {
            console.log("session"+sessionStorage.getItem("session"));
        },
        mounted() {
            console.log("session"+sessionStorage.getItem("session"));
        }
    }

</script>

<style scoped>
</style>
