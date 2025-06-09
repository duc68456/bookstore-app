<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { useBook } from '@/data/book' 

const book = useBook()

const props = defineProps({
  showActions: {
    type: Boolean,
    default: true
  },
})

const headers = [
  { title: 'Title', key: 'title', width: '50%' },
  { title: 'Opening Stock', key: 'opening_stock' },
  { title: 'Stock Increase', key: 'stock_increase' },
  { title: 'Stock Decrease', key: 'stock_decrease' },
  { title: 'Closing Stock', key: 'closing_stock' },
]

</script>

<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="book.items" class="elevation-1" item-value="id" :items-per-page="-1"
    @click:row="onRowClick"
      hide-default-footer>
    </v-data-table>
  </v-container>
</template>

<style scoped>

.v-data-table {
  background-color: var(--vt-c-main-bg-color);
  border-radius: 12px;
  padding: 12px;
  font-family: Montserrat;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  color: var(--vt-c-second-bg-color);
  
}
</style>
