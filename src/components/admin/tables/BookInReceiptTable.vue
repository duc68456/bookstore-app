<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import DeleteIcon from '@/assets/icons-vue/trash.vue'

const props = defineProps({
  books: {
    type: Array,
    required: true
  },
  showActions: {
    type: Boolean,
    default: true
  }
})

const dialog = ref(false)
const bookToDelete = ref(null)
const emit = defineEmits(['delete-book'])

const openDeleteDialog = (book) => {
  bookToDelete.value = book
  dialog.value = true
}

const confirmDelete = () => {
  emit('delete-book', bookToDelete.value)
  dialog.value = false
  bookToDelete.value = null
}

const headers = computed(() => [
  { title: 'ID', key: 'id' },
  { title: 'Title', key: 'title' },
  { title: 'Quantity', key: 'quantity' },
  { title: 'Import Price', key: 'import_price' },
  { title: 'Action', key: 'action', sortable: false },
])
</script>

<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="books"
      class="elevation-1"
      item-value="id"
      :items-per-page="-1"
      hide-default-footer
    >
      <template v-if="props.showActions" #item.action="{ item }">
        <div class="action-icons">
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
</style>
