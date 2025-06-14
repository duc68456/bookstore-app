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
      const list = Array.isArray(resp.data)
        ? resp.data
        : Array.isArray(resp.data.result)
          ? resp.data.result
          : []

      const mapped = list.map(b => ({
        id: String(b.bookId),
        title: b.name,
        categories: b.categories || [],
        quantity: b.quantity,
        import_price: b.importPrice,
        _raw: b
      }))

      items.value = mapped
      mapped.forEach(book => {
        fullBookDetails[book.id] = book
      })
    } catch (e) {
      console.error('[BookStore] fetchBooks failed:', e.response?.status, e.response?.data || e.message)
      error.value = e
    } finally {
      loading.value = false
    }
  }

  async function createBook(payload) {
    loading.value = true
    error.value = null
    try {
      // Gọi POST /books
      const { data } = await api.post('/books', payload)
      const created = data.result ?? data
      // Sau khi tạo xong, bạn có thể re-fetch hoặc append trực tiếp
      await fetchBooks()
      return created
    } catch (e) {
      console.error('[BookStore] createBook failed:', e)
      error.value = e
      throw e
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
    createBook    // ← expose hàm này
  }
})
