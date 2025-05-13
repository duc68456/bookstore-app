<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { useBook } from '@/data/book' 

import ViewIcon from '@/assets/icons-vue/receipt.vue'
import EditIcon from '@/assets/icons-vue/edit.vue'
import DeleteIcon from '@/assets/icons-vue/trash.vue'

const props = defineProps({
  excludedBookIds: {
    type: Array,
    default: () => []
  }
})

const filteredItems = computed(() =>
  book.items.filter(item => !props.excludedBookIds.includes(item.id))
)

const book = useBook()

const emit = defineEmits(['select-book'])

const dialog = ref(false)

const onRowClick = (bookRow) => {
  const selected = book.fullBookDetails[bookRow.id];
  emit('select-book', selected);
}

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Title', key: 'title' },
  { title: 'Author', key: 'author' },
  { title: 'Published Year', key: 'published_year' },
  { title: 'Categories', key: 'categories' },
]

</script>

<template>
  <v-container fluid>
<v-data-table
  :headers="headers"
  :items="filteredItems"
  class="elevation-1"
  item-value="id"
  :items-per-page="-1"
  hide-default-footer
>
  <template #item="{ item }">
    <tr @click="onRowClick(item)">
      <td>{{ item.id }}</td>
      <td>{{ item.title }}</td>
      <td>{{ item.author }}</td>
      <td>{{ item.published_year }}</td>
      <td>{{ book.fullBookDetails[item.id]?.categories.join(', ') }}</td>
    </tr>
  </template>
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

.action-icons {
  display: flex;
  gap: 12px;
}

.delete-dialog .v-card {
  width: 25vw;
  height: 25vh;
  border-radius: 50px;
  background: var(--vt-c-main-bg-color);
  align-items: center;
}

.delete-dialog .v-card-title {
  color: var(--vt-c-second-bg-color);
  font-weight: bold;
  text-align: center;
}

.delete-dialog .v-card-text {
  font-size: 16px;
  color: var(--vt-c-second-bg-color);
}
</style>