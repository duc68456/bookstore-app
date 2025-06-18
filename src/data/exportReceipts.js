// src/data/Invoices.js
import { api } from '@/plugins/axios'
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useExportReceiptFormStore = defineStore('exportForm', () => {
  const receipts = ref([
    // { id: 'X1', time: '09:30 AM', total: '$180.00', customer: 'Customer A' },
    // { id: 'X2', time: '11:45 AM', total: '$250.00', customer: 'Customer B' },
    // { id: 'X3', time: '02:15 PM', total: '$420.00', customer: 'Customer C' }
  ])

  const receiptDetails = reactive({
    // X1: {
    //   id: 'X1',
    //   time: '09:30 AM',
    //   total: '$180.00',
    //   customer: 'Customer A',
    //   books: [
    //     { id: 'B001', title: 'Book A', quantity: 2, export_price: 30 },
    //     { id: 'B003', title: 'Book C', quantity: 4, export_price: 30 }
    //   ]
    // },
    // X2: {
    //   id: 'X2',
    //   time: '11:45 AM',
    //   total: '$250.00',
    //   customer: 'Customer B',
    //   books: []
    // },
    // X3: {
    //   id: 'X3',
    //   time: '02:15 PM',
    //   total: '$420.00',
    //   customer: 'Customer C',
    //   books: []
    // }
  })

  const loading= ref(false)
  const error= ref(null)

  async function fetchReceipts() {
    loading.value = true; error.value = null
    try {
      const { data } = await api.get('/invoices')
      const list = Array.isArray(data.result) ? data.result : []
      receipts.value = list.map(r => ({
        id:    r.invoiceId,
        admin: r.adminId,
        userId: r.userId,
        date:  r.createAt,       // LocalDate như "2025-06-14"
        total: r.totalAmount,       // BigDecimal
      }))
    } catch (e) {
      console.error('[Invoice] fetch failed', e)
      error.value = e
    } finally {
      loading.value = false
    }
  }

  async function fetchReceiptById(id) {
    loading.value = true; error.value = null
    try {
      const { data } = await api.get(`/invoices/${id}`)
      const r = data.result
      console.log("DEBUG invoice by id:", r)
      receiptDetails[id] = {
        id:    r.invoiceId,
        admin: r.adminId,
        userId: r.userId,
        date:  r.createAt,
        total: r.totalAmount,
        paidAmount: r.paidAmount,
        debtAmount: r.debtAmount,
        books: r.bookDetails.map(b => ({
          id:           b.bookId,
          title:        b.name,
          quantity:     b.quantity,
          import_price: b.importPrice
        }))
      }
      return receiptDetails[id]
    } catch (e) {
      console.error('[Invoice] fetchById failed', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  async function addExportReceiptForm({ adminId, userId, paidAmount, bookDetails }) {
    loading.value = true; error.value = null
    try {
      const { data } = await api.post('/invoices', { adminId, userId, paidAmount, bookDetails });
      await fetchReceipts();
      console.log('DEBUG data from API:', data.result)
      return data.result;
    } catch (e) {
      console.error('[Invoice] create failed', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  // const addExportReceiptForm = (newForm) => {
  //   const newId = `X${forms.value.length + 1}`
  //   const form = { ...newForm, id: newId }
  //
  //   forms.value.push(form)
  //
  //   formDetails[newId] = {
  //     ...form,
  //     books: []
  //   }
  // }

  async function updateExportReceiptForm(id, { adminId, userId, paidAmount, bookDetails }) {
    loading.value = true; error.value = null
    try {
      const payload = {adminId, userId, paidAmount, bookDetails };
      console.log('[DEBUG] Payload gửi PUT /invoice:', payload);
      const { data } = await api.put(`/invoices/${id}`,  payload);
      await fetchReceipts();
      console.log('DEBUG data from API:', data.result)
      return data.result;
    } catch (e) {
      console.error('[Invoice] update failed', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  const deleteExportReceiptForm = (form) => {
    if (!form || !form.id) return
    receipts.value = receipts.value.filter(f => f.id !== form.id)
    delete receiptDetails[form.id]
  }

  return {
    receipts,
    receiptDetails,
    loading,
    error,
    fetchReceipts,
    fetchReceiptById,
    addExportReceiptForm,
    updateExportReceiptForm,
    deleteExportReceiptForm
  }
})
