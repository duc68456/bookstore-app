<script setup>
import { ref } from 'vue'
import { useUser } from '@/data/user'
import ViewIcon from '@/assets/icons-vue/receipt.vue'
import EditIcon from '@/assets/icons-vue/edit.vue'
import DeleteIcon from '@/assets/icons-vue/trash.vue'

const userStore = useUser()
const { users } = userStore

const emit = defineEmits(['view-user', 'edit-user', 'delete-user'])

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Username', key: 'username' },
  { title: 'Role', key: 'role' },
  { title: 'Action', key: 'action', sortable: false },
]

const dialog = ref(false)
const userToDelete = ref(null)

const openDeleteDialog = (user) => {
  userToDelete.value = user
  dialog.value = true
}

const confirmDelete = () => {
  if (userToDelete.value) {
    userStore.deleteUser(userToDelete.value)
    emit('delete-user', userToDelete.value)
    dialog.value = false
    userToDelete.value = null
  }
}
</script>

<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
      item-value="id"
      :items-per-page="-1"
      hide-default-footer
    >
      <template #item.action="{ item }">
        <div class="action-icons">
          <v-tooltip text="View" location="top">
            <template #activator="{ props }">
              <div v-bind="props" @click="$emit('view-user', item)" style="cursor: pointer;">
                <ViewIcon />
              </div>
            </template>
          </v-tooltip>

          <v-tooltip text="Edit" location="top">
            <template #activator="{ props }">
              <div v-bind="props" @click="$emit('edit-user', item)" style="cursor: pointer;">
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

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="dialog" width="400" class="delete-dialog" persistent scroll-strategy="block">
      <v-card>
        <v-card-title class="text-h6">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete the user
          <strong>{{ userToDelete?.name }}</strong>?
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
  height: auto;
  border-radius: 20px;
  background: var(--vt-c-main-bg-color);
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
