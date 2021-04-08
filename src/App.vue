<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
    // created() {
    //     if(sessionStorage.getItem("session")==null){
    //         console.log("app.vue里面的session");
    //         console.log(sessionStorage.getItem("session"));
    //         window.location.href='/admin/login';
    //     }
    // }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  margin: 0;
  padding: 0;
  text-decoration:none;

}
a{text-decoration:none}
    .el-link{
      text-decoration: none;
    }
</style>
