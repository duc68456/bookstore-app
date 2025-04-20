<template>
  <span class="text">
    <slot name="text"></slot>
  </span>
</template>

<style scoped>
.text {
    color: var(--vt-c-main-bg-color);
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; 
}
</style>
