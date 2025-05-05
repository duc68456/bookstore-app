<script setup>
import { reactive } from 'vue'
import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import FrameRU from '../frames/FrameRU.vue'
import FrameText from '../texts/FrameText.vue'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
import ButtonText from '../texts/ButtonText.vue'

const props = defineProps(['book'])
const emit = defineEmits(['close', 'update-book'])

// Tạo bản sao reactive từ props và chuyển categories thành chuỗi (nếu là mảng)
const editedBook = reactive({
  ...props.book,
  categories: Array.isArray(props.book.categories)
    ? props.book.categories.join(', ')
    : props.book.categories || ''
})

const handleEdit = () => {
  // Convert categories lại thành mảng
  const bookToUpdate = {
    ...editedBook,
    categories: editedBook.categories.split(',').map(c => c.trim())
  }

  console.log('Edited book:', bookToUpdate)
  emit('update-book', bookToUpdate)
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
          <FrameRU v-model="editedBook.name">
            <template #text-above>
              <FrameText><template #text>Name</template></FrameText>
            </template>
          </FrameRU>

          <FrameRU v-model="editedBook.author">
            <template #text-above>
              <FrameText><template #text>Author</template></FrameText>
            </template>
          </FrameRU>

          <FrameRU v-model="editedBook.selling_price">
            <template #text-above>
              <FrameText><template #text>Selling Price</template></FrameText>
            </template>
          </FrameRU>

          <FrameRU v-model="editedBook.quantity">
            <template #text-above>
              <FrameText><template #text>Quantity</template></FrameText>
            </template>
          </FrameRU>

          <FrameRU v-model="editedBook.published_year">
            <template #text-above>
              <FrameText><template #text>Published Year</template></FrameText>
            </template>
          </FrameRU>

          <FrameRU v-model="editedBook.categories">
            <template #text-above>
              <FrameText><template #text>Categories</template></FrameText>
            </template>
          </FrameRU>

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
