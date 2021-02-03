// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import homeComponent from "./components/student/homeComponent";
import menuComponent from "./components/administrator/menuComponent";
import axios from 'axios'; /* 引入axios进行地址访问*/
// 自定义全局组件进行复用
Vue.component('homeComponent',homeComponent);
Vue.component('menuComponent',menuComponent);
Vue.use(ElementUI);
Vue.config.productionTip = false;
// 挂载到vue原型链上
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://localhost:8088/api';
//配置发送带请求携带cookie
// axios.defaults.withCredentials = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
// 配置全局路由守卫
router.beforeEach((to,from,next)=>{
  if(to.path === '/'||to.path==='/lectureHome'){
    next();
  }else{
    alert('您还没有登录，请先登录');
    next('/');
  }
});
