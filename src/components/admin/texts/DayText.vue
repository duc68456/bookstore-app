<template>
  <span class="text">
    <slot name="text"></slot>
  </span>
</template>

<style scoped>
.text {
    color: var(--vt-c-second-bg-color);
    font-family: Montserrat;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
}
</style>
