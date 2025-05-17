<script setup>
import { ref } from 'vue'

import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import BookTable from '../tables/BookTable.vue'
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
const selectedBook = ref(null);

const handleSelectBook = (book) => {
  selectedBook.value = book;
};

const quantity = ref('')
const exportPrice = ref('')

const addBookToReceipt = () => {
  if (!selectedBook.value || !quantity.value || !exportPrice.value) return;

  const newBook = {
    ...selectedBook.value,
    quantity: parseInt(quantity.value),
    export_price: parseInt(exportPrice.value),
  };

  props.exportReceipt.books.push(newBook);

  selectedBook.value = null;
  quantity.value = '';
  exportPrice.value = '';
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
          <ReceiptFormFrame v-model="exportPrice" placeholder="Export Price" />

          <ButtonReceipt @click="addBookToReceipt">
            <template #btn-text>
              <ButtonText><template #text>ADD</template></ButtonText>
            </template>
          </ButtonReceipt>
        </div>

        <BookOutReceiptTable :books="exportReceipt.books" :customer="exportReceipt.customer"
          @delete-book="handleDeleteBook" />

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
