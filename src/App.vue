<template>
  <div class="wrapper">
    <transition name="slide-fade" mode="out-in">
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

/* Slide hiệu ứng */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.6s ease;
  position: absolute;
  width: 100%;
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
