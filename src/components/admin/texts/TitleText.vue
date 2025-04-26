<template>
  <span class="title-text">
    <slot name="text"></slot>
  </span>
</template>

<style scoped>
.title-text {
    color: #000000; /* Màu đen */
    font-family: Montserrat;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 35px */
}
</style>
