<script setup>
import { computed, ref } from 'vue'
import { useBook } from '@/data/book'
import EditIcon from '@/assets/icons-vue/edit.vue'
import ViewIcon from '@/assets/icons-vue/receipt.vue'
import DeleteIcon from '@/assets/icons-vue/trash.vue'

const bookStore = useBook()

const props = defineProps({
  items: Array,
  fullBookDetails: Object,
  showActions: { type: Boolean, default: true },
  showQuantity: { type: Boolean, default: true },
  showPrice: { type: Boolean, default: true }
})

const emit = defineEmits(['view-book', 'edit-book', 'delete-book'])

const dialog = ref(false)
const toDelete = ref(null)

function openDelete(item) {
  toDelete.value = item
  dialog.value = true
}

function confirmDelete() {
  emit('delete-book', toDelete.value.id)
  dialog.value = false
}

const rawHeaders = [
  { title: 'ID', key: 'id' },
  { title: 'Title', key: 'title' },
  { title: 'Authors', key: 'authors' },
  { title: 'Categories', key: 'categories' },
  { title: 'Quantity', key: 'quantity' },
  { title: 'Price', key: 'import_price' },
  { title: 'Action', key: 'action', sortable: false }
]

const headers = computed(() => rawHeaders.filter(h => {
  if (h.key === 'action' && !props.showActions) return false
  if (h.key === 'quantity' && !props.showQuantity) return false
  if (h.key === 'import_price' && !props.showPrice) return false
  return true
}))
</script>

<template>
  <div class="table-wrapper">
    <v-data-table :headers="headers" :items="props.items" item-value="id" :items-per-page="-1" fixed-header height="600"
      class="elevation-1" hide-default-footer>
      <template #item.action="{ item }">
        <div class="action-icons">
          <v-tooltip text="View" location="top">
            <template #activator="{ props: tooltip }">
              <div v-bind="tooltip" @click="emit('view-book', item.id)" style="cursor: pointer;">
                <ViewIcon />
              </div>
            </template>
          </v-tooltip>

          <v-tooltip text="Edit" location="top">
            <template #activator="{ props: tooltip }">
              <div v-bind="tooltip" @click="emit('edit-book', item.id)" style="cursor: pointer;">
                <EditIcon />
              </div>
            </template>
          </v-tooltip>

          <v-tooltip text="Delete" location="top">
            <template #activator="{ props: tooltip }">
              <div v-bind="tooltip" @click="openDelete(item)" style="cursor: pointer;">
                <DeleteIcon />
              </div>
            </template>
          </v-tooltip>
        </div>
      </template>

      <template #item.categories="{ item }">
        <span>{{ fullBookDetails[item.id]?.categories?.join(', ') }}</span>
      </template>

      <template #item.authors="{ item }">
        <span>{{ fullBookDetails[item.id]?.authors?.join(', ') }}</span>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" width="400" persistent>
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="red" @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.table-wrapper {
  max-height: 66vh;
  overflow-y: auto;
}

.v-data-table {
  background-color: var(--vt-c-main-bg-color);
  border-radius: 12px;
  padding: 12px;
  font-family: Montserrat;
  font-size: 15px;
  color: var(--vt-c-second-bg-color);
}

::v-deep(.v-data-table__th) {
  background-color: var(--vt-c-main-bg-color) !important;
  color: var(--vt-c-second-bg-color) !important;
  font-weight: 600 !important;
}

::v-deep(.v-data-table-header__sort-btn) {
  color: var(--vt-c-second-bg-color) !important;
}

.action-icons {
  display: flex;
  gap: 12px;
}
</style>
