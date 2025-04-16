<script setup>
import SignIn from './components/SignIn.vue'
</script>

<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>

</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
  margin: 0;
}
</style>
