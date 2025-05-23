<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUser } from '@/data/user'

import CRUDMainForm from '../CRUDforms/CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import PaymentFormTable from '../tables/PaymentFormTable.vue'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
import ButtonText from '../texts/ButtonText.vue'

const router = useRouter()
const userStore = useUser()

// Danh sách khách hàng được chọn
const selectedCustomers = ref([])

// Mock dữ liệu nợ của khách hàng
const customerDebts = ref({
  '1': { amount: '$120.00' },
  '2': { amount: '$85.50' }
})

const customersWithDebt = computed(() => {
  return userStore.users.map(user => ({
    ...user,
    debt: customerDebts.value[user.id]?.amount || '$0.00',
    lastPayment: customerDebts.value[user.id]?.lastPayment || 'N/A'
  }))
})

function goBack() {
  router.push('/manage')
}

function handlePayment() {
  // Kiểm tra xem có khách hàng nào được chọn không
  if (selectedCustomers.value.length === 0) {
    alert('Please select at least one customer to process payment')
    return
  }
  
  // Xử lý thanh toán cho tất cả khách hàng được chọn
  const customerNames = selectedCustomers.value.map(customer => customer.name).join(', ')
  alert(`Processing payment for: ${customerNames}`)
}
</script>

<template>
  <div class="detail-wrapper">
    <CRUDMainForm @close="goBack">
      <template #title>
        <TitleText><template #text>Payment Receipt</template></TitleText>
      </template>
      <template #content>
        <div class="scrollable-content">
          <PaymentFormTable 
            v-model="selectedCustomers"
            :customers="customersWithDebt"
          />
          <div class="action-bar">
            <ButtonCRUD @click="handlePayment">
              <template #btn-text>
                <ButtonText><template #text>PROCESS PAYMENT</template></ButtonText>
              </template>
            </ButtonCRUD>
          </div>
        </div>
      </template>
    </CRUDMainForm>
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
