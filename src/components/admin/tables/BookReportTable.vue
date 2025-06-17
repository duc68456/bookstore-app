<script setup>
import { ref, watch } from 'vue'
import axios from '@/plugins/axios'

const props = defineProps({
  month: Date
})

const reports = ref([])
const loading = ref(false)

const headers = [
  { title: 'Book ID', key: 'bookId' },
  { title: 'Title', key: 'bookName' }, // ✅ Thêm dòng này
  { title: 'Opening Stock', key: 'openingStock' },
  { title: 'Stock Increase', key: 'stockIncrease' },
  { title: 'Stock Decrease', key: 'stockDecrease' },
  { title: 'Closing Stock', key: 'closingStock' },
  // { title: 'Month',          key: 'reportMonth' }
]


// Fetch báo cáo theo tháng
async function fetchReportByMonth(monthDate) {
  if (!monthDate) return

  let year, month

  if (monthDate instanceof Date) {
    year = monthDate.getFullYear()
    month = monthDate.getMonth() + 1
  } else if (monthDate.year && monthDate.month) {

    year = monthDate.year
    month = monthDate.month + 1
  } else {
    console.warn('Unsupported monthDate format:', monthDate)
    return
  }

  console.log(`[FETCH] year: ${year}, month: ${month}`)

  loading.value = true
  try {
    const { data } = await axios.get('/monthlyInventoryReports', {
      params: { year, month }
    })
    reports.value = data.result || []
  } catch (e) {
    console.error('[BookReport] Load failed:', e)
  } finally {
    loading.value = false
  }
}


// Tự động gọi khi props.month thay đổi
watch(() => props.month, fetchReportByMonth, { immediate: true })
</script>

<template>
  <v-container fluid>
    <div v-if="loading">Loading...</div>
    <v-data-table v-else :headers="headers" :items="reports" item-value="bookId" class="elevation-1"
      hide-default-footer />
  </v-container>
</template>

<style scoped>
.v-data-table {
  background-color: var(--vt-c-main-bg-color);
  border-radius: 12px;
  padding: 12px;
  font-family: Montserrat;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  color: var(--vt-c-second-bg-color);
}
</style>
