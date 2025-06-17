// ✅ book.js (Pinia Store)
import { api } from '@/plugins/axios'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useBook = defineStore('book', () => {
  const items = ref([])
  const fullBookDetails = reactive({})
  const loading = ref(false)
  const error = ref(null)

  async function fetchBooks() {
    loading.value = true; error.value = null
    try {
      const { data } = await api.get('/books')
      const list = Array.isArray(data.result) ? data.result : []
      items.value = list.map(b => ({
        bookId: b.bookId,
        id:     String(b.bookId),
        title:  b.name,
        authors: b.authors?.map(a => a.authorName) || [],
        categories: b.categories?.map(c => c.categoryName) || [],
        quantity: b.quantity,
        import_price: b.importPrice,
        publishedYear: b.publishedYear,
        _raw: b
      }))
      items.value.forEach(b => { fullBookDetails[b.id] = b })
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  async function fetchBookById(id) {
  loading.value = true
  try {
    const { data } = await api.get(`/books/dto/${id}`)
    const b = data.result
    if (!b) throw new Error('Book not found')

    return {
      bookId: b.bookId,
      id: String(b.bookId),
      name: b.name,
      authors: b.authors.map(a => a.authorName),           // ✅ fix ở đây
      categories: b.categories.map(c => c.categoryName),   // ✅ fix ở đây
      quantity: b.quantity,
      importPrice: b.importPrice,
      publishedYear: b.publishedYear,
    }
  } catch (e) {
    error.value = e
    throw e
  } finally {
    loading.value = false
  }
}



  async function createBook(payload) {
    loading.value = true; error.value = null
    try {
      await api.post('/books', payload)
      await fetchBooks()
    } catch (e) {
      error.value = e
      throw e
    } finally {
      loading.value = false
    }
  }

  async function editBook(bookId, payload) {
    loading.value = true; error.value = null
    try {
      await api.put(`/books/edit/${bookId}`, payload)
      await fetchBooks()
    } catch (e) {
      error.value = e
      throw e
    } finally {
      loading.value = false
    }
  }

  async function deleteBook(bookId) {
    loading.value = true; error.value = null
    try {
      await api.delete(`/books/${bookId}`)
      await fetchBooks()
    } catch (e) {
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
    fetchBookById,
    createBook,
    editBook,
    deleteBook
  }
})
