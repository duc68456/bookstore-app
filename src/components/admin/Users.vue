<script setup>
import { ref } from 'vue'
import { useUser } from '@/data/user'

import TitleText from './texts/TitleText.vue'
import SearchFrame from '@/components/admin/frames/SearchFrame.vue'
import UserTable from '@/components/admin/tables/UserTable.vue'
import UserDetail from '@/components/admin/CRUDforms/UserDetail.vue'
import EditUser from '@/components/admin/CRUDforms/EditUser.vue'
import AddUser from '@/components/admin/CRUDforms/AddUser.vue'

import ButtonCRUD from './buttons/ButtonCRUD.vue'
import ButtonText from './texts/ButtonText.vue'

const userStore = useUser()
const searchQuery = ref('')

const selectedUser = ref(null)
const editingUser = ref(null)
const addingUser = ref(false)

const handleViewUser = (user) => selectedUser.value = user
const handleEditUser = (user) => editingUser.value = user
const handleAddUser = () => addingUser.value = true
const closeDetail = () => selectedUser.value = null
const closeAddUser = () => addingUser.value = false
const closeEdit = () => cancelEditDialog.value = true

const handleDeleteUser = (user) => userStore.deleteUser(user)
const updateUser = (updatedUser) => userStore.updateUser(updatedUser)
const addUser = (newUser) => {
  userStore.addUser(newUser)
  addingUser.value = false
}

// Dialog xác nhận hủy chỉnh sửa
const cancelEditDialog = ref(false)
const confirmCancelEdit = () => {
  editingUser.value = null
  cancelEditDialog.value = false
}
const cancelCancelEdit = () => cancelEditDialog.value = false
</script>

<template>
  <div style="overflow-y: auto;">
    <div v-if="addingUser" class="user-detail-full">
      <AddUser @close="closeAddUser" @add-user="addUser" />
    </div>

    <div v-else-if="!selectedUser && !editingUser" class="content">
      <div class="top-bar">
        <div class="left">
          <TitleText><template #text>User Management</template></TitleText>
        </div>
        <div class="right">
          <SearchFrame v-model="searchQuery" />
        </div>
      </div>

      <UserTable
        :search="searchQuery"
        @view-user="handleViewUser"
        @edit-user="handleEditUser"
        @delete-user="handleDeleteUser"
      />

      <ButtonCRUD @click="handleAddUser">
        <template #btn-text>
          <ButtonText><template #text>ADD USER</template></ButtonText>
        </template>
      </ButtonCRUD>
    </div>

    <div v-else-if="selectedUser && !editingUser" class="user-detail-full">
      <UserDetail :user="selectedUser" @close="closeDetail" />
    </div>

    <div v-else-if="editingUser" class="user-detail-full">
      <EditUser :user="editingUser" @close="closeEdit" @update-user="updateUser" />
    </div>
  </div>

  <!-- Dialog xác nhận hủy chỉnh sửa -->
  <v-dialog v-model="cancelEditDialog" width="400" class="delete-dialog" persistent scroll-strategy="block">
    <v-card>
      <v-card-title class="text-h6">Confirm Cancel</v-card-title>
      <v-card-text>
        Are you sure you want to cancel editing the user
        <strong>{{ editingUser?.name }}</strong>?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="grey" variant="text" @click="cancelCancelEdit">Cancel</v-btn>
        <v-btn color="var(--vt-c-second-bg-color)" variant="tonal" @click="confirmCancelEdit">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  padding: 20px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.left {
  display: flex;
  align-items: center;
}

.right {
  flex-shrink: 0;
  align-items: center;
}
</style>
