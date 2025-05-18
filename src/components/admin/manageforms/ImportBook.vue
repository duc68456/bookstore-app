<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useImportReceiptFormStore } from '@/data/importReceipts'

import CRUDMainForm from '../CRUDforms/CRUDMainForm.vue'
import ButtonManage from '../buttons/ButtonManage.vue'
import TitleText from '../texts/TitleText.vue'
import ReceiptFormTable from '../tables/ReceiptFormTable.vue'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
import ButtonText from '../texts/ButtonText.vue'
import EditImportForm from '../CRUDforms/EditImportForm.vue'

const router = useRouter()
const store = useImportReceiptFormStore()

const importReceiptList = computed(() => store.forms)

const editingReceipt = ref(null)

function handleEdit(receipt) {
  editingReceipt.value = store.formDetails[receipt.id]
}

function handleAddBook() {
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

  store.addImportReceiptForm({
    time: fullTime,
    total: '$0.00'
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
          <TitleText><template #text>Import Book</template></TitleText>
        </template>
        <template #content>
          <div class="scrollable-content">
          <ReceiptFormTable :receipts="importReceiptList" @edit-receipt="handleEdit" @delete-receipt="deleteReceipt"/>
          <ButtonCRUD @click="handleAddBook">
            <template #btn-text>
              <ButtonText><template #text>ADD IMPORT RECEIPT</template></ButtonText>
            </template>
          </ButtonCRUD>
          </div>
        </template>
      </CRUDMainForm>
    </div>

    <div v-else class="detail-wrapper">
      <EditImportForm :importReceipt="editingReceipt" @close="closeEditForm" />
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
</style>
