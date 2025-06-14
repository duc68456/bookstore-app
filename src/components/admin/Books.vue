<script setup>
import { useBook } from '@/data/book'
import { computed, onMounted, ref } from 'vue'

import AddBook from '@/components/admin/CRUDforms/AddBook.vue'
import BookDetail from '@/components/admin/CRUDforms/BookDetail.vue'
import EditBook from '@/components/admin/CRUDforms/EditBook.vue'
import SearchFrame from '@/components/admin/frames/SearchFrame.vue'
import BookTable from '@/components/admin/tables/BookTable.vue'
import ButtonCRUD from './buttons/ButtonCRUD.vue'
import ButtonText from './texts/ButtonText.vue'
import TitleText from './texts/TitleText.vue'

const bookStore = useBook()

// --- State chung ---
const searchQuery  = ref('')
const filteredBooks = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return bookStore.items.filter(item =>
    item.id.toLowerCase().includes(q) ||
    item.title.toLowerCase().includes(q)
  )
})

const addingBook   = ref(false)
const selectedBook = ref(null)   // sẽ là object book mapping
const editingBook  = ref(null)   // sẽ là object book mapping

// --- Khởi động: fetch toàn bộ sách ---
onMounted(() => {
  bookStore.fetchBooks()
})

// --- Handlers ---
function handleAddBook() {
  addingBook.value = true
}
function closeAddBook() {
  addingBook.value = false
}
// newBook là object đúng shape của API BookCreationRequest
async function addBook(newBook) {
  try {
    await bookStore.createBook(newBook)
    await bookStore.fetchBooks()
  } catch (e) {
    console.error('Tạo sách thất bại', e)
  } finally {
    addingBook.value = false
  }
}

async function handleViewBook(bookId) {
  try {

    const detail = await bookStore.fetchBookById(bookId)
    selectedBook.value = detail
  } catch (e) {
    console.error('Không tải được chi tiết sách', e)
  }
}
function closeDetail() {
  selectedBook.value = null
}

async function handleEditBook(bookId) {
  try {
    editingBook.value = await bookStore.fetchBookById(bookId)
  } catch (e) {
    console.error('Không tải được sách để edit', e)
  }
}
async function updateBook(updated) {
  try {
    await bookStore.updateBook(updated)
    await bookStore.fetchBooks()
  } catch (e) {
    console.error('Cập nhật sách thất bại', e)
  } finally {
    editingBook.value = null
  }
}

async function deleteBook(bookId) {
  try {
    await bookStore.deleteBook(bookId)
    await bookStore.fetchBooks()
  } catch (e) {
    console.error('Xoá sách thất bại', e)
  }
}

function closeEdit() {
  editingBook.value = null
}
</script>

<template>
  <div style="height:100%; overflow-y:auto;">
    <!-- ADD FORM -->
    <AddBook
      v-if="addingBook"
      @close="closeAddBook"
      @add-book="addBook"
      class="book-detail-full"
    />

    <!-- MAIN TABLE -->
    <div v-else-if="!selectedBook && !editingBook" class="content">
      <div class="top-bar">
        <TitleText class="left">
          <template #text>Book Management</template>
        </TitleText>
        <SearchFrame v-model="searchQuery" class="right" />
      </div>

      <BookTable
        :items="filteredBooks"
        :fullBookDetails="bookStore.fullBookDetails"
        @view-book="handleViewBook"
        @edit-book="handleEditBook"
        @delete-book="deleteBook"
      />

      <ButtonCRUD @click="handleAddBook">
        <template #btn-text>
          <ButtonText><template #text>ADD BOOK</template></ButtonText>
        </template>
      </ButtonCRUD>
    </div>

    <!-- DETAIL VIEW -->
    <BookDetail
      v-else-if="selectedBook && !editingBook"
      :book="selectedBook"
      @close="closeDetail"
      class="book-detail-full"
    />

    <!-- EDIT FORM -->
    <EditBook
      v-else-if="editingBook"
      :book="editingBook"
      @close="closeEdit"
      @update-book="updateBook"
      class="book-detail-full"
    />
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  padding: 20px;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.left { flex: 1 }
.right { flex-shrink: 0 }
.book-detail-full {
  width: 100%;
  height: 100%;
}
</style>
