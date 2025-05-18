<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUser } from '@/data/user'

import CRUDMainForm from '../CRUDforms/CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import PaymentFormTable from '../tables/PaymentFormTable.vue'

const router = useRouter()
const userStore = useUser()

// Mock dữ liệu nợ của khách hàng
const customerDebts = ref({
  '1': { amount: '$120.00', lastPayment: 'May 10, 2025' },
  '2': { amount: '$85.50', lastPayment: 'May 15, 2025' }
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

function handlePayment(customer) {
  // Xử lý thanh toán
  alert(`Processing payment for ${customer.name}`)
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
            :customers="customersWithDebt" 
            @process-payment="handlePayment"
          />
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
