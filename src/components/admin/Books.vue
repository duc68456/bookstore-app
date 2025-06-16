<script setup>
import { useBook } from '@/data/book'
import { computed, onMounted, ref } from 'vue'
import ButtonCRUD from '@/components/admin/buttons/ButtonCRUD.vue'
import AddBook from '@/components/admin/CRUDforms/AddBook.vue'
import BookDetail from '@/components/admin/CRUDforms/BookDetail.vue'
import EditBook from '@/components/admin/CRUDforms/EditBook.vue'
import SearchFrame from '@/components/admin/frames/SearchFrame.vue'
import BookTable from '@/components/admin/tables/BookTable.vue'
import ButtonText from '@/components/admin/texts/ButtonText.vue'
import TitleText from '@/components/admin/texts/TitleText.vue'

const bookStore = useBook()
const searchQuery = ref('')
const addingBook = ref(false)
const selectedBook = ref(null)
const editingBook = ref(null)

onMounted(() => {
  bookStore.fetchBooks()
})

const filteredBooks = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return bookStore.items.filter(item =>
    item.id.toLowerCase().includes(q) ||
    item.title.toLowerCase().includes(q)
  )
})

function handleAddBook() {
  addingBook.value = true
}
function closeAddBook() {
  addingBook.value = false
}
async function addBook(newBook) {
  try {
    await bookStore.createBook(newBook)
  } catch (e) {
    console.error('Tạo sách thất bại', e)
  } finally {
    addingBook.value = false
  }
}

async function handleViewBook(bookId) {
  console.log('[ViewBook] bookId:', bookId)
  try {
    const book = await bookStore.fetchBookById(bookId)
    selectedBook.value = book
  } catch (e) {
    console.error('Không tải được chi tiết sách', e)
  }
}
function closeDetail() {
  selectedBook.value = null
}

async function handleEditBook(bookId) {
  try {
    const book = await bookStore.fetchBookById(bookId)
    editingBook.value = book
  } catch (e) {
    console.error('Không tải được sách để edit', e)
  }
}
async function updateBook(bookData) {
  try {
    await bookStore.editBook(bookData.bookId, {
      name: bookData.name,
      publishedYear: bookData.publishedYear,
      importPrice: bookData.importPrice,
      quantity: bookData.quantity,
      authors: bookData.authors,
      categories: bookData.categories
    })
  } catch (e) {
    console.error('Cập nhật sách thất bại', e)
  } finally {
    editingBook.value = null
  }
}

async function deleteBook(bookId) {
  try {
    await bookStore.deleteBook(bookId)
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
    <AddBook v-if="addingBook" @close="closeAddBook" @add-book="addBook" class="book-detail-full" />

    <div v-else-if="!selectedBook && !editingBook" class="content">
      <div class="top-bar">
        <TitleText class="left">
          <template #text>Book Management</template>
        </TitleText>
        <SearchFrame v-model="searchQuery" class="right" />
      </div>

      <BookTable :items="filteredBooks" :fullBookDetails="bookStore.fullBookDetails" @view-book="handleViewBook"
        @edit-book="handleEditBook" @delete-book="deleteBook" />

      <ButtonCRUD @click="handleAddBook">
        <template #btn-text>
          <ButtonText><template #text>ADD BOOK</template></ButtonText>
        </template>
      </ButtonCRUD>
    </div>

    <BookDetail v-else-if="selectedBook && !editingBook" :book="selectedBook" @close="closeDetail"
      class="book-detail-full" />

    <EditBook v-else-if="editingBook" :book="editingBook" @close="closeEdit" @update-book="updateBook"
      class="book-detail-full" />
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

.left {
  flex: 1
}

.right {
  flex-shrink: 0
}

.book-detail-full {
  width: 100%;
  height: 100%;
}
</style>