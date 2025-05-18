<script setup>
import { useRouter } from 'vue-router'
import TitleText from './texts/TitleText.vue'

import ButtonManage from './buttons/ButtonManage.vue'

import ImportBook from './manageforms/ImportBook.vue'

import ExportBook from './manageforms/ExportBook.vue'

import PaymentReceipt from './manageforms/PaymentReceipt.vue'
const router = useRouter()

function goToImportBook() {
  router.push('/manage/import-book')
}

function goToExportBook() {
  router.push('/manage/export-book')
}

function goToPaymentReceipt() { 
  router.push('/manage/payment-receipt')
}

</script>
<template>
  <div class="content">
    <div class="top-bar">
      <div class="left">
        <TitleText>
          <template #text>
            Manage Bookstore
          </template>
        </TitleText>
      </div>
    </div>
    <div class="button-wrapper">
      <ButtonManage @click="goToImportBook" />
      <ButtonManage @click="goToExportBook" />
      <ButtonManage @click="goToPaymentReceipt" />
    </div>
  </div>
</template>
<style scoped>
.content {
  width: 100%;
  height: 100%;
  padding: 20px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.left {
  display: flex;
  align-items: center;
}

.button-wrapper {
  display: flex;
  flex-direction: row;
  gap: 7%;
  padding: 0 10%;
}
</style>