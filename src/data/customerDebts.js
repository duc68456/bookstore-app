import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDebts = defineStore('debts', () =>{
    const debts = ref([
        {
            id: '1',
            amount: '120',
        },
        {
            id: '2',
            amount: '280',
        },
        {
            id: '3',
            amount: 'C5A',
        }
    ])

    const debtsById = computed(() =>
        debts.value.reduce((map, debt) => {
        map[debt.id] = debt
        return map
        }, {})
    )

    return {
        debts,
        debtsById
    }
})