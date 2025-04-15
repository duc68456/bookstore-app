<template>
  <div class="frame">
    <slot name="txtInput"></slot>
  </div>
</template>

<style scoped>
.frame {
    border-radius: 12px;
    border: 1px solid #3D3E3E;
    background: var(--vt-c-main-bg-color);
    display: flex;
    width: 267px;
    padding: 12px 16px;
    align-items: center;
    gap: 8px;
}
</style>
