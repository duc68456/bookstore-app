<template>
  <div class="window">
    <div class="slot">
      <slot name="logo"></slot>
    </div>
    <div class="slot">
      <slot name="main-title"></slot>
    </div>
    <div class="slot">
      <slot name="note"></slot>
    </div>
    <div class="slot">
      <slot name="frame1"></slot>
    </div>
    <div class="slot">
      <slot name="frame2"></slot>
    </div>
    <div class="slot">
      <slot name="forgot-password"></slot>
    </div>
    <div class="slot">
      <slot name="button"></slot>
    </div>
  </div>
</template>
<style scoped>
.window {
  width: 469px;
  height: 575px;
  flex-shrink: 0;
  background: var(--vt-c-main-bg-color);
  margin-right: auto;


  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.slot {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3%;
  margin-bottom: 3%;
}
</style>