// stores/bookStore.js
import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'

export const useBook = defineStore('book', () => {
  const items = ref([
  {
    id: '1',
    title: 'Hibernate Core -11th1',
    type: 'Educational',
    import_price: '100000',
    author: 'Hibernate',
    quantity: '100',
    published_year: '2025',
  },
  {
    id: '2',
    title: 'Hibernate Core -11th2',
    type: 'Educational',
    import_price: '1000000',
    author: 'Hibernate',
    quantity: '100',
    published_year: '2025',
  },
  {
    id: '3',
    title: 'Hibernate Core -11th3',
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
    title: 'Hibernate Core -11th1',
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
    title: 'Hibernate Core -11th2',
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
    title: 'Hibernate Core -11th3',
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
      book.title.toLowerCase().includes(q)
    )
  })

  const addBook = (newBook) => {
    const newId = String(items.value.length + 1)
    const newBookWithId = { ...newBook, id: newId }
    newBookWithId.categories = Array.isArray(newBook.categories)
      ? newBook.categories
      : newBook.categories.split(', ').map(c => c.trim())

    items.value.push(newBookWithId)
    fullBookDetails[newId] = {
      ...newBookWithId,
      description: 'No description provided',
      publisher: 'Unknown'
    }
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

  const deleteBook = (book) => {
items.value = items.value.filter(b => b.id !== book.id)
delete fullBookDetails[book.id]

  }

  return {
    items,
    fullBookDetails,
    searchQuery,
    filteredBooks,
    addBook,
    updateBook,
    deleteBook
  }
})
