<template>
  <span class="back-text">
    <slot name="back"></slot>
  </span>
</template>

<style scoped>
.back-text {
  color: var(--vt-c-second-bg-color);
  font-family: Montserrat;
  font-size: 9px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 12.6px */
}
</style>
