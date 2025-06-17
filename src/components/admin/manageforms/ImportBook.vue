<!-- src/components/admin/ImportBook.vue -->
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useImportReceiptFormStore } from '@/data/importReceipts'

import CRUDMainForm from '../CRUDforms/CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import ReceiptFormTable from '../tables/ReceiptFormTable.vue'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
import ButtonText from '../texts/ButtonText.vue'
import EditImportForm from '../CRUDforms/EditImportForm.vue'

const router = useRouter()
const store = useImportReceiptFormStore()
const receipts = computed(() => store.receipts)
const editingReceipt = ref(null)

onMounted(() => {
  store.fetchReceipts()
})

async function handleEdit(item) {
  // Lấy chi tiết phiếu nhập từ store, có đầy đủ books
  const detail = await store.fetchReceiptById(item.id)
  editingReceipt.value = { ...detail }
}
async function deleteReceipt(id) {
  await store.deleteReceipt(id)
}
async function handleAdd() {
  // Ví dụ khởi tạo giá trị mặc định
  editingReceipt.value = {
    admin: 'admin001',
    date: new Date().toISOString().slice(0, 10),
    total: 0,
    books: []
  }
}
function closeEdit() {
  editingReceipt.value = null
  store.fetchReceipts()
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
        <ReceiptFormTable :receipts="receipts" @edit-receipt="handleEdit" @delete-receipt="deleteReceipt" />
        <ButtonCRUD @click="handleAdd">
          <template #btn-text>
            <ButtonText><template #text>ADD RECEIPT</template></ButtonText>
          </template>
        </ButtonCRUD>
      </template>
    </CRUDMainForm>
  </div>

  <div v-else class="detail-wrapper">
    <EditImportForm :importReceipt="editingReceipt" @close="closeEdit" />
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
