<template>
  <v-container fluid>
    <!-- Search field -->
    <v-text-field
      v-model="searchQuery"
      label="Tìm kiếm người dùng"
      clearable
      class="mb-4"
    />

    <!-- Table wrapper với scroll -->
    <div class="table-wrapper">
      <v-data-table
        :headers="headers"
        :items="filteredUsers"
        class="elevation-1"
        item-value="id"
        :items-per-page="-1"
        hide-default-footer
      >
        <template #item.action="{ item }">
          <div class="action-icons">
            <v-tooltip text="View" location="top">
              <template #activator="{ props }">
                <div v-bind="props" @click="emit('view-user', item)" style="cursor: pointer;">
                  <ViewIcon />
                </div>
              </template>
            </v-tooltip>
            <v-tooltip text="Edit" location="top">
              <template #activator="{ props }">
                <div v-bind="props" @click="emit('edit-user', item)" style="cursor: pointer;">
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
    </div>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="dialog" width="400" class="delete-dialog" persistent scroll-strategy="block">
      <v-card>
        <v-card-title class="text-h6">Xác nhận xóa</v-card-title>
        <v-card-text>
          Bạn có chắc chắn muốn xóa người dùng
          <strong>{{ userToDelete?.name }}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="dialog = false">Hủy</v-btn>
          <v-btn color="var(--vt-c-second-bg-color)" variant="tonal" @click="confirmDelete">Xóa</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import EditIcon from '@/assets/icons-vue/edit.vue'
import ViewIcon from '@/assets/icons-vue/receipt.vue'
import DeleteIcon from '@/assets/icons-vue/trash.vue'
import { useUser } from '@/data/user'
import { ref } from 'vue'

// Pinia store
const userStore = useUser()
const { filteredUsers, searchQuery, fetchUsers, deleteUser } = userStore

// Gọi fetchUsers ngay lập tức khi setup
fetchUsers()

// Emits
const emit = defineEmits(['view-user', 'edit-user', 'delete-user'])

// State cho dialog xóa
const dialog = ref(false)
const userToDelete = ref(null)

function openDeleteDialog(user) {
  userToDelete.value = user
  dialog.value = true
}

function confirmDelete() {
  if (userToDelete.value) {
    deleteUser(userToDelete.value)
    emit('delete-user', userToDelete.value)
    dialog.value = false
    userToDelete.value = null
  }
}

// Header cho table
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Username', key: 'username' },
  { title: 'Role', key: 'role' },
  { title: 'Action', key: 'action', sortable: false }
]
</script>

<style scoped>
/* Wrapper cho scroll */
.table-wrapper {
  max-height: 60vh;        /* chiều cao tối đa */
  overflow-y: auto;        /* bật scroll dọc */
}

.v-data-table {
  background-color: var(--vt-c-main-bg-color);
  border-radius: 12px;
  padding: 12px;
  font-family: Montserrat;
  font-size: 15px;
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
