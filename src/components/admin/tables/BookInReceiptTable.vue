<script setup>
import { computed } from 'vue'

const props = defineProps({
  books: {
    type: Array,
    required: true
  }
})

const headers = computed(() => [
  { title: 'ID', key: 'id' },
  { title: 'Title', key: 'title' },
  { title: 'Quantity', key: 'quantity' },
  { title: 'Import Price', key: 'import_price' }
])
</script>

<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="books"
      class="elevation-1"
      item-value="id"
      :items-per-page="-1"
      hide-default-footer
    >
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
