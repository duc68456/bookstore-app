<script setup>
import { useExportReceiptFormStore } from '@/data/exportReceipts';
import { useUser } from '@/data/user'; // Import useUser store
import {computed, onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';

import CRUDMainForm from '../CRUDforms/CRUDMainForm.vue';
import EditExportForm from '../CRUDforms/EditExportForm.vue';
import ButtonCRUD from '../buttons/ButtonCRUD.vue';
import SelectFrame from '../frames/SelectFrame.vue';
import ExportReceiptTable from '../tables/ExportReceiptTable.vue';
import ButtonText from '../texts/ButtonText.vue';
import TitleText from '../texts/TitleText.vue';

const router = useRouter()
const store = useExportReceiptFormStore()
const userStore = useUser() // Sử dụng user store

const exportReceiptList = computed(() => store.receipts)

const editingReceipt = ref(null)
const selectedCustomer = ref(null) // Lưu trữ toàn bộ đối tượng khách hàng được chọn

// Thêm biến để quản lý nợ của khách hàng
const customerDebts = ref([])

onMounted(() => {
  store.fetchReceipts()
})

async function handleEdit(item) {
  const detail = await store.fetchReceiptById(item.id)
  editingReceipt.value = { ...detail, userId: item.userId }
}

async function handleAddExport() {
  // Kiểm tra xem đã chọn khách hàng chưa
  if (!selectedCustomer.value) {
    alert('Please select a customer before adding an export receipt.')
    return
  }

  editingReceipt.value = ({
    adminId: userStore.currentUser?.id || 'admin001', // Nếu có
    userId: selectedCustomer.value.id,
    paidAmount: 0,
    books: []
  });

  // Ghi nợ

  // Reset khách hàng đã chọn
  selectedCustomer.value = null
}

function addCustomerDebt(customerId, amount, date) {
  // Chuyển đổi amount từ string sang number
  const debtAmount = parseFloat(amount)
  
  // Nếu khách hàng đã có nợ, cập nhật nợ hiện tại
  if (customerDebts.value[customerId]) {
    customerDebts.value[customerId].amount += debtAmount
    customerDebts.value[customerId].lastPayment = date
  } else {
    // Nếu khách hàng chưa có nợ, tạo mới
    customerDebts.value[customerId] = {
      amount: debtAmount,
      lastPayment: date
    }
  }
  
  // Lưu trữ dữ liệu nợ để PaymentReceipt có thể truy cập
  // Trong thực tế, bạn có thể lưu trữ dữ liệu này trong localStorage hoặc tạo store riêng
  localStorage.setItem('customerDebts', JSON.stringify(customerDebts.value))
}

function deleteReceipt(receipt) {
  store.deleteExportReceiptForm(receipt)
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
        <TitleText><template #text>Invoices</template></TitleText>
      </template>
      <template #content>
        <div class="scrollable-content">
          <ExportReceiptTable :receipts="exportReceiptList" @edit-receipt="handleEdit" @delete-receipt="deleteReceipt"/>
          <div class="action-bar">
            <SelectFrame
              v-model="selectedCustomer"
              :options="userStore.users"
              option-label-key="name"
              option-value-key="id"
              placeholder="Select Customer"
            />
            <ButtonCRUD @click="handleAddExport">
              <template #btn-text>
                <ButtonText><template #text>ADD INVOICES</template></ButtonText>
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
