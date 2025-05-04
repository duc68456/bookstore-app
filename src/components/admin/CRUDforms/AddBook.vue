<script setup>
import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
defineProps(['book'])
</script>

<template> 
  <div class="detail-wrapper">
    <CRUDMainForm title="Book Detail" :data="book" @close="$emit('close')">
      <template #title>
        <TitleText>
          <template #text>
            Add Book
          </template>
        </TitleText>
      </template>
      <template #content>
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

