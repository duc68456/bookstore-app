import axios from '@/plugins/axios'
import { ref } from 'vue'

const regulations = ref({
  minImportQuantity: 0,
  minStockBeforeImport: 0,
  maxDebt: 0,
  minStockAfterExport: 0,
  allowPartialPayment: false,
})

async function fetchRegulations() {
  const { data } = await axios.get('/parameters')
  regulations.value = {
    minImportQuantity: data.minImportQuantity ?? 0,
    minStockBeforeImport: data.minStockBeforeImport ?? 0,
    maxDebt: data.maxDebt ?? 0,
    minStockAfterExport: data.minStockAfterExport ?? 0,
    allowPartialPayment: data.allowPartialPayment === 1
  }
}

async function saveRegulations() {
  await axios.post('/parameters', {
    minImportQuantity: regulations.value.minImportQuantity,
    minStockBeforeImport: regulations.value.minStockBeforeImport,
    maxDebt: regulations.value.maxDebt,
    minStockAfterExport: regulations.value.minStockAfterExport,
    allowPartialPayment: regulations.value.allowPartialPayment ? 1 : 0
  })
}

export function useRegulation() {
  return { regulations, fetchRegulations, saveRegulations }
}
