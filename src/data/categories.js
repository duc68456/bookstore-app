import { api } from '@/plugins/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])
  const loading    = ref(false)
  const error      = ref(null)

  /** Fetch từ GET /categories, format { code, result: [ { id, categoryName } ] } */
  async function fetchCategories() {
    loading.value = true
    error.value   = null
    try {
      const { data } = await api.get('/categories')
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.result)
          ? data.result
          : []
      categories.value = list
    } catch (e) {
      console.error('[CategoryStore] fetch failed', e)
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return { categories, loading, error, fetchCategories }
})
