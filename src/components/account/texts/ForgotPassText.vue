<template>
  <div class="title" @click="$emit('click')">
    <slot name="fg"/>
  </div>
</template>

<script setup>
defineEmits(['click'])
</script>

<style scoped>
.title {
    color: var(--vt-c-second-bg-color);
    font-family: Montserrat;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 18.2px */
    cursor: pointer;
}
</style>
