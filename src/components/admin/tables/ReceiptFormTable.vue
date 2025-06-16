<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import EditIcon from '@/assets/icons-vue/edit.vue'
import ViewIcon from '@/assets/icons-vue/receipt.vue'
import DeleteIcon from '@/assets/icons-vue/trash.vue'

const props = defineProps({ receipts: Array })
const emit = defineEmits(['view-receipt', 'edit-receipt', 'delete-receipt'])

const dialog = ref(false)
const toDelete = ref(null)
function openDeleteDialog(id) { toDelete.value = id; dialog.value = true }
function confirmDelete() { emit('delete-receipt', toDelete.value); dialog.value = false }

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Admin', key: 'admin' },
  { title: 'Date', key: 'date' },
  { title: 'Total', key: 'total' },
  { title: 'Action', key: 'action', sortable: false }
]
</script>

<template>
  <v-data-table :headers="headers" :items="props.receipts" item-value="id" hide-default-footer>
    <template #item.action="{ item }">
      <div class="action-icons">
        <v-tooltip text="View" location="top">
          <template #activator="{ props }">
            <div v-bind="props" @click="$emit('view-receipt', item)" style="cursor: pointer;">
              <ViewIcon />
            </div>
          </template>
        </v-tooltip>
        <v-tooltip text="Edit" location="top">
          <template #activator="{ props }">
            <div v-bind="props" @click="$emit('edit-receipt', item)" style="cursor: pointer;">
              <EditIcon />
            </div>
          </template>
        </v-tooltip>
        <v-tooltip text="Delete" location="top">
          <template #activator="{ props }">
            <div v-bind="props" @click="openDeleteDialog(item.id)" style="cursor: pointer;">
              <DeleteIcon />
            </div>
          </template>
        </v-tooltip>
      </div>
    </template>

    <template #item.admin="{ item }">
      <span>{{ item.admin }}</span>
    </template>
    <template #item.date="{ item }">
      <span>{{ item.date }}</span>
    </template>
    <template #item.total="{ item }">
      <span>{{ item.total }}</span>
    </template>
  </v-data-table>

  <v-dialog v-model="dialog" width="400" persistent>
    <v-card>
      <v-card-title class="text-h6">Confirm Deletion</v-card-title>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-btn @click="confirmDelete">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
