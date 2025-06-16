// src/data/authors.js
import { api } from '@/plugins/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthorStore = defineStore('author', () => {
  const authors = ref([])     // mảng các chuỗi tên tác giả
  const loading = ref(false)
  const error   = ref(null)

  // GET /authors
  async function fetchAuthors() {
    loading.value = true
    error.value   = null
    try {
      const { data } = await api.get('/authors')
      // data là ApiResponse<List<AuthorResponse>>
      const list = Array.isArray(data.result) ? data.result : []
      // map về mảng chuỗi tên
      authors.value = list.map(a => a.authorName)
    } catch (e) {
      console.error('[AuthorStore] fetch failed:', e)
      error.value = e
    } finally {
      loading.value = false
    }
  }

  // POST /authors { authorName }
  async function createAuthor(authorName) {
    loading.value = true
    error.value   = null
    try {
      const { data } = await api.post('/authors', { authorName })
      // data.result là AuthorResponse
      const newAuthor = data.result
      // đưa tên mới vào mảng để dropdown cập nhật
      authors.value.push(newAuthor.authorName)
      return newAuthor
    } catch (e) {
      console.error('[AuthorStore] create failed:', e)
      error.value = e
      throw e           // để component bắt được
    } finally {
      loading.value = false
    }
  }

  return {
    authors,
    loading,
    error,
    fetchAuthors,
    createAuthor    // ← nhớ expose hàm này
  }
})
