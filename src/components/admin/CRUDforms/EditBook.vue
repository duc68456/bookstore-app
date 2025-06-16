<script setup>
import { reactive } from 'vue'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
import FrameAuthors from '../frames/FrameAuthors.vue'
import FrameCategories from '../frames/FrameCategories.vue'
import FrameRU from '../frames/FrameRU.vue'
import ButtonText from '../texts/ButtonText.vue'
import TitleText from '../texts/TitleText.vue'
import CRUDMainForm from './CRUDMainForm.vue'

const props = defineProps({
  book: Object
})
const emit = defineEmits(['close','update-book'])

const editedBook = reactive({
  bookId: props.book.bookId,
  name: props.book.name,
  publishedYear: props.book.publishedYear,
  importPrice: props.book.importPrice,
  quantity: props.book.quantity,
  authors: Array.isArray(props.book.authors) ? [...props.book.authors] : [],
  categories: Array.isArray(props.book.categories) ? [...props.book.categories] : []
})

function handleEdit() {
  emit('update-book', editedBook)
  emit('close')
}
</script>

<template>
  <div class="detail-wrapper">
    <CRUDMainForm title="Edit Book" :data="editedBook" @close="emit('close')">
      <template #title>
        <TitleText>Edit Book</TitleText>
      </template>
      <template #content>
        <div class="frame-wrapper">
          <FrameRU v-model="editedBook.name" placeholder="Title" />
          <FrameAuthors v-model="editedBook.authors" placeholder="Authors" />
          <FrameRU v-model="editedBook.importPrice" placeholder="Import Price" />
          <FrameRU v-model="editedBook.publishedYear" placeholder="Published Year" />
          <FrameCategories v-model="editedBook.categories" placeholder="Categories" />
          <ButtonCRUD @click="handleEdit">
            <template #btn-text>
              <ButtonText><template #text>EDIT</template></ButtonText>
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
