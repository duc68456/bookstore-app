<script setup>
import { ref } from 'vue'
import TitleText from './texts/TitleText.vue'
import SearchFrame from '@/components/admin/frames/SearchFrame.vue'
import UserTable from '@/components/admin/tables/UserTable.vue'
import UserDetail from '@/components/admin/CRUDforms/UserDetail.vue'
import EditUser from '@/components/admin/CRUDforms/EditUser.vue'

const selectedUser = ref(null)

const handleViewUser = (user) => {
  selectedUser.value = user
}

const closeDetail = () => {
  selectedUser.value = null
}

const editingUser = ref(null)

const handleEditUser = (user) => {
  editingUser.value = user
}

const closeEdit = () => {
  editingUser.value = null
}
</script>

<template>
  <div style="overflow-y: auto;">
    <div v-if="!selectedUser && !editingUser" class="content">
      <div class="top-bar">
        <div class="left">
          <TitleText>
            <template #text>
              User Management
            </template>
          </TitleText>
        </div>
        <div class="right">
          <SearchFrame />
        </div>
      </div>

      <UserTable @view-user="handleViewUser"  @edit-user="handleEditUser" />
    </div>

    <div v-else-if="selectedUser && !editingUser" class="user-detail-full">
      <UserDetail :user="selectedUser" @close="closeDetail" />
    </div>

    <div v-else-if="editingUser" class="user-detail-full">
      <EditUser :user="editingUser" @close="closeEdit" />
    </div>
    
  </div>
</template>

<style scoped>
.content, .handleViewUser {
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