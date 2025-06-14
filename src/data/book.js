// stores/bookStore.js
import { api } from '@/plugins/axios'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useBook = defineStore('book', () => {
  const items = ref([])
  const fullBookDetails = reactive({})
  const loading = ref(false)
  const error = ref(null)

  async function fetchBooks() {
    loading.value = true
    error.value = null
    try {
      const resp = await api.get('/books')
      const list = Array.isArray(resp.data.result)
        ? resp.data.result
        : []

      const mapped = list.map(b => ({
        id: String(b.bookId),
        title: b.name,
        // map categories về array of string
        categories: Array.isArray(b.categories)
          ? b.categories.map(c => c.categoryName)
          : [],
        quantity: b.quantity,
        import_price: b.importPrice,
        _raw: b
      }))

      items.value = mapped
      mapped.forEach(book => {
        fullBookDetails[book.id] = book
      })
    } catch (e) {
      console.error('[BookStore] fetchBooks failed:', e)
      error.value = e
    } finally {
      loading.value = false
    }
  }

  async function createBook(payload) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.post('/books', payload)
      await fetchBooks()
      return data.result ?? data
    } catch (e) {
      console.error('[BookStore] createBook failed:', e)
      error.value = e
      throw e
    } finally {
      loading.value = false
    }
  }

  async function fetchBookById(id) {
    loading.value = true
    try {
      const { data } = await api.get(`/books/${id}`)
      const b = data.result

      // map về chuỗi
      b.authors = Array.isArray(b.authors)
        ? b.authors.map(a => a.authorName)
        : []
      b.categories = Array.isArray(b.categories)
        ? b.categories.map(c => c.categoryName)
        : []

      fullBookDetails[String(b.bookId)] = b
      return b
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    fullBookDetails,
    loading,
    error,
    fetchBooks,
    createBook,
    fetchBookById
  }
})
