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
  background: #000000;
  color: #FFFFFF;
  transition: all 0.3s ease;
  cursor: pointer;
}

/* Hover: đổi màu nền sang trắng, chữ đen */
.medium-btn:hover {
  background: #FFFFFF;
  color: #000000;
}

.medium-btn:hover ::v-deep(.text) {
  color: #000000;
}
</style>
