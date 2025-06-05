<script setup>
import { reactive } from 'vue'
import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import FrameRU from '../frames/FrameRU.vue'
import DatePickerFrame from '../frames/DatePickerFrame.vue'
import FrameText from '../texts/FrameText.vue'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
import ButtonText from '../texts/ButtonText.vue'

const props = defineProps(['user'])
const emit = defineEmits(['close', 'update-user'])

const editedUser = reactive({ ...props.user })

const handleEdit = () => {
  console.log('Edited user:', editedUser)
  emit('update-user', editedUser)
  emit('close')
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
          <FrameRU v-model="editedUser.name" placeholder="Name" />
          <FrameRU v-model="editedUser.email" placeholder="Email" />
          <FrameRU v-model="editedUser.username" placeholder="Username" />
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
