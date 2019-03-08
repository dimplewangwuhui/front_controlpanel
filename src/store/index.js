import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 存储token
    token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ''
  },
  /* actions: {
     changeLogin(ctx,Authorization){
       ctx.commit('changeLogin',Authorization);
     }
   },*/
  mutations: {
    // 修改token，并将token存入localStorage/sessionStorage中
    set_token (state,user) {
      state.token = user.token;
      console.log("store/index.js---到这里了!");
      sessionStorage.setItem('token', user.token);
    }
  }
});

export default store
