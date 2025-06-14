<template>
  <div class="detail-wrapper">
    <CRUDMainForm title="Add Book" @close="$emit('close')">
      <template #title>
        <TitleText><template #text>Add Book</template></TitleText>
      </template>
      <template #content>
        <div class="frame-wrapper">
          <FrameRU v-model="newBook.name" placeholder="Title" />
          <FrameAuthors v-model="newBook.author" placeholder="Authors" />
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

<script setup>
import { useBook } from '@/data/book'
import { useCategoryStore } from '@/data/categories'
import { onMounted, reactive } from 'vue'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
import FrameAuthors from '../frames/FrameAuthors.vue'
import FrameCategories from '../frames/FrameCategories.vue'
import FrameRU from '../frames/FrameRU.vue'
import ButtonText from '../texts/ButtonText.vue'
import TitleText from '../texts/TitleText.vue'
import CRUDMainForm from './CRUDMainForm.vue'

const emit = defineEmits(['close', 'add-book'])
const bookStore = useBook()
const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.fetchCategories()
})

const newBook = reactive({
  name: '',
  author: [],            // mảng tên tác giả
  published_year: '',
  categories: []         // mảng tên category
})

async function handleAdd() {
  try {
    await bookStore.createBook({
      name: newBook.name,
      publishedYear: +newBook.published_year,
      authors: newBook.author,
      categories: newBook.categories
    })
    emit('add-book')    // sẽ được Books.vue nhận
    emit('close')
  } catch (e) {
    console.error('Tạo sách thất bại', e)
  }
}
</script>


<style scoped>
.detail-wrapper {
  width: 100%;
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
