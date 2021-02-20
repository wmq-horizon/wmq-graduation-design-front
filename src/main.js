// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import homeComponent from "./components/student/homeComponent";
import menuComponent from "./components/administrator/menuComponent";
import headerBar from "./components/administrator/headerBar";
import axios from 'axios';
Vue.prototype.$axios = axios;

import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

Vue.component('homeComponent',homeComponent);
Vue.component('menuComponent',menuComponent);
Vue.component('headerBar',headerBar);
Vue.use(ElementUI);
Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://localhost:8088/api';
//设置允许携带cookie
axios.defaults.withCredentials = true;
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
// 配置全局前置路由守卫
router.beforeEach((to,from,next)=>{
  if(to.path==='/'||to.path==='/lectureHome'){
    console.log(sessionStorage.getItem("session"));
    next()
  }else{
    if(sessionStorage.getItem("session")!==null){
      next();
    }
  }
});
