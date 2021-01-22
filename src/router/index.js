import Vue from 'vue'
import Router from 'vue-router'
import FirstPage from '@/components/FirstPage'
import classRoom from '../userViews/classRoom';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FirstPage',
      component: FirstPage
    }, {
      path: '/classRoom',
      name: 'classRoom',
      component: classRoom
    }
  ]
})
