<script setup>
import { useUser } from '@/data/user'
import { reactive } from 'vue'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
import DatePickerFrame from '../frames/DatePickerFrame.vue'
import FrameRU from '../frames/FrameRU.vue'
import ButtonText from '../texts/ButtonText.vue'
import TitleText from '../texts/TitleText.vue'
import CRUDMainForm from './CRUDMainForm.vue'
const props = defineProps(['user'])
const emit = defineEmits(['close', 'update-user'])

const editedUser = reactive({ ...props.user })
const userStore = useUser()
const handleEdit = async () => {
  try {
    // Gọi API update, trong đó có fetchUsers() để reload lại danh sách
    await userStore.updateUserAPI(editedUser.id, {
      firstName: editedUser.firstName,
      lastName:  editedUser.lastName,
      dob:        editedUser.dob,
      phone:      editedUser.phone,
      role:       editedUser.role
    })
    // Nếu updateUserAPI chưa fetch lại thì bạn có thể gọi thêm:
    // await userStore.fetchUsers()
  } catch (e) {
    console.error('Update failed', e)
  } finally {
    emit('close')
  }
}
</script>

<template>
  <div class="detail-wrapper">
    <CRUDMainForm title="Edit User" :data="editedUser" @close="$emit('close')">
      <template #title>
        <TitleText>
          <template #text>
            Edit User
          </template>
        </TitleText>
      </template>

      <template #content>
        <div class="frame-wrapper">
          <FrameRU v-model="editedUser.password" placeholder="Password" />
          <FrameRU v-model="editedUser.firstName" placeholder="First Name" />
          <FrameRU v-model="editedUser.lastName" placeholder="Last Name" />


          <DatePickerFrame v-model="editedUser.dob" placeholder="DOB" />
          <FrameRU v-model="editedUser.phone" placeholder="Phone" />
          <FrameRU v-model="editedUser.role" placeholder="Role" />

          <ButtonCRUD @click="handleEdit">
            <template #btn-text>
              <ButtonText>
                <template #text>EDIT</template>
              </ButtonText>
            </template>
          </ButtonCRUD>
        </div>
      </template>
    </CRUDMainForm>
  </div>
</template>

<style scoped>
.detail-wrapper {
  color: var(--vt-c-main-bg-color);
  width: 100%;
  height: 100%;
  padding: 12px;
  font-family: Montserrat;
}

.frame-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding: 5vh 0;
}
</style>
