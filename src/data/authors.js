import { api } from '@/plugins/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthorStore = defineStore('author', () => {
  const authors = ref([])     // <— mảng string
  const loading = ref(false)
  const error   = ref(null)

  /**
   * GET /authors trả về { code, result: [ { id, authorName, … } ] }
   * Chúng ta chỉ map về mảng các chuỗi authorName
   */
  async function fetchAuthors() {
    loading.value = true
    error.value   = null
    try {
      const { data } = await api.get('/authors')
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.result)
          ? data.result
          : []

      // Chỉ lấy authorName
      authors.value = list.map(a => a.authorName)
    } catch (e) {
      console.error('[AuthorStore] fetch failed:', e)
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return { authors, loading, error, fetchAuthors }
})
