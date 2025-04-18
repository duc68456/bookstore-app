<script setup>
</script>

<template>
  <div class="app-wrapper">
    <transition name="slide" mode="out-in">
      <router-view :key="$route.fullPath" class="view-container" />
    </transition>
  </div>
</template>

<style scoped>
.app-wrapper {
  width: 100vw;
  height: 100vh;
  background-color: black;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.view-container {
  width: 100%;
  height: 100%;
  background-color: black;
  /* Đây là màu nền chuẩn, có thể đổi theo thiết kế của bạn */
}

/* Hiệu ứng trượt ngang */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
  position: absolute;
  width: 100%;
  height: 100%;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0.5;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0.5;
}
</style>
