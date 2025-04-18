<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 24
  }
})

const iconPath = new URL(`../../assets/icons/${name}.svg`, import.meta.url).href
</script>

<template>
  <img :src="iconPath" :alt="name" class="icon" :width="size" :height="size" />
</template>

<style scoped>
.icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: inline-block;
  object-fit: contain;
}
</style>
