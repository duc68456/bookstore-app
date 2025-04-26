<script setup>
import { ref } from 'vue'

import ViewIcon from '@/assets/icons-vue/receipt.vue'
import EditIcon from '@/assets/icons-vue/edit.vue'
import DeleteIcon from '@/assets/icons-vue/trash.vue'

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Type', key: 'type' },
  { title: 'Language', key: 'language' },
  { title: 'Availability', key: 'availability' },
  { title: 'Action', key: 'action', sortable: false },
]

const items = ref([
  {
    id: '1',
    name: 'Hibernate Core -11th',
    type: 'Educational',
    language: 'English',
    availability: 'Available',
  },
  {
    id: '2',
    name: 'Hibernate Core -11th',
    type: 'Educational',
    language: 'English',
    availability: 'Borrowed',
  },
  {
    id: '3',
    name: 'Hibernate Core -11th',
    type: 'Educational',
    language: 'English',
    availability: 'Available',
  },
  {
    id: '4',
    name: 'Hibernate Core -11th',
    type: 'Educational',
    language: 'English',
    availability: 'Available',
  },
  {
    id: '5',
    name: 'Hibernate Core -11th',
    type: 'Educational',
    language: 'English',
    availability: 'Borrowed',
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
  line-height: 140%
}

.action-icons {
  display: flex;
  gap: 12px;
}
</style>
