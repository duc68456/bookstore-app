import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useImportReceiptFormStore = defineStore('importForm', () => {
  const forms = ref([
    { id: 'E1', time: '09:00 AM', total: '$150.00' },
    { id: 'E2', time: '10:15 AM', total: '$200.00' },
    { id: 'E3', time: '11:30 AM', total: '$320.00' }
  ])

  const formDetails = reactive({
    E1: {
      id: 'E1',
      time: '09:00 AM',
      total: '$150.00',
      books: [
        { id: 'B001', title: 'Book A', quantity: 3, import_price: 20 },
        { id: 'B002', title: 'Book B', quantity: 2, import_price: 45 }
      ]
    },
    E2: {
      id: 'E2',
      time: '10:15 AM',
      total: '$200.00',
      books: []
    },
    E3: {
      id: 'E3',
      time: '11:30 AM',
      total: '$320.00',
      books: []
    }
  })

  const addImportReceiptForm = (newForm) => {
    const newId = `E${forms.value.length + 1}` 
    const form = { ...newForm, id: newId }
    forms.value.push(form)

    formDetails[newId] = {
      ...form,
      books: []
    }
  }

  const updateImportReceiptForm = (updatedForm) => {
    const index = forms.value.findIndex(f => f.id === updatedForm.id)
    if (index !== -1) {
      forms.value[index] = { ...updatedForm }
    }

    if (formDetails[updatedForm.id]) {
      formDetails[updatedForm.id] = {
        ...formDetails[updatedForm.id],
        ...updatedForm
      }
    }
  }

  const deleteImportReceiptForm = (form) => {
    if (!form || !form.id) return
    forms.value = forms.value.filter(f => f.id !== form.id)
    delete formDetails[form.id]
  }

  return {
    forms,
    formDetails,
    addImportReceiptForm,
    updateImportReceiptForm,
    deleteImportReceiptForm
  }
})
