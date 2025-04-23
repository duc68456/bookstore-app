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
/* Grid nền */
.background-grid {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(4vw - 3px));
  grid-auto-rows: calc(4vw - 3px);
  gap: 3px;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  /* XÓA dòng này nếu muốn hover */
  /* pointer-events: none; */
}

.background-grid span {
  background: #181818;
  transition: 1.5s;
}

.background-grid span:hover {
  background: var(--vt-c-second-bg-color);
  transition: 0s;
}


/* Khung chính */
.main-form {
  width: 930px;
  height: 575px;
  background-color: var(--vt-c-main-bg-color);
  display: flex;
  position: relative;
  z-index: 1;
  justify-content: center;
  align-items: center;
}

/* Toàn màn hình */
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
