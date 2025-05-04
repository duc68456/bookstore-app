<script setup>
import { ref } from 'vue'
import TitleText from './texts/TitleText.vue'
import SearchFrame from '@/components/admin/frames/SearchFrame.vue'
import BookTable from '@/components/admin/tables/BookTable.vue'
import BookDetail from '@/components/admin/CRUDforms/BookDetail.vue'
import EditBook from '@/components/admin/CRUDforms/EditBook.vue'
import AddBook from '@/components/admin/CRUDforms/AddBook.vue'

import ButtonCRUD from './buttons/ButtonCRUD.vue'
import ButtonText from './texts/ButtonText.vue'

const selectedBook = ref(null)

const handleViewBook = (book) => {
  selectedBook.value = book
}

const closeDetail = () => {
  selectedBook.value = null
}

const editingBook = ref(null)

const handleEditBook = (book) => {
  editingBook.value = book
}

const closeEdit = () => {
  editingBook.value = null
}

const addingBook = ref(false)

const handleAddBook = () => {
  addingBook.value = true
}

const closeAddBook = () => {
  addingBook.value = false
}

</script>

<template>
  <div style="overflow-y: auto;">
    <div v-if="addingBook" class="book-detail-full">
      <AddBook @close="closeAddBook" />
    </div>

    <div v-else-if="!selectedBook && !editingBook" class="content">
      <div class="top-bar">
        <div class="left">
          <TitleText>
            <template #text>
              Book Management
            </template>
          </TitleText>
        </div>
        <div class="right">
          <SearchFrame />
        </div>
      </div>

      <BookTable @view-book="handleViewBook"  @edit-book="handleEditBook" />
      <ButtonCRUD @click="handleAddBook">
        <template #btn-text>
          <ButtonText>
            <template #text>
              ADD BOOK
            </template>
          </ButtonText>
        </template>
      </ButtonCRUD>
    </div>

    <div v-else-if="selectedBook && !editingBook" class="book-detail-full">
      <BookDetail :book="selectedBook" @close="closeDetail" />
    </div>

    <div v-else-if="editingBook" class="book-detail-full">
      <EditBook :book="editingBook" @close="closeEdit" />
    </div>
    
  </div>
</template>

<style scoped>
.content, .handleViewBook {
  width: 100%;
  height: 100%;
  padding: 20px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.left {
  display: flex;
  align-items: center;
}

.right {
  flex-shrink: 0;
  align-items: center;
}
</style>