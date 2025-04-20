<template>
<div class="window">
    <div class="logo"><slot name="logo"></slot></div>
    <div class="slot"><slot name="btn1"></slot></div>
    <div class="slot"><slot name="btn2"></slot></div>
    <div class="slot"><slot name="btn3"></slot></div>
    <div class="slot"><slot name="btn4"></slot></div>
    <div class="slot"><slot name="btn5"></slot></div>
    <div class="slot"><slot name="btn6"></slot></div>
    <div class="slot"><slot name="btn7"></slot></div>
    <div class="slot"><slot name="btn8"></slot></div>
    <div class="slot"><slot name="btn9"></slot></div>
    <div class="bottom"><slot name="btn-log-out"></slot></div>
</div>
</template>
<style scoped>
.window {
  width: 222px;
  height: 100vh;
  background: var(--vt-c-second-bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
}

.top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.bottom {
  margin-top: auto;
  margin-bottom: 8px;
}

.logo {
  margin-bottom: 8px;
}

.slot {
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>