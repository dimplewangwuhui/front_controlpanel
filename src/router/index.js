import Vue from 'vue'
import Router from 'vue-router'

import firstPage from '@/components/main/firstPage'

import homePage from '@/components/common/homePage'
import login from '@/components/login/login'
import register from '@/components/login/register'
import register2login from '@/components/login/register2login'
import forgetPwd from '@/components/login/forgetPwd'

import page400 from '@/components/errorPage/page400'
import page403 from '@/components/errorPage/page403'
import page404 from '@/components/errorPage/page404'

import main from '@/components/common/main'
import job from '@/components/main/dataAcquisition/job'
import house from '@/components/main/dataAcquisition/house'
import agency from '@/components/main/dataAcquisition/agency'

import echarts_price from '@/components/main/visualDisplay/echarts_price'
import echarts_trend from '@/components/main/visualDisplay/echarts_trend'
import echarts_count from '@/components/main/visualDisplay/echarts_count'
import echarts_area from '@/components/main/visualDisplay/echarts_area'
import ranking from '@/components/main/visualDisplay/ranking'

import wordCloud from '@/components/main/visualDisplay/wordCloud'
//用户
import userManage from '@/components/main/user/userManage'
import userInfo from '@/components/main/user/userInfo'
import updatePwd from '@/components/main/user/updatePwd'
import updatePwd2login from '@/components/main/user/updatePwd2login'
import moreFocus_house from '@/components/main/user/moreFocus_house'
import moreFocus_agency from '@/components/main/user/moreFocus_agency'
import moreAdvices from '@/components/main/user/moreAdvices'
//留言
import advise from '@/components/main/advise/advise'
import adviseManage from '@/components/main/advise/adviseManage'
//公告
import notice from '@/components/main/notice/notice'
import moreNotice from '@/components/main/notice/moreNotice'
//其他
import contact from '@/components/main/others/contact'
import news from '@/components/main/others/news'
import baidu from '@/components/main/others/baidu'
import ComUpload from '@/components/main/others/ComUpload'


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
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: forgetPwd,
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
      path: '/updatePwd2login',
      name: 'updatePwd2login',
      component: updatePwd2login,
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
          path: '/firstPage',
          name: '首页',
          component: firstPage,
        },
        {
          path: '/job',
          name: '找工作',
          component: job,
        },
        {
          path: '/house',
          name: '找房源',
          component: house,
        },
        {
          path: '/agency',
          name: '找中介',
          component: agency,
        },
        {
          path: '/echarts_price',
          name: '租金比较',
          component: echarts_price,
        },
        {
          path: '/echarts_trend',
          name: '租金走势',
          component: echarts_trend,
        },
        {
          path: '/echarts_count',
          name: '租房数量',
          component: echarts_count,
        },
        {
          path: '/echarts_area',
          name: '租房面积',
          component: echarts_area,
        },
        {
          path: '/ranking',
          name: '小区排名',
          component: ranking,
        },
        {
          path: '/wordCloud',
          name: '词云展示',
          component: wordCloud,
        },
        {
          path: '/news',
          name: '租房资讯',
          component: news,
        },
        {
          path: '/baidu',
          name: '百度一下',
          component: baidu,
        },
        {
          path: '/contact',
          name: '联系我们',
          component: contact,
        },
        {
          path: '/ComUpload',
          name: '上传图片',
          component: ComUpload
        },
        {
          path: '/advise',
          name: '留言反馈',
          component: advise,
        },
        {
          path: '/adviseManage',
          name: '留言管理',
          component: adviseManage,
        },
        {
          path: '/userInfo',
          name: '用户信息',
          component: userInfo,
        },
        {
          path: '/moreFocus_house',
          name: '更多收藏',
          component: moreFocus_house,
        },
        {
          path: '/moreFocus_agency',
          name: '更多关注',
          component: moreFocus_agency,
        },
        {
          path: '/moreAdvices',
          name: '更多留言',
          component: moreAdvices
        },
        {
          path: '/updatePwd',
          name: '修改密码',
          component: updatePwd,
        },
        {
          path: '/userManage',
          name: '用户管理',
          component: userManage,
        },
        {
          path: '/notice',
          name: '平台公告',
          component: notice,
        },
        {
          path: '/moreNotice',
          name: '更多公告',
          component: moreNotice,
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
    if(to.path === '/' || to.path === '/login' || to.path === '/register' || to.path === '/register2login' || to.path === '/updatePwd2login' || to.path === '/forgetPwd'){
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
