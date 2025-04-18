<template>
  <p class="large-white-text">
    <slot name="note"></slot>
  </p>
</template>

<style scoped>
.large-white-text {
  color: var(--vt-c-main-bg-color);
  text-align: center;
  font-family: Montserrat;
  font-size: 19px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 26.6px */
}
</style>
