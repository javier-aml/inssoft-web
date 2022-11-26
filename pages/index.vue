<template>
  <login class="login"></login>
</template>

<script>
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

export default {
  pageTransition: { name: 'page', mode: 'out-in' },
  components: { Login, Register }
}
</script>

<style scoped>
.login{
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
