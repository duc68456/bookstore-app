<script setup>
import { defineAsyncComponent, computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 24
  }
})

// Dynamic import icon component
const IconComponent = computed(() =>
  defineAsyncComponent(() => import(`../../assets/icons/${props.name}.vue`))
)
</script>

<template>
  <component :is="IconComponent" :style="{ width: size + 'px', height: size + 'px' }" class="icon" />
</template>

<style scoped>
.icon {
  flex-shrink: 0;
  display: inline-block;
}
</style>
