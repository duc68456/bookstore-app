<script setup>
import { reactive } from 'vue'
import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import FrameRU from '../frames/FrameRU.vue'
import FrameText from '../texts/FrameText.vue'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
import ButtonText from '../texts/ButtonText.vue'
import FrameCategories from '../frames/FrameCategories.vue'  // Import FrameCategories

const emit = defineEmits(['close', 'add-book'])

const newBook = reactive({
  name: '',
  author: '',
  selling_price: '',
  quantity: '',
  published_year: '',
  categories: []  // Set categories as an array to store selected options
})

const handleAdd = () => {
  emit('add-book', { ...newBook })  // Pass categories as an array
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
          <FrameRU v-model="newBook.name">
            <template #text-above>
              <FrameText><template #text>Name</template></FrameText>
            </template>
          </FrameRU>

          <FrameRU v-model="newBook.author">
            <template #text-above>
              <FrameText><template #text>Author</template></FrameText>
            </template>
          </FrameRU>

          <FrameRU v-model="newBook.import_price">
            <template #text-above>
              <FrameText><template #text>Import Price</template></FrameText>
            </template>
          </FrameRU>

          <FrameRU v-model="newBook.quantity">
            <template #text-above>
              <FrameText><template #text>Quantity</template></FrameText>
            </template>
          </FrameRU>

          <FrameRU v-model="newBook.published_year">
            <template #text-above>
              <FrameText><template #text>Published Year</template></FrameText>
            </template>
          </FrameRU>

          <!-- Categories Section -->
          <FrameCategories v-model="newBook.categories">
            <template #text-above>
              <FrameText><template #text>Categories</template></FrameText>
            </template>
          </FrameCategories>

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
