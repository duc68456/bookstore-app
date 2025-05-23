import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useExportReceiptFormStore = defineStore('exportForm', () => {
  const forms = ref([
    { id: 'X1', time: '09:30 AM', total: '$180.00', customer: 'Customer A' },
    { id: 'X2', time: '11:45 AM', total: '$250.00', customer: 'Customer B' },
    { id: 'X3', time: '02:15 PM', total: '$420.00', customer: 'Customer C' }
  ])

  const formDetails = reactive({
    X1: {
      id: 'X1',
      time: '09:30 AM',
      total: '$180.00',
      customer: 'Customer A',
      books: [
        { id: 'B001', title: 'Book A', quantity: 2, export_price: 30 },
        { id: 'B003', title: 'Book C', quantity: 4, export_price: 30 }
      ]
    },
    X2: {
      id: 'X2',
      time: '11:45 AM',
      total: '$250.00',
      customer: 'Customer B',
      books: []
    },
    X3: {
      id: 'X3',
      time: '02:15 PM',
      total: '$420.00',
      customer: 'Customer C',
      books: []
    }
  })

  const addExportReceiptForm = (newForm) => {
    const newId = `X${forms.value.length + 1}`
    const form = { ...newForm, id: newId }  

    forms.value.push(form)

    formDetails[newId] = {
      ...form,
      books: []
    }
  }

  const updateExportReceiptForm = (updatedForm) => {
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

  const deleteExportReceiptForm = (form) => {
    if (!form || !form.id) return
    forms.value = forms.value.filter(f => f.id !== form.id)
    delete formDetails[form.id]
  }

  return {
    forms,
    formDetails,
    addExportReceiptForm,
    updateExportReceiptForm,
    deleteExportReceiptForm
  }
})
