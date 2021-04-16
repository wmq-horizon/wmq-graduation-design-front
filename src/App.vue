<template>
  <div id="app" @click="handleTime">
    <router-view/>
  </div>
</template>

<script>
    // import {megError, megSuc} from "@/utils/notice";
    export default {
        name: 'APP',
        data() {
            return {
                timmer: null,
                lastTime: null
            }
        },
        methods: {
            handleTime() {
                const curTime = new Date();
                // session超时时间和后端超时时间一样
                if (curTime - this.lastTime > 1000 * 15 * 60) {
                    //退出
                    if (this.$route.path === '/home'||this.$route.path === '/login') {
                        return
                    }
                    const h = this.$createElement;
                    this.$notify({
                        title: '登录超时',
                        message: h('i', { style: 'color: teal'}, '登录超时，请重新登录')
                    });

                    if(sessionStorage.getItem("role")==="admin"){
                        window.location.href = '/login';
                    }else if(sessionStorage.getItem("role")==="student"){
                        window.location.href = '/home';
                    }
                    sessionStorage.removeItem("role");
                    sessionStorage.removeItem("status");
                    sessionStorage.removeItem("session");
                } else {
                    this.lastTime = curTime;
                }
            }
        },
        created() {
            this.lastTime = new Date();
            window.addEventListener('resize', () => {
                this.handleTime();
            });

            window.addEventListener('scroll', () => {
                if (this.timmer) {
                    clearTimeout(this.timmer);
                }

                this.timmer = setTimeout(() => {
                    this.handleTime();
                }, 3000)
            }, true);

        }
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


</style>
