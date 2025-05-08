<script setup>
import { ref } from 'vue'
import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import FrameRU from '../frames/FrameRU.vue'
import FrameText from '../texts/FrameText.vue'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
import ButtonText from '../texts/ButtonText.vue'
import { categoriesList } from '@/data/categories.js'

const emit = defineEmits(['close', 'add-category'])

const newCategory = ref('')
const error = ref(false)

// Hàm thêm thể loại mới
const handleAddCategory = () => {
  const categoryName = newCategory.value.trim()

  if (categoryName && !categoriesList.includes(categoryName)) {
    categoriesList.push(categoryName)
    emit('add-category', categoryName)
    emit('close')
    newCategory.value = ''
    error.value = false
  } else {
    error.value = true // báo lỗi khi trùng hoặc rỗng
  }
}

// Đóng popup
const handleClose = () => {
  emit('close')
}
</script>

<template>
  <div class="detail-wrapper">
    <CRUDMainForm title="Add Category" :data="newCategory" @close="handleClose">
      <template #title>
        <TitleText><template #text>Add New Category</template></TitleText>
      </template>

      <template #content>
        <div class="frame-wrapper">
          <FrameRU v-model="newCategory">
            <template #text-above>
              <FrameText><template #text>Category Name</template></FrameText>
            </template>
          </FrameRU>

          <span v-if="error" class="error-text">This category already exists or is invalid.</span>

          <ButtonCRUD @click="handleAddCategory">
            <template #btn-text>
              <ButtonText><template #text>ADD</template></ButtonText>
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

.error-text {
  color: crimson;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: -6px;
}
</style>
