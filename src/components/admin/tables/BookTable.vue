<script setup>
import EditIcon from '@/assets/icons-vue/edit.vue'
import ViewIcon from '@/assets/icons-vue/receipt.vue'
import DeleteIcon from '@/assets/icons-vue/trash.vue'
import { useBook } from '@/data/book'
import { computed, ref } from 'vue'

const book = useBook()
const props = defineProps({
  items: Array,
  fullBookDetails: Object,
  showActions: { type: Boolean, default: true },
  showQuantity: { type: Boolean, default: true },
  showPrice:    { type: Boolean, default: true },
})
const emit = defineEmits(['view-book','edit-book','delete-book'])

const dialog = ref(false)
const toDelete = ref(null)
function openDelete(item) {
  toDelete.value = item; dialog.value = true
}
function confirmDelete() {
  emit('delete-book', toDelete.value.id)
  dialog.value = false
}

const rawHeaders = [
  { title: 'ID',         key: 'id' },
  { title: 'Title',      key: 'title' },
  { title: 'Authors',    key: 'authors' },
  { title: 'Categories', key: 'categories' },
  { title: 'Quantity',   key: 'quantity' },
  { title: 'Price',      key: 'import_price' },
  { title: 'Action',     key: 'action', sortable: false },
]
const headers = computed(() => rawHeaders.filter(h => {
  if (h.key==='action' && !props.showActions) return false
  if (h.key==='quantity' && !props.showQuantity) return false
  if (h.key==='import_price' && !props.showPrice) return false
  return true
}))
</script>

<template>
  <v-container fluid>
    <div style="max-height:70vh; overflow-y:auto;">
      <v-data-table
        :headers="headers"
        :items="items"
        item-value="id"
        :items-per-page="-1"
        hide-default-footer
      >
        <template #item.authors="{ item }">
          <span>{{ item.authors.join(', ') }}</span>
        </template>
        <template #item.categories="{ item }">
          <span>{{ item.categories.join(', ') }}</span>
        </template>
        <template #item.action="{ item }">
          <div class="action-icons">
            <v-tooltip text="View"><template #activator="{ props }">
              <div v-bind="props" @click="$emit('view-book', item.id)"><ViewIcon/></div>
            </template></v-tooltip>
            <v-tooltip text="Edit"><template #activator="{ props }">
              <div v-bind="props" @click="$emit('edit-book', item.id)"><EditIcon/></div>
            </template></v-tooltip>
            <v-tooltip text="Delete"><template #activator="{ props }">
              <div v-bind="props" @click="openDelete(item)" style="cursor: pointer"><DeleteIcon/></div>
            </template></v-tooltip>
          </div>
        </template>
      </v-data-table>
    </div>

    <v-dialog v-model="dialog" width="400" persistent>
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="dialog=false">Cancel</v-btn>
          <v-btn @click="confirmDelete">Delete</v-btn>
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
