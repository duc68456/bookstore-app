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

import BookInReceiptTable from '../tables/BookInReceiptTable.vue'

const props = defineProps({
  importReceipt: {
    type: Object,
    required: true
  }
})
const selectedBook = ref(null);

const handleSelectBook = (book) => {
  selectedBook.value = book;
};

const quantity = ref('')
const importPrice = ref('')

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

        <BookInReceiptTable :books="importReceipt.books" />
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