<script setup>
import { ref, computed } from 'vue'
import { useBookStore } from '@/data/bookStore' // Import store

import TitleText from './texts/TitleText.vue'
import SearchFrame from '@/components/admin/frames/SearchFrame.vue'
import BookTable from '@/components/admin/tables/BookTable.vue'
import BookDetail from '@/components/admin/CRUDforms/BookDetail.vue'
import EditBook from '@/components/admin/CRUDforms/EditBook.vue'
import AddBook from '@/components/admin/CRUDforms/AddBook.vue'

import ButtonCRUD from './buttons/ButtonCRUD.vue'
import ButtonText from './texts/ButtonText.vue'

const bookStore = useBookStore()

// Lọc sách theo search query từ store
const searchQuery = ref('')
const filteredBooks = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return bookStore.items.filter(book =>
    book.id.toLowerCase().includes(q) ||
    book.name.toLowerCase().includes(q)
  )
})

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
const updateBook = (updatedBook) => {
  bookStore.updateBook(updatedBook)
}

const addingBook = ref(false)
const handleAddBook = () => {
  addingBook.value = true
}
const closeAddBook = () => {
  addingBook.value = false
}
const addBook = (newBook) => {
  bookStore.addBook(newBook)
  addingBook.value = false
}

const deleteBook = (book) => {
  bookStore.deleteBook(book)
}

const closeEdit = () => {
  editingBook.value = null
}
</script>

<template>
  <div style="overflow-y: auto;">
    <div v-if="addingBook" class="book-detail-full">
      <AddBook @close="closeAddBook" @add-book="addBook" />
    </div>

    <div v-else-if="!selectedBook && !editingBook" class="content">
      <div class="top-bar">
        <div class="left">
          <TitleText><template #text>Book Management</template></TitleText>
        </div>
        <div class="right">
          <SearchFrame v-model="searchQuery" />
        </div>
      </div>

      <BookTable :items="filteredBooks" :fullBookDetails="bookStore.fullBookDetails" @view-book="handleViewBook"
        @edit-book="handleEditBook" @delete-book="deleteBook" />

      <ButtonCRUD @click="handleAddBook">
        <template #btn-text>
          <ButtonText><template #text>ADD BOOK</template></ButtonText>
        </template>
      </ButtonCRUD>
    </div>

    <div v-else-if="selectedBook && !editingBook" class="book-detail-full">
      <BookDetail :book="selectedBook" @close="closeDetail" />
    </div>

    <div v-else-if="editingBook" class="book-detail-full">
      <EditBook :book="editingBook" @close="closeEdit" @update-book="updateBook" />
    </div>
  </div>
</template>


<style scoped>
.content {
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
