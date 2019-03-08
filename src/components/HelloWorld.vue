<template>
  <div>
    <span>{{ serverResponse }} </span>
    <button @click="getData">GET DATA</button>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "HelloWorld",
    data: function() {
      return {
        serverResponse: 'resp',
        tableData:[]
      }
    },
    methods: {
      getData() {
        var that = this;
        const path = 'http://10.131.5.59:5000/getMsg';
        axios.get(path).then(function (response) {
          console.log(response);
          var msg = response.data.msg;
          that.serverResponse = msg;
          alert('Success ' + response.status + ', ' + response.data + ', ' + msg);
        }).catch(function (error) {
          alert('Error ' + error);
        })
      }
    }
  }
</script>
