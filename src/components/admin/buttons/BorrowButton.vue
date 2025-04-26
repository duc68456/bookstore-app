<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // 'primary' hoặc 'secondary'
  },
  active: {
    type: Boolean,
    default: false
  }
})

const isHover = ref(false)
</script>

<template>
  <div 
    class="btn" 
    :class="[{ active: active }, variant]" 
    @mouseover="isHover = true" 
    @mouseleave="isHover = false"
  >
    <slot name="text" />
  </div>
</template>

<style scoped>
.btn {
  padding: 8px 56px;
  border-radius: 12px;
  border: 1px solid transparent;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

/* Variant primary */
.primary {
  background-color: white;
  color: black;
  border: 1px solid #E8E8E8;
}
.primary.active {
  background-color: black;
  color: white;
}

/* Variant secondary */
.secondary {
  background-color: #E8E8E8;
  color: black;
}
.secondary.active {
  background-color: black;
  color: white;
}
</style>
