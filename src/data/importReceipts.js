// src/data/importReceipts.js
import { api } from '@/plugins/axios'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useImportReceiptFormStore = defineStore('importReceipts', () => {
  const receipts       = ref([])
  const receiptDetails = reactive({})
  const loading        = ref(false)
  const error          = ref(null)

  // 1) Lấy list tất cả import receipts
  async function fetchReceipts() {
    loading.value = true; error.value = null
    try {
      const { data } = await api.get('/import')
      const list = Array.isArray(data.result) ? data.result : []
      receipts.value = list.map(r => ({
        id:    r.importReceiptId,
        admin: r.adminId,
        date:  r.importDate,       // LocalDate như "2025-06-14"
        total: r.totalAmount       // BigDecimal
      }))
    } catch (e) {
      console.error('[ImportReceipt] fetch failed', e)
      error.value = e
    } finally {
      loading.value = false
    }
  }

  // 2) Lấy chi tiết một import receipt
  async function fetchReceiptById(id) {
    loading.value = true; error.value = null
    try {
      const { data } = await api.get(`/import/${id}`)
      const r = data.result
      console.log("DEBUG import receipt by id:", r)
      receiptDetails[id] = {
        id:    r.importReceiptId,
        admin: r.adminId,
        date:  r.importDate,
        total: r.totalAmount,
        books: r.bookDetails.map(b => ({
          id:           b.bookId,
          title:        b.name,
          quantity:     b.quantity,
          import_price: b.importPrice
        }))
      }
      return receiptDetails[id]
    } catch (e) {
      console.error('[ImportReceipt] fetchById failed', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  // 3) Tạo mới
  async function createReceipt({ adminId, bookDetails }) {
    loading.value = true; error.value = null
    try {
      const { data } = await api.post('/import', { adminId, bookDetails });
      await fetchReceipts();
      return data.result;
    } catch (e) {
      console.error('[ImportReceipt] create failed', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  // 4) Cập nhật
  async function updateReceipt(id, { adminId, bookDetails }) {
    loading.value = true; error.value = null
    try {
      const payload = {adminId, bookDetails };
      console.log('[DEBUG] Payload gửi PUT /import:', payload);
      const { data } = await api.put(`/import/${id}`,  payload);
      await fetchReceipts();
      return data.result;
    } catch (e) {
      console.error('[ImportReceipt] update failed', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  // 5) Xóa
  async function deleteReceipt(id) {
    loading.value = true; error.value = null
    try {
      await api.delete(`/import/${id}`)
      await fetchReceipts()
    } catch (e) {
      console.error('[ImportReceipt] delete failed', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    receipts,
    receiptDetails,
    loading,
    error,
    fetchReceipts,
    fetchReceiptById,
    createReceipt,
    updateReceipt,
    deleteReceipt
  }
})
