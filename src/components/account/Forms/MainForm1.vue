<template>
  <div class="window">
    <section class="background-grid">
<span v-for="n in 2000" :key="n"></span>

    </section>

    <div class="main-form">
      <slot name="pad-left"></slot>
      <slot name="pad-right"></slot>
    </div>
  </div>
</template>

<style scoped>
.background-grid {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(4vw - 0px));
  grid-auto-rows: calc(4vw - 0px);
  gap: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}

.background-grid span {
  background: #f000;
  transition: 1.5s;
}

.background-grid span:hover {
  background: var(--vt-c-second-bg-color);
  transition: 0s;
}


.main-form {
  width: 930px;
  height: 575px;
  background-color: var(--vt-c-main-bg-color);
  display: flex;
  position: relative;
  z-index: 1;
  justify-content: center;
  align-items: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25) 0 10px 10px rgba(0, 0, 0, 0.22);
}

.window {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
 	