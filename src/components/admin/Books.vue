<script setup>
import { ref, reactive, computed } from 'vue'
import TitleText from './texts/TitleText.vue'
import SearchFrame from '@/components/admin/frames/SearchFrame.vue'
import BookTable from '@/components/admin/tables/BookTable.vue'
import BookDetail from '@/components/admin/CRUDforms/BookDetail.vue'
import EditBook from '@/components/admin/CRUDforms/EditBook.vue'
import AddBook from '@/components/admin/CRUDforms/AddBook.vue'

import ButtonCRUD from './buttons/ButtonCRUD.vue'
import ButtonText from './texts/ButtonText.vue'


const items = ref([
  {
    id: '1',
    name: 'Hibernate Core -11th',
    type: 'Educational',
    import_price: '100000',
    author: 'Hibernate',
    quantity: '100',
    published_year: '2025',
  },
  {
    id: '2',
    name: 'Hibernate Core -11th',
    type: 'Educational',
    import_price: '1000000',
    author: 'Hibernate',
    quantity: '100',
    published_year: '2025',
  },
  {
    id: '3',
    name: 'Hibernate Core -11th',
    type: 'Educational',
    import_price: '10000000',
    author: 'Hibernate',
    quantity: '100',
    published_year: '2025',
  },
])

const fullBookDetails = reactive({
  '1': {
    id: '1',
    name: 'Hibernate Core -11th',
    type: 'Educational',
    import_price: '100000',
    author: 'Hibernate',
    quantity: '100',
    published_year: '2025',
    categories: ['Java'],
    description: 'A comprehensive guide to Hibernate for 11th edition',
    publisher: 'TechPress'
  },
  '2': {
    id: '2',
    name: 'Hibernate Core -11th',
    type: 'Educational',
    import_price: '1000000',
    author: 'Hibernate',
    quantity: '100',
    published_year: '2025',
    categories: ['Java', 'ORM'],
    description: 'A comprehensive guide to Hibernate for 11th edition',
    publisher: 'TechPress'
  },
  '3': {
    id: '3',
    name: 'Hibernate Core -11th',
    type: 'Educational',
    import_price: '10000000',
    author: 'Hibernate',
    quantity: '100',
    published_year: '2025',
    categories: ['Java', 'ORM', 'Backend'],
    description: 'A comprehensive guide to Hibernate for 11th edition',
    publisher: 'TechPress'
  },
})
const searchQuery = ref('')
const filteredBooks = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return items.value.filter(book =>
    book.id.toLowerCase().includes(q) ||
    book.name.toLowerCase().includes(q)
  )
})

// View
const selectedBook = ref(null)
const handleViewBook = (book) => {
  selectedBook.value = book
}
const closeDetail = () => {
  selectedBook.value = null
}

// Edit
const editingBook = ref(null)
const handleEditBook = (book) => {
  editingBook.value = book
}
const updateBook = (updatedBook) => {
  const index = items.value.findIndex(b => b.id === updatedBook.id)
  if (index !== -1) {
    items.value[index] = { ...updatedBook }
  }
  if (fullBookDetails[updatedBook.id]) {
    fullBookDetails[updatedBook.id] = { ...updatedBook }
  }
}

const addingBook = ref(false)
const handleAddBook = () => {
  addingBook.value = true
}
const closeAddBook = () => {
  addingBook.value = false
}
const addBook = (newBook) => {
  const newId = String(items.value.length + 1)
  const newBookWithId = { ...newBook, id: newId }

  // Ensure categories is always an array
  newBookWithId.categories = Array.isArray(newBook.categories) ? newBook.categories : newBook.categories.split(',').map(c => c.trim());

  items.value.push(newBookWithId)
  fullBookDetails[newId] = {
    ...newBookWithId,
    categories: newBookWithId.categories, // Store the categories as an array
    description: 'No description provided',
    publisher: 'Unknown'
  }
  addingBook.value = false
}


// Delete
const deleteBook = (book) => {
  items.value = items.value.filter(b => b.id !== book.id)
  delete fullBookDetails[book.id]
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

      <BookTable :items="filteredBooks" :fullBookDetails="fullBookDetails" @view-book="handleViewBook"
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

  <v-dialog v-model="cancelEditDialog" width="400" class="delete-dialog" persistent scroll-strategy="block">
    <v-card>
      <v-card-title class="text-h6">Confirm Cancel</v-card-title>
      <v-card-text>
        Are you sure you want to cancel editing the book
        <strong>{{ editingBook?.name }}</strong>?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="grey" variant="text" @click="cancelCancelEdit">Cancel</v-btn>
        <v-btn color="var(--vt-c-second-bg-color)" variant="tonal" @click="confirmCancelEdit">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

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
