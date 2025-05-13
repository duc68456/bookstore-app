<script setup>
import { ref } from 'vue'

import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import BookTable from '../tables/BookTable.vue'
import BookTableShort from '../tables/BookTableShort.vue'
import NameFrame from '../frames/NameFrame.vue'
import EntryFormFrame from '../frames/EntryFormFrame.vue'
import ButtonEntry from '../buttons/ButtonEntry.vue'
import ButtonText from '../texts/ButtonText.vue'

import BookInEntryTable from '../tables/BookInEntryTable.vue'

const props = defineProps({
  entry: {
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

const addBookToEntry = () => {
  if (!selectedBook.value || !quantity.value || !importPrice.value) return;

  const newBook = {
    ...selectedBook.value, // Lấy dữ liệu từ selectedBook
    quantity: parseInt(quantity.value),
    import_price: parseInt(importPrice.value),
  };

  // Thêm sách vào list của entry
  props.entry.books.push(newBook);

  // Reset các trường sau khi thêm
  selectedBook.value = null;
  quantity.value = '';
  importPrice.value = '';
}

</script>
<template>
  <CRUDMainForm>
    <template #title>
      <TitleText>
        <template #text>Edit Entry Form</template>
      </TitleText>
    </template>
    <template #content>
      <div class="scrollable-content">
        <BookTableShort @select-book="handleSelectBook" />

        <div class="frame-wrapper">
          <NameFrame readonly :modelValue="selectedBook?.title || ''" disabled placeholder="Title" />
          <EntryFormFrame v-model="quantity" placeholder="Quantity" />
          <EntryFormFrame v-model="importPrice" placeholder="Import Price" />

          <ButtonEntry @click="addBookToEntry">
            <template #btn-text>
              <ButtonText><template #text>ADD</template></ButtonText>
            </template>
          </ButtonEntry>
        </div>

        <BookInEntryTable :books="entry.books" />
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