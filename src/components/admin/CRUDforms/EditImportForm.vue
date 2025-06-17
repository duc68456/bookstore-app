<script setup>
import { ref } from 'vue'
import {useImportReceiptFormStore} from '@/data/importReceipts.js'
import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import BookTable from '../tables/BookTable.vue'
import BookTableShort from '../tables/BookTableShort.vue'
import TitleFrame from '../frames/TitleFrame.vue'
import ReceiptFormFrame from '../frames/ReceiptFormFrame.vue'
import ButtonReceipt from '../buttons/ButtonReceipt.vue'
import ButtonText from '../texts/ButtonText.vue'

import BookInReceiptTable from '../tables/BookInReceiptTable.vue'

const props = defineProps({
  importReceipt: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['close'])
const selectedBook = ref(null);

const handleSelectBook = (book) => {
  selectedBook.value = book;
};

const quantity = ref('')
const importPrice = ref('')
const store = useImportReceiptFormStore()

const addBookToReceipt = () => {
  if (!selectedBook.value || !quantity.value || !importPrice.value) return;

  const newBook = {
    ...selectedBook.value,
    quantity: parseInt(quantity.value),
    import_price: parseInt(importPrice.value),
  };

  props.importReceipt.books.push(newBook);

  selectedBook.value = null;
  quantity.value = '';
  importPrice.value = '';
}

function deleteBookInReceipt(book) {
  // importReceipt từ props
  const idx = props.importReceipt.books.findIndex(b => b.id === book.id)
  if (idx !== -1) props.importReceipt.books.splice(idx, 1)
}

async function handleSave() {
  // Chuyển đổi books -> bookDetails theo đúng yêu cầu backend
  const bookDetails = (props.importReceipt.books || []).map(b => ({
    bookId:        b.bookId || b.id,
    name:          b.title || b.name,
    publishedYear: b.published_year || b.publishedYear,
    importPrice:   b.import_price || b.importPrice,
    quantity:      b.quantity,
    authors:       Array.isArray(b.authors) ? b.authors : Object.values(b.authors || {}),
    categories:    Array.isArray(b.categories) ? b.categories : Object.values(b.categories || {})
  }));

  // Debug payload gửi lên
  const payload = {
    adminId: props.importReceipt.admin || 'admin001',
    bookDetails
  };
  console.log('Payload gửi lên:', payload);

  if (!props.importReceipt.id && !props.importReceipt.importReceiptId) {
    // Add mới
    await store.createReceipt(payload);
  } else {
    // Update
    await store.updateReceipt(
        props.importReceipt.id || props.importReceipt.importReceiptId,
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
        <template #text>Edit Import Receipt</template>
      </TitleText>
    </template>
    <template #content>
      <div class="scrollable-content">
        <BookTableShort @select-book="handleSelectBook"
  :excludedBookIds="importReceipt.books.map(book => book.id)"/>

        <div class="frame-wrapper">
          <TitleFrame readonly :modelValue="selectedBook?.title || ''" disabled placeholder="Title" />
          <ReceiptFormFrame v-model="quantity" placeholder="Quantity" />
          <ReceiptFormFrame v-model="importPrice" placeholder="Import Price" />

          <ButtonReceipt @click="addBookToReceipt">
            <template #btn-text>
              <ButtonText><template #text>ADD</template></ButtonText>
            </template>
          </ButtonReceipt>
        </div>

        <BookInReceiptTable :books="importReceipt.books" @delete-book="deleteBookInReceipt" />
        <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
          <ButtonReceipt @click="handleSave">
            <template #btn-text>
              <ButtonText>
                <template #text>
                  {{ props.importReceipt.id || props.importReceipt.importReceiptId ? 'Save' : 'Create' }}
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
</style>