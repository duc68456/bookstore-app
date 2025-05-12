<script setup>
import { ref } from 'vue'

import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import BookTable from '../tables/BookTable.vue'
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

const selectedBook = ref(null)
const quantity = ref('')
const importPrice = ref('')

const addBookToEntry = () => {
  if (!selectedBook.value || !quantity.value || !importPrice.value) return

  const newBook = {
    ...selectedBook.value,
    quantity: parseInt(quantity.value),
    import_price: parseInt(importPrice.value)
  }

  props.entry.books.push(newBook)

  selectedBook.value = null
  quantity.value = ''
  importPrice.value = ''
}
</script>
<template>
    <CRUDMainForm>
        <template #title>
            <TitleText>
                <template #text>
                    Edit Entry Form
                </template>
            </TitleText>
        </template>
        <template #content>
          <div class="scrollable-content">
          <BookTable :items="books" :fullBookDetails="bookDetails" :showActions="false" :show-quantity="false" :show-price="false" 
            @select-book="book => selectedBook.value = book"/>
          <div class="frame-wrapper">
            <NameFrame :modelValue="selectedBook?.title || ''" disabled />
            <EntryFormFrame v-model="quantity" placeholder="Quantity" />
            <EntryFormFrame v-model="importPrice" placeholder="Import Price" />
            <ButtonEntry @click="addBookToEntry">
                <template #btn-text>
                    <ButtonText>
                        <template #text>
                            ADD
                        </template>
                    </ButtonText>
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