// src/data/categories.js
import { api } from '@/plugins/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])
  const loading    = ref(false)
  const error      = ref(null)

  /** GET /categories */
  async function fetchCategories() {
    loading.value = true
    error.value   = null
    try {
      const { data } = await api.get('/categories')
      const list = Array.isArray(data.result) ? data.result : []
      categories.value = list
    } catch (e) {
      console.error('[CategoryStore] fetch failed', e)
      error.value = e
    } finally {
      loading.value = false
    }
  }

  /** POST /categories */
  async function createCategory(categoryName) {
    loading.value = true
    error.value   = null
    try {
      const { data } = await api.post('/categories', { categoryName })
      // data.result là CategoryResponse { id, categoryName, … }
      const created = data.result
      // cập nhật danh sách để dropdown lên ngay
      categories.value.push(created)
      return created
    } catch (e) {
      console.error('[CategoryStore] create failed', e)
      error.value = e
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory    // expose hàm tạo mới
  }
})
