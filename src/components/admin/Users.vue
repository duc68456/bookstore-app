<script setup>
import { ref } from 'vue'
import TitleText from './texts/TitleText.vue'
import SearchFrame from '@/components/admin/frames/SearchFrame.vue'
import UserTable from '@/components/admin/tables/UserTable.vue'
import UserDetail from '@/components/admin/CRUDforms/UserDetail.vue'
import EditUser from '@/components/admin/CRUDforms/EditUser.vue'
import AddUser from '@/components/admin/CRUDforms/AddUser.vue' // Thêm dòng này

import ButtonCRUD from './buttons/ButtonCRUD.vue' // Thêm dòng này
import ButtonText from './texts/ButtonText.vue'   // Thêm dòng này

// Danh sách mock users
const users = ref([
  {
    id: '1',
    name: 'Prabath Jayasuriya',
    email: 'prabathjaylk@gmail.com',
    username: 'prabathjay',
    dob: '01/01/2005',
    phone: '0123456789'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    dob: '02/02/2000',
    phone: '0987654321'
  }
])

const selectedUser = ref(null)
const editingUser = ref(null)
const addingUser = ref(false)

const handleViewUser = (user) => selectedUser.value = user
const handleEditUser = (user) => editingUser.value = user
const handleAddUser = () => addingUser.value = true

const closeDetail = () => selectedUser.value = null
const closeEdit = () => editingUser.value = null
const closeAddUser = () => addingUser.value = false

const handleDeleteUser = (user) => {
  users.value = users.value.filter(u => u.id !== user.id)
}

const updateUser = (updatedUser) => {
  const index = users.value.findIndex(u => u.id === updatedUser.id)
  if (index !== -1) {
    users.value[index] = { ...updatedUser }
  }
}

const addUser = (newUser) => {
  const newId = String(users.value.length + 1)
  users.value.push({ ...newUser, id: newId })
  addingUser.value = false
}
</script>

<template>
  <div style="overflow-y: auto;">
    <div v-if="addingUser" class="user-detail-full">
      <AddUser @close="closeAddUser" @add-user="addUser" />
    </div>

    <div v-else-if="!selectedUser && !editingUser" class="content">
      <div class="top-bar">
        <div class="left">
          <TitleText>
            <template #text>User Management</template>
          </TitleText>
        </div>
        <div class="right">
          <SearchFrame />
        </div>
      </div>

      <UserTable :users="users" @view-user="handleViewUser" @edit-user="handleEditUser"
        @delete-user="handleDeleteUser" />

      <!-- Nút ADD USER -->
      <ButtonCRUD @click="handleAddUser">
        <template #btn-text>
          <ButtonText>
            <template #text>ADD USER</template>
          </ButtonText>
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
