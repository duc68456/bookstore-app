<script setup>
import { ref } from 'vue'

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Username', key: 'username' },
  { title: 'Action', key: 'action', sortable: false },
]

const items = ref([
  {
    id: '1',
    name: 'Prabath Jayasuriya',
    email: 'prabathjaylk@gmail.com',
    username: 'prabathjay',
  },
  {
    id: '2',
    name: 'Prabath Jayasuriya',
    email: 'prabathjaylk@gmail.com',
    username: 'prabathjay',
  },
  {
    id: '3',
    name: 'Prabath Jayasuriya',
    email: 'prabathjaylk@gmail.com',
    username: 'prabathjay',
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
