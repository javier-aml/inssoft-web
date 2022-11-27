<template>
    <register class="register"></register>
  </template>
  
  <script>
  import Login from '../components/Login.vue'
  import Register from '../components/Register.vue'
  
  export default {
    components: { Login, Register }
  }
  </script>
  
  <style scoped>
  .register{
    margin-left: auto;
    margin-right: auto;
  }
  </style>
  