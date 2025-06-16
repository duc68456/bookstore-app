<script setup>
import FrameRU from '../frames/FrameRU.vue'
import FrameText from '../texts/FrameText.vue'
import TitleText from '../texts/TitleText.vue'
import CRUDMainForm from './CRUDMainForm.vue'

defineProps(['book'])
</script>

<template>
  <div class="detail-wrapper">
    <CRUDMainForm title="Book Detail" :data="book" @close="$emit('close')">
      <template #title>
        <TitleText>
          <template #text>
            Book Detail
          </template>
        </TitleText>
      </template>
      <template #content>
        <div class="frame-wrapper">
          <FrameRU readonly v-model="book.name" placeholder="Title" />
          <FrameRU readonly :modelValue="book.authors.join(', ')" placeholder="Author" />
          <FrameRU readonly v-model="book.importPrice" placeholder="Import Price" />
          <FrameRU readonly v-model="book.quantity" placeholder="Quantity" />
          <FrameRU readonly v-model="book.publishedYear" placeholder="Published Year" />
          <FrameRU readonly :modelValue="book.categories.join(', ')" placeholder="Categories">
            <template #text-above>
              <FrameText>
                <template #text>
                  Categories
                </template>
              </FrameText>
            </template>
          </FrameRU>
        </div>
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

.frame-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding: 5vh 0;
}
</style>