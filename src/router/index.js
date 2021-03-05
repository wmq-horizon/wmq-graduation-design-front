import Vue from 'vue'
import Router from 'vue-router'
import homePage from '../views/homePage';
import classRoom from '../views/userViews/classRoom';
import hardworkingList from '../views/userViews/hardworkingList';
import lectureHall from '../views/userViews/lectureHall';
import popularityList from '../views/userViews/popularityList';
import studentHome from '../views/userViews/studentHome';
import lectureHome from '../views/adminViews/lectureHome';
import classRoomHome from "../views/adminViews/roomHome";
import personalInfo from "../views/adminViews/personalInfo";
import createNewLecture from "../views/adminViews/newLecture";
import newRoom from "../views/adminViews/newRoom";
import loginIn from "../views/adminViews/loginIn";
import userCenter from "../views/adminViews/userCenter";
import upLoadUsers from "../views/adminViews/upLoadUsers";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/homePage",
    },{
      path: '/homePage',
      name: 'homePage',
      component: homePage
    }, {
      path: '/hardworkingList',
      name: 'hardworkingList',
      component: hardworkingList
    }, {
      path: '/popularityList',
      name: 'popularityList',
      component: popularityList
    }, {
      path: '/studentHome',
      name: 'studentHome',
      component: studentHome
    },{
      path: '/lectureHall',
      name: 'lectureHall',
      component: lectureHall
    },  {
      path: '/classRoom',
      name: 'classRoom',
      component: classRoom
    }, {
      path: '/lectureHome',
      name: 'lectureHome',
      component: lectureHome
    }, {
      path: '/classRoomHome',
      name: 'classRoomHome',
      component: classRoomHome
    }, {
      path: '/personalInfo',
      name: 'personalInfo',
      component: personalInfo
    }, {
      path: '/createNewLecture',
      name: 'createNewLecture',
      component: createNewLecture
    }, {
      path: '/newRoom',
      name: 'newRoom',
      component: newRoom
    }, {
      path: '/admin/login',
      name: 'loginIn',
      component: loginIn
    }, {
      path: '/admin/upLoadUsers',
      name: 'upLoadUsers',
      component: upLoadUsers
    }, {
      path: '/admin/userCenter',
      name: 'userCenter',
      component: userCenter
    }, {
      path: '/admin/ personalInfo',
      name: ' personalInfo',
      component: personalInfo
    }
  ],
  mode:'history'
})
