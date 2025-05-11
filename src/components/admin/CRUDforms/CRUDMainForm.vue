<script setup>
defineProps({
  title: String,
  data: Object
})

import BackIcon from '@/assets/icons-vue/back.vue'
import TitleText from '../texts/TitleText.vue'
import BackButton from '../buttons/BackButton.vue'

const emit = defineEmits(['close'])
</script>

<template>
  <div class="top-group">
    <slot name="back-button">
      <BackButton @click="$emit('close')">
        <template #btn-icon>
          <BackIcon />
        </template>
      </BackButton>
      <slot name="title"></slot>
    </slot>

  </div>
  <slot name="content" />
  <slot :data="data" />
</template>

<style scoped>
.detail-wrapper {
  color: var(--vt-c-main-bg-color);
  width: 100%;
  padding: 12px;
  font-family: Montserrat;
}

.top-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;       
}
</style>
