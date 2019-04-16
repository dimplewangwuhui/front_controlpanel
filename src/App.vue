<template>
  <div id="app">
    <scrollTop></scrollTop>
    <router-view></router-view>
  </div>
</template>

<script>
  import '@/assets/app.css'
  import scrollTop from './components/common/scrollTop.vue'
  export default {
    name: 'App',
    components: {
      scrollTop,
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
</style>
