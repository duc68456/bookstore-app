<script setup>
import { ref } from 'vue'

import ViewIcon from '@/assets/icons-vue/receipt.vue'
import EditIcon from '@/assets/icons-vue/edit.vue'
import DeleteIcon from '@/assets/icons-vue/trash.vue'

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Contact No', key: 'contact' },
  { title: 'Location', key: 'location' },
  { title: 'Action', key: 'action', sortable: false },
]

const items = ref([
  {
    id: '1',
    name: 'BookWorm Matara',
    contact: '0412410984',
    location: 'Matara',
  },
  {
    id: '2',
    name: 'BookWorm Matara',
    contact: '0412410984',
    location: 'Matara',
  },
  // Add more items as needed
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
  line-height: 140%;
  color: var(--vt-c-second-bg-color);
}

.action-icons {
  display: flex;
  gap: 12px;
}
</style>
