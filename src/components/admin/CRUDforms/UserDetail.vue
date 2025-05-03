<script setup>
import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
defineProps(['user'])
</script>

<template> 
  <div class="detail-wrapper">
    <CRUDMainForm title="User Detail" :data="user" @close="$emit('close')">
      <template #title>
        <TitleText>
          <template #text>
            User Detail
          </template>
        </TitleText>
      </template>
    </CRUDMainForm>
  </div>
</template>



<style scoped>
.detail-wrapper {
  color: var(--vt-c-main-bg-color);
  width: 100%;
  height: 100%;
  padding: 12px;
  font-family: Montserrat;
}
</style>

