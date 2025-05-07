<script setup>
import { computed } from 'vue'
import { categoriesList } from '@/data/categories.js'

const props = defineProps({
  modelValue: Array
})
const emit = defineEmits(['update:modelValue'])

const selectedCategories = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<template>
  <div class="wrapper">
    <slot name="text-above"></slot>
    <div class="frame">
      <v-select v-model="selectedCategories" :items="categoriesList" label="Select Categories" multiple chips
        variant="plain" hide-details density="comfortable" menu-icon="mdi-chevron-down" class="category-select" />
    </div>
  </div>
</template>

<style scoped>
.frame {
  display: flex;
  width: 441px;
  padding: 12px 16px;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #3D3E3E;
  background-color: var(--vt-c-main-bg-color);
  font-family: Montserrat, sans-serif;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

::v-deep(.category-select .v-field__input) {
  color: black !important;
  font-size: 15px;
  padding-top: 6px;
  /* Điều chỉnh khoảng cách từ trên xuống */
  padding-bottom: 6px;
  /* Điều chỉnh khoảng cách từ dưới lên */
  margin-top: 4px;
  /* Điều chỉnh khoảng cách giữa các items */
  margin-bottom: 0px;
}

::v-deep(.v-chip__content) {
  color: black !important;
  font-weight: 500;
}

::v-deep(.v-select__selections) {
  padding-top: 0px;
  /* Sửa khoảng cách trên */
  padding-bottom: 0px;
  /* Sửa khoảng cách dưới */
}
</style>
