<script setup>
import { useUser } from '@/data/user'
import { ref, onMounted } from 'vue'

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

// load danh sách khi mount
onMounted(userStore.fetchUsers)

// VIEW
function handleViewUser(user) {
  selectedUser.value = user
}
function closeDetail() {
  selectedUser.value = null
}

// ADD
function handleAddUser() {
  addingUser.value = true
}
function closeAddUser() {
  addingUser.value = false
}
function addUser(newUser) {
  // ... gọi API tạo user ở đây nếu cần
  addingUser.value = false
}

// EDIT
function handleEditUser(user) {
  editingUser.value = { ...user }
}
function closeEdit() {
  editingUser.value = null
}
async function handleUpdateUser(payload) {
  try {
    await userStore.updateUserAPI(payload.id, payload)
    editingUser.value = null
  } catch (e) {
    console.error('Cập nhật user thất bại', e.response?.data || e.message)
  }
}

// DELETE
async function handleDeleteUser(userId) {
  try {
    await userStore.deleteUserAPI(userId)
  } catch (e) {
    console.error('Xoá user thất bại', e.response?.data || e.message)
  }
}
</script>

<template>
  <div style="overflow-y: auto;">
    <!-- ADD -->
    <AddUser v-if="addingUser" @close="closeAddUser" @add-user="addUser" class="user-detail-full" />

    <!-- TABLE -->
    <div v-else-if="!selectedUser && !editingUser" class="content">
      <div class="top-bar">
        <TitleText class="left">
          <template #text>User Management</template>
        </TitleText>
        <SearchFrame v-model="searchQuery" class="right" />
      </div>

      <UserTable :search="searchQuery" @view-user="handleViewUser" @edit-user="handleEditUser"
        @delete-user="handleDeleteUser" />

      <ButtonCRUD @click="handleAddUser">
        <template #btn-text>
          <ButtonText><template #text>ADD USER</template></ButtonText>
        </template>
      </ButtonCRUD>
    </div>

    <!-- DETAIL -->
    <UserDetail v-else-if="selectedUser && !editingUser" :user="selectedUser" @close="closeDetail"
      class="user-detail-full" />

    <!-- EDIT -->
    <EditUser v-else-if="editingUser" :user="editingUser" @close="closeEdit" @update-user="handleUpdateUser"
      class="user-detail-full" />
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
