// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Message } from 'element-ui';
import axios from 'axios';
import VueResource from 'vue-resource'
import SIdentify from './components/login/Identify';    //引入验证码组件
import Vuex from 'vuex'
import store from "./store";
import qs from 'qs'


Vue.config.productionTip = false;

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Authorization'] = store.state.token;
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.component("SIdentify",SIdentify);

Vue.prototype.$axios = axios;
Vue.prototype.$message = Message;
Vue.prototype.$http = window.axios;
Vue.prototype.$qs = qs;

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(Vuex);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});


//添加请求拦截器
//异步请求前在header里加入token
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = store.state.token;
    }
    return config;
  },
  error => {
    Message({
      message: "登录状态信息过期,请重新登录",
      type: "error"
    });
    router.push({
      path: "/"
    });
    return Promise.reject(error);
  });

//添加响应拦截器
//异步请求后，判断token是否过期
axios.interceptors.response.use(
  response =>{
    return response;
  },
  error => {
    if(error.response){
      console.log(error.response);
      switch (error.response.status) {
        //401未登录
        case 401:
          sessionStorage.removeItem('token');
          this.$router.push('/');
          break;

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除token和清空vuex中token对象
        // 跳转页面
        case 403:
          Toast({
            message: '登录过期，请重新登录',  //现实的文本
            duration: 1000,   //现实的时间
            forbidClick: true
          });
          // 清除token
          sessionStorage.removeItem('token');
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/page403',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;

        // 404请求不存在
        case 404:
          Toast({
            message: '网络请求不存在',
            duration: 1000,
            forbidClick: true
          });
          setTimeout(() => {
            router.replace({
              path: '/page404',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;

        // 其他错误，直接抛出错误提示
        default:
          Toast({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true
          });
      }
    }
    return Promise.reject(error.response.data);
  }
);
