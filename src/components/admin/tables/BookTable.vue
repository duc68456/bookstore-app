<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { useBook } from '@/data/book' 

import ViewIcon from '@/assets/icons-vue/receipt.vue'
import EditIcon from '@/assets/icons-vue/edit.vue'
import DeleteIcon from '@/assets/icons-vue/trash.vue'

const book = useBook()

const props = defineProps({
  showActions: {
    type: Boolean,
    default: true
  },
  showQuantity: {
    type: Boolean,
    default: true
  },
  showPrice: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['view-book', 'edit-book', 'delete-book', 'select-book'])

const onRowClick = (bookRow) => {
  const selected = book.fullBookDetails[bookRow.id]
  emit('select-book', selected)
}

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

const rawHeaders = [
  { title: 'ID', key: 'id' },
  { title: 'Title', key: 'title' },
  { title: 'Categories', key: 'categories' },
  { title: 'Quantity', key: 'quantity' },
  { title: 'Import Price', key: 'import_price' },
  { title: 'Action', key: 'action', sortable: false },
]

const headers = computed(() => {
  return rawHeaders.filter(h => {
    if (h.key === 'action' && !props.showActions) return false
    if (h.key === 'quantity' && !props.showQuantity) return false
    if (h.key === 'import_price' && !props.showPrice) return false
    return true
  })
})


</script>

<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="book.items" class="elevation-1" item-value="id" :items-per-page="-1"
    @click:row="onRowClick"
      hide-default-footer>
      <template v-if="props.showActions" #item.action="{ item }">
        <div class="action-icons">
          <v-tooltip text="View" location="top">
            <template #activator="{ props }">
              <div v-bind="props" @click="$emit('view-book', book.fullBookDetails[item.id])" style="cursor: pointer;">
                <ViewIcon />
              </div>
            </template>
          </v-tooltip>

          <v-tooltip text="Edit" location="top">
            <template #activator="{ props }">
              <div v-bind="props" @click="$emit('edit-book', book.fullBookDetails[item.id])" style="cursor: pointer;">
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

      <template #item.categories="{ item }">
        <span>{{ book.fullBookDetails[item.id]?.categories.join(', ') }}</span>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" width="400" class="delete-dialog" persistent scroll-strategy="block">
      <v-card>
        <v-card-title class="text-h6">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete the book
          <strong>{{ bookToDelete?.title }}</strong>?
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
