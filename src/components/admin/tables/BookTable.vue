<script setup>
import { useBook } from '@/data/book'
import { computed, onMounted, ref } from 'vue'

import EditIcon from '@/assets/icons-vue/edit.vue'
import ViewIcon from '@/assets/icons-vue/receipt.vue'
import DeleteIcon from '@/assets/icons-vue/trash.vue'

const book = useBook()

const props = defineProps({
  showActions: { type: Boolean, default: true },
  showQuantity: { type: Boolean, default: true },
  showPrice:    { type: Boolean, default: true },
})
const emit = defineEmits(['view-book','edit-book','delete-book','select-book'])

onMounted(() => {
  book.fetchBooks()
  console.log(book.items)
})

const onRowClick = (bookRow) => {
  const selected = book.fullBookDetails[bookRow.id]
  emit('select-book', selected)
}

const dialog = ref(false)
const bookToDelete = ref(null)
const openDeleteDialog = (item) => {
  bookToDelete.value = item
  dialog.value = true
}
const confirmDelete = () => {
  emit('delete-book', bookToDelete.value)
  dialog.value = false
  bookToDelete.value = null
}

const rawHeaders = [
  { title: 'ID',           key: 'id' },
  { title: 'Title',        key: 'title' },
  { title: 'Categories',   key: 'categories' },
  { title: 'Quantity',     key: 'quantity' },
  { title: 'Import Price', key: 'import_price' },
  { title: 'Action',       key: 'action', sortable: false },
]
const headers = computed(() => rawHeaders.filter(h => {
  if (h.key === 'action' && !props.showActions) return false
  if (h.key === 'quantity' && !props.showQuantity) return false
  if (h.key === 'import_price' && !props.showPrice) return false
  return true
}))
</script>

<template>
  <v-container fluid>
    <!-- chỉ 1 thanh cuộn -->
    <div style="max-height: 70vh; overflow-y: auto;">
      <v-data-table
        :headers="headers"
        :items="book.items"
        class="elevation-1"
        item-value="id"
        :items-per-page="-1"
        hide-default-footer
      >
        <!-- Action icons -->
        <template #item.action="{ item }">
          <div class="action-icons">
            <v-tooltip text="View" location="top">
              <template #activator="{ props }">
                <div
                  v-bind="props"
                  style="cursor: pointer;"
                  @click="$emit('view-book', item.id)"
                >
                  <ViewIcon />
                </div>
              </template>
            </v-tooltip>

            <v-tooltip text="Edit" location="top">
              <template #activator="{ props }">
                <div
                  v-bind="props"
                  style="cursor: pointer;"
                  @click="$emit('edit-book', item.id)"
                >
                  <EditIcon />
                </div>
              </template>
            </v-tooltip>

            <v-tooltip text="Delete" location="top">
              <template #activator="{ props }">
                <div
                  v-bind="props"
                  style="cursor: pointer;"
                  @click="openDeleteDialog(item)"
                >
                  <DeleteIcon />
                </div>
              </template>
            </v-tooltip>
          </div>
        </template>

        <!-- Categories hiển thị trực tiếp -->
        <template #item.categories="{ item }">
          <span>{{ item.categories.join(', ') }}</span>
        </template>
      </v-data-table>
    </div>

    <!-- Delete confirm dialog -->
    <v-dialog v-model="dialog" width="400" class="delete-dialog" persistent>
      <v-card>
        <v-card-title class="text-h6">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete the book
          <strong>{{ bookToDelete?.title }}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="grey" variant="text" @click="dialog = false">Cancel</v-btn>
          <v-btn color="var(--vt-c-second-bg-color)" variant="tonal" @click="confirmDelete">
            Delete
          </v-btn>
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
  color: var(--vt-c-second-bg-color);
}
.action-icons {
  display: flex;
  gap: 12px;
}
.delete-dialog .v-card {
  width: 25vw;
  border-radius: 20px;
  background: var(--vt-c-main-bg-color);
}
</style>
