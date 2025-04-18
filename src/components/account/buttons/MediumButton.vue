<template>
  <div class="medium-btn">
    <slot name="btn-text"></slot>
  </div>
</template>

<style scoped>
.medium-btn {
  display: flex;
  width: 259px;
  height: 54px;
  padding: 16px 0px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 10px;
  background: var(--vt-c-second-bg-color);
  color: var(--vt-c-main-bg-color);
  transition: all 0.3s ease;
  cursor: pointer;
}

/* Hover: đổi màu nền sang trắng, chữ đen */
.medium-btn:hover {
  background: var(--vt-c-main-bg-color);
  color: var(--vt-c-second-bg-color);
}

.medium-btn:hover ::v-deep(.text) {
  color: var(--vt-c-second-bg-color);
}
</style>
