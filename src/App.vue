<template>
  <div class="wrapper">
    <transition name="" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
  overflow: hidden;
}
</style>
