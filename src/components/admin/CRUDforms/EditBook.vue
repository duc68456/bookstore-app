<script setup>
import { reactive } from 'vue'
import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import FrameRU from '../frames/FrameRU.vue'
import FrameCategories from '../frames/FrameCategories.vue'
import FrameText from '../texts/FrameText.vue'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
import ButtonText from '../texts/ButtonText.vue'
import { categoriesList } from '@/data/categories.js' // import danh sách thể loại

const props = defineProps(['book'])
const emit = defineEmits(['close', 'update-book'])

// Đảm bảo categories là mảng
const editedBook = reactive({
  ...props.book,
  categories: Array.isArray(props.book.categories) ? props.book.categories : []
})

const handleEdit = () => {
  console.log('Edited book:', editedBook)
  emit('update-book', { ...editedBook })
  emit('close')
}
</script>

<template>
  <div class="detail-wrapper">
    <CRUDMainForm title="Edit Book" :data="editedBook" @close="$emit('close')">
      <template #title>
        <TitleText>
          <template #text>Edit Book</template>
        </TitleText>
      </template>

      <template #content>
        <div class="frame-wrapper">
          <FrameRU v-model="editedBook.title">
            <template #text-above>
              <FrameText><template #text>Title</template></FrameText>
            </template>
          </FrameRU>

          <FrameRU v-model="editedBook.author">
            <template #text-above>
              <FrameText><template #text>Author</template></FrameText>
            </template>
          </FrameRU>
          
          <FrameRU v-model="editedBook.quantity">
            <template #text-above>
              <FrameText><template #text>Quantity</template></FrameText>
            </template>
          </FrameRU>
          
          <FrameRU v-model="editedBook.import_price">
            <template #text-above>
              <FrameText><template #text>Import Price</template></FrameText>
            </template>
          </FrameRU>

          <FrameRU v-model="editedBook.published_year">
            <template #text-above>
              <FrameText><template #text>Published Year</template></FrameText>
            </template>
          </FrameRU>

          <!-- Categories Section -->
          <FrameCategories v-model="editedBook.categories">
            <template #text-above>
              <FrameText><template #text>Categories</template></FrameText>
            </template>
          </FrameCategories>

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