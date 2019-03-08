import Vue from 'vue'
import Router from 'vue-router'

import homePage from '@/components/common/homePage'
import login from '@/components/login/login'
import register from '@/components/login/register'
import register2login from '@/components/login/register2login'

import page400 from '@/components/errorPage/page400'
import page403 from '@/components/errorPage/page403'
import page404 from '@/components/errorPage/page404'

import main from '@/components/common/main'
import job from '@/components/main/rentInfo/job'
import userInfo from '@/components/main/userInfo'


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: homePage,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/register2login',
      name: 'register2login',
      component: register2login,
    },
    {
      path: '/page400',
      name: 'page400',
      component: page400,
    },
    {
      path: '/page403',
      name: 'page403',
      component: page403,
    },
    {
      path: '/page404',
      name: 'page404',
      component: page404,
    },
    {
      path: '/main',
      name: '首页',
      component: main,
      children: [
        {
          path: '/job',
          name: '找工作',
          component: job,
        },
        {
          path: '/userInfo',
          name: '用户信息',
          component: userInfo,
        }]
    }
  ],
  mode: "history"
});

//全局路由守卫
router.beforeEach((to, from, next) => {
  var token = sessionStorage.getItem('token');
  console.log("浏览器本地缓存的token: "+token);
  if(token === ''||token === null||token === 'undefined'){
    if(to.path === '/' || to.path === '/login' || to.path === '/register' || to.path === '/register2login'){
      next()
    }
    else {
      next({path: '/'})
    }
  }
  else {
    next()
  }
});

export default router
