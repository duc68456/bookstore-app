<script setup>
import { ref } from 'vue'

import ViewIcon from '@/assets/icons-vue/receipt.vue'
import EditIcon from '@/assets/icons-vue/edit.vue'
import DeleteIcon from '@/assets/icons-vue/trash.vue'

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'User ID', key: 'userId' },
  { title: 'Amount', key: 'amount' },
  { title: 'Due Date', key: 'dueDate' },
  { title: 'Date & Time', key: 'dateTime' },
  { title: 'Action', key: 'action', sortable: false },
]

const items = ref([
  {
    id: '001',
    userId: '001',
    amount: '002 Books',
    dueDate: '13 - 03 - 2024',
    dateTime: '25-02-2024 10:39:43',
  },
  {
    id: '002',
    userId: '002',
    amount: '001 Book',
    dueDate: '15 - 03 - 2024',
    dateTime: '26-02-2024 11:20:00',
  },
])
</script>

<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
      item-value="id"
      :items-per-page="-1"
      hide-default-footer
    >
      <template #item.action="{ item }">
      <div class="action-icons">
        <v-tooltip text="View" location="top">
          <template #activator="{ props }">
            <ViewIcon v-bind="props" />  
          </template>
        </v-tooltip>

        <v-tooltip text="Edit" location="top">
          <template #activator="{ props }">
            <EditIcon v-bind="props" />
          </template>
        </v-tooltip>

        <v-tooltip text="Delete" location="top">
          <template #activator="{ props }">
            <DeleteIcon v-bind="props" />
          </template>
        </v-tooltip>
      </div>
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
</style>
