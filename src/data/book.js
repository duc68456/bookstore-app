// stores/bookStore.js
import { api } from '@/plugins/axios'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

// Pinia store để quản lý sách: list hiển thị và fullBookDetails để lookup detail
export const useBook = defineStore('book', () => {
  const items = ref([])
  const fullBookDetails = reactive({})
  const loading = ref(false)
  const error = ref(null)

  /**
   * fetchBooks: Gọi API GET /bookstore/books và populate items, fullBookDetails
   */
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

      // Tạo mảng mapped chứa đúng dữ liệu mà table cần
      const mapped = list.map(b => ({
        id: String(b.bookId),
        title: b.name,
        categories: b.categories || [],
        quantity: b.quantity,
        import_price: b.importPrice,
        // giữ nguyên object gốc nếu cần detail
        _raw: b
      }))

      // Gán vào items
      items.value = mapped

      // Ghi chi tiết theo id từ mapped
      mapped.forEach(book => {
        fullBookDetails[book.id] = book
      })
    } catch (e) {
      console.error('[BookStore] fetchBooks failed:',
        e.response?.status,
        e.response?.data || e.message
      )
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    fullBookDetails,
    loading,
    error,
    fetchBooks
  }
})
