<script setup>
import { reactive } from 'vue'
import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import FrameRU from '../frames/FrameRU.vue'
import FrameText from '../texts/FrameText.vue'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
import ButtonText from '../texts/ButtonText.vue'
import FrameCategories from '../frames/FrameCategories.vue'  

const emit = defineEmits(['close', 'add-book'])

const newBook = reactive({
  name: '',
  author: '',
  import_price: '0',
  quantity: '0',
  published_year: '',
  categories: [] 
})

const handleAdd = () => {
  emit('add-book', { ...newBook })  
  emit('close')
}
</script>

<template>
  <div class="detail-wrapper">
    <CRUDMainForm title="Add Book" :data="newBook" @close="$emit('close')">
      <template #title>
        <TitleText>
          <template #text>
            Add Book
          </template>
        </TitleText>
      </template>
      <template #content>
        <div class="frame-wrapper">
          <FrameRU v-model="newBook.title" placeholder="Title"/>
          <FrameRU v-model="newBook.author" placeholder="Author" />
          <FrameRU v-model="newBook.published_year" placeholder="Published Year" />

          <FrameCategories v-model="newBook.categories" placeholder="Categories" />

          <ButtonCRUD @click="handleAdd">
            <template #btn-text>
              <ButtonText>
                <template #text>ADD</template>
              </ButtonText>
            </template>
          </ButtonCRUD>
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
