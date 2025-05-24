import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePaymentReceipts = defineStore('paymentReceipts', () => {
    const paymentReceipts = ref([
        {
            id: 1,
            time: '2025-4-2',
            customer: 'Alice Johnson',
            amount: '$99',
        },
        {
            id: 2,
            time: '2023-2-21',
            customer: 'Bob Smith',
            amount: '$36',
        },
    ])

    const addPaymentReceipt = (paymentReceipt) => {
        const newId = String(paymentReceipts.value.length + 1)
        paymentReceipts.value.push({...paymentReceipt, id: newId})
    }

    const updatePaymentReceipt = (updatedPaymentReceipt) => {
        const index = paymentReceipts.value.findIndex(u => u.id === updatedPaymentReceipt.id)
        if (index !== -1) {
        paymentReceipts.value[index] = { ...updatedPaymentReceipt }
        }
    }

    const deletePaymentReceipt = (receiptId) => {  // ✅ Thêm function delete
        paymentReceipts.value = paymentReceipts.value.filter(r => r.id !== receiptId)
    }

    return {
        paymentReceipts,
        addPaymentReceipt,
        updatePaymentReceipt,
        deletePaymentReceipt,
    }
})