<script setup>
import { ref } from 'vue'

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
      :items-per-page="10"
      hide-default-footer
    >
      <template #item.action="{ item }">
        <v-tooltip text="View" location="top">
          <template #activator="{ props }">
            <v-icon small class="me-2" color="black" v-bind="props">mdi-eye</v-icon>
          </template>
        </v-tooltip>

        <v-tooltip text="Edit" location="top">
          <template #activator="{ props }">
            <v-icon small class="me-2" color="black" v-bind="props">mdi-pencil</v-icon>
          </template>
        </v-tooltip>

        <v-tooltip text="Delete" location="top">
          <template #activator="{ props }">
            <v-icon small color="black" v-bind="props">mdi-delete</v-icon>
          </template>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped>
.v-data-table {
  background-color: white;
  border-radius: 12px;
  padding: 12px;
}
</style>
