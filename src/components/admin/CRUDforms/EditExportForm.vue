<script setup>
import { ref, watch } from 'vue'
import { useExportReceiptFormStore } from '@/data/exportReceipts.js'
import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import BookTableShort from '../tables/BookTableShort.vue'
import TitleFrame from '../frames/TitleFrame.vue'
import ReceiptFormFrame from '../frames/ReceiptFormFrame.vue'
import ButtonReceipt from '../buttons/ButtonReceipt.vue'
import ButtonText from '../texts/ButtonText.vue'
import BookOutReceiptTable from '../tables/BookOutReceiptTable.vue'

const props = defineProps({
  exportReceipt: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['close'])
const selectedBook = ref(null);
const quantity = ref('')
const paidAmount = ref(props.exportReceipt.paidAmount || '')

watch(() => props.exportReceipt.paidAmount, (val) => {
  paidAmount.value = val
})

// ĐẢM BẢO props.exportReceipt.books luôn là mảng
if (!props.exportReceipt.books) {
  props.exportReceipt.books = []
}

const store = useExportReceiptFormStore()

const handleSelectBook = (book) => { selectedBook.value = book }

const addBookToReceipt = () => {
  if (!selectedBook.value || !quantity.value) return; // CHỈ cần check quantity, bỏ exportPrice
  const newBook = {
    ...selectedBook.value,
    quantity: parseInt(quantity.value),
  }
  props.exportReceipt.books.push(newBook)
  selectedBook.value = null
  quantity.value = ''
}

function handleDeleteBook(book) {
  const idx = props.exportReceipt.books.findIndex(b => b.id === book.id)
  if (idx !== -1) props.exportReceipt.books.splice(idx, 1)
}

async function handleSave() {
  const bookDetails = (props.exportReceipt.books || []).map(b => ({
    bookId:        b.bookId || b.id,
    // name:          b.title || b.name,
    // publishedYear: b.published_year || b.publishedYear,
    quantity:      b.quantity,
    // authors:       Array.isArray(b.authors) ? b.authors : Object.values(b.authors || {}),
    // categories:    Array.isArray(b.categories) ? b.categories : Object.values(b.categories || {}),
    // importPrice:   b.importPrice || b.import_price
  }))

  const payload = {
    userId: props.exportReceipt.userId,
    adminId: props.exportReceipt.admin || 'admin001',   // Sửa đúng tên props!
    paidAmount: parseInt(paidAmount.value) || 0,
    bookDetails
  }
  console.log('Payload gửi lên:', payload);

  if (!props.exportReceipt.id && !props.exportReceipt.exportReceiptId) {
    // Add mới
    await store.addExportReceiptForm(payload);
  } else {
    // Update
    await store.updateExportReceiptForm(
        props.exportReceipt.id || props.exportReceipt.exportReceiptId,
        payload
    );
  }
  emit('close');
}
</script>

<template>
  <CRUDMainForm>
    <template #title>
      <TitleText>
        <template #text>Edit Export Receipt</template>
      </TitleText>
    </template>
    <template #content>
      <div class="scrollable-content">
        <BookTableShort @select-book="handleSelectBook" :excludedBookIds="exportReceipt.books.map(book => book.id)" />

        <div class="frame-wrapper">
          <TitleFrame readonly :modelValue="selectedBook?.title || ''" disabled placeholder="Title" />
          <ReceiptFormFrame v-model="quantity" placeholder="Quantity" />
          <ButtonReceipt @click="addBookToReceipt">
            <template #btn-text>
              <ButtonText><template #text>ADD</template></ButtonText>
            </template>
          </ButtonReceipt>
        </div>

        <BookOutReceiptTable :books="exportReceipt.books" :customer="exportReceipt.customer"
          @delete-book="handleDeleteBook" />
        <div style="margin-top: 20px; display: flex; justify-content: flex-end; align-items: center; gap: 40px;">
          <ReceiptFormFrame v-model="paidAmount" placeholder="Paid Amount" style="width: 150px;" />
          <ButtonReceipt @click="handleSave">
            <template #btn-text>
              <ButtonText>
                <template #text>
                  {{ props.exportReceipt.id || props.exportReceipt.exportReceiptId ? 'Save' : 'Create' }}
                </template>
              </ButtonText>
            </template>
          </ButtonReceipt>
        </div>

      </div>
    </template>
  </CRUDMainForm>
</template>
<style scoped>
.frame-wrapper {
  display: flex;
  flex-direction: row;
  padding-left: 12px;
  gap: 10px;
}

.scrollable-content {
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  padding-right: 12px;
}
</style>
