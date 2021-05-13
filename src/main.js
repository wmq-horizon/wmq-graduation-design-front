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
import foots from "./components/student/foots";
import axios from 'axios';
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
Vue.prototype.$axios = axios;
import echarts from 'echarts';
import  'lib-flexible';
Vue.prototype.$echarts = echarts;
Vue.component('homeComponent',homeComponent);
Vue.component('menuComponent',menuComponent);
Vue.component('headerBar',headerBar);
Vue.component('foots',foots);
Vue.use(ElementUI);
Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://127.0.0.1:8088/api';
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
  if(to.path==='/'||to.path==='/home'||to.path==='/login'){
    console.log(sessionStorage.getItem("session"));
    next()
  }else{
    if(sessionStorage.getItem("session")!==null){
      next();
    }else{
      if(sessionStorage.getItem("status")===null){
        //Notification 通知
        ElementUI.Notification({
          title: '请先登录',
          message: '请先登录再执行操作',
        });
      }
    }
  }
});
