<script setup>
import { ref } from 'vue'

// Icon components
import ViewIcon from '@/assets/icons-vue/receipt.vue'
import EditIcon from '@/assets/icons-vue/edit.vue'
import DeleteIcon from '@/assets/icons-vue/trash.vue'

// Props & emits
defineProps({
  entries: Array
})

const emit = defineEmits(['view-entry', 'edit-entry', 'delete-entry'])

const dialog = ref(false)
const entryToDelete = ref(null)

const openDeleteDialog = (entry) => {
  entryToDelete.value = entry
  dialog.value = true
}

const confirmDelete = () => {
  emit('delete-entry', entryToDelete.value)
  dialog.value = false
  entryToDelete.value = null
}

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Time', key: 'time' },
  { title: 'Total Amount', key: 'total' },
  { title: 'Action', key: 'action', sortable: false }
]
</script>

<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="entries"
      class="elevation-1"
      item-value="id"
      :items-per-page="-1"
      hide-default-footer
    >
      <template #item.action="{ item }">
        <div class="action-icons">

          <v-tooltip text="Edit" location="top">
            <template #activator="{ props }">
              <div v-bind="props" @click="$emit('edit-entry', item)" style="cursor: pointer;">
                <EditIcon />
              </div>
            </template>
          </v-tooltip>

          <v-tooltip text="Delete" location="top">
            <template #activator="{ props }">
              <div v-bind="props" @click="openDeleteDialog(item)" style="cursor: pointer;">
                <DeleteIcon />
              </div>
            </template>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>

    <!-- Delete confirmation dialog -->
    <v-dialog v-model="dialog" width="400" class="delete-dialog" persistent scroll-strategy="block">
      <v-card>
        <v-card-title class="text-h6">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete entry
          <strong>{{ entryToDelete?.id }}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="dialog = false">Cancel</v-btn>
          <v-btn color="var(--vt-c-second-bg-color)" variant="tonal" @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
