<script setup>
import { ref } from 'vue'

import ViewIcon from '@/assets/icons-vue/receipt.vue'
import EditIcon from '@/assets/icons-vue/edit.vue'
import DeleteIcon from '@/assets/icons-vue/trash.vue'

// Nhận props từ Books.vue
defineProps({
  items: Array,
  fullBookDetails: Object
})

// Emit các sự kiện lên Books.vue
const emit = defineEmits(['view-book', 'edit-book', 'delete-book'])

const dialog = ref(false)
const bookToDelete = ref(null)

const openDeleteDialog = (book) => {
  bookToDelete.value = book
  dialog.value = true
}

const confirmDelete = () => {
  emit('delete-book', bookToDelete.value)
  dialog.value = false
  bookToDelete.value = null
}

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Author', key: 'author' },
  { title: 'Selling Price', key: 'selling_price' },
  { title: 'Quantity', key: 'quantity' },
  { title: 'Published Year', key: 'published_year' },
  { title: 'Action', key: 'action', sortable: false },
]
</script>

<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="items" class="elevation-1" item-value="id" :items-per-page="-1"
      hide-default-footer>
      <template #item.action="{ item }">
        <div class="action-icons">
          <v-tooltip text="View" location="top">
            <template #activator="{ props }">
              <div v-bind="props" @click="$emit('view-book', fullBookDetails[item.id])" style="cursor: pointer;">
                <ViewIcon />
              </div>
            </template>
          </v-tooltip>

          <v-tooltip text="Edit" location="top">
            <template #activator="{ props }">
              <div v-bind="props" @click="$emit('edit-book', fullBookDetails[item.id])" style="cursor: pointer;">
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

    <v-dialog v-model="dialog" width="400" class="delete-dialog" persistent scroll-strategy="block">
      <v-card>
        <v-card-title class="text-h6">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete the book
          <strong>{{ bookToDelete?.name }}</strong>?
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
