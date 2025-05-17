<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useExportReceiptFormStore } from '@/data/exportReceipts'

import ButtonManage from '../buttons/ButtonManage.vue'
import CRUDMainForm from '../CRUDForms/CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import ReceiptFormTable from '../tables/ReceiptFormTable.vue'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
import ButtonText from '../texts/ButtonText.vue'
import EditExportForm from '../CRUDforms/EditExportForm.vue'

const router = useRouter()
const store = useExportReceiptFormStore()

const exportReceiptList = computed(() => store.forms)

const editingReceipt = ref(null)

// Thêm danh sách khách hàng và biến lưu khách hàng được chọn
const selectedCustomer = ref(null)
const customers = ref([
  { id: 1, name: 'Customer A' },
  { id: 2, name: 'Customer B' },
  { id: 3, name: 'Customer C' }
])

function handleEdit(receipt) {
  editingReceipt.value = store.formDetails[receipt.id]
}

function handleAddExport() {
  // Kiểm tra xem đã chọn khách hàng chưa
  if (!selectedCustomer.value) {
    alert('Please select a customer before adding an export receipt.')
    return
  }

  const now = new Date()

  const datePart = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(now)

  const timePart = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  const fullTime = `${datePart} - ${timePart}`

  store.addExportReceiptForm({
    time: fullTime,
    total: '$0.00',
    customer: selectedCustomer.value
  })
}

function closeEditForm() {
  editingReceipt.value = null
}

function goBack() {
  router.push('/manage')
}
</script>

<template>
  <div v-if="!editingReceipt" class="detail-wrapper">
    <CRUDMainForm @close="goBack">
      <template #title>
        <TitleText><template #text>Export Book</template></TitleText>
      </template>
      <template #content>
        <div class="scrollable-content">
          <ReceiptFormTable :receipts="exportReceiptList" @edit-receipt="handleEdit" @delete-receipt="deleteReceipt" />
          <div class="action-bar">
            <select v-model="selectedCustomer" class="customer-select">
              <option disabled value="">Select Customer</option>
              <option v-for="customer in customers" :key="customer.id" :value="customer.name">{{ customer.name }}
              </option>
            </select>
            <ButtonCRUD @click="handleAddExport">
              <template #btn-text>
                <ButtonText><template #text>ADD EXPORT RECEIPT</template></ButtonText>
              </template>
            </ButtonCRUD>
          </div>
        </div>
      </template>
    </CRUDMainForm>
  </div>

  <div v-else class="detail-wrapper">
    <EditExportForm :exportReceipt="editingReceipt" @close="closeEditForm" />
  </div>
</template>

<style scoped>
.scrollable-content {
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  padding-right: 12px;
}

.detail-wrapper {
  color: var(--vt-c-main-bg-color);
  width: 100%;
  padding: 12px;
  font-family: Montserrat;
}

.action-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.customer-select {
  padding: 6px 10px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
