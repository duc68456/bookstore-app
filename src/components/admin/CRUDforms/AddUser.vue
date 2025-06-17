<script setup>
import { reactive } from 'vue'
import { useUser } from '@/data/user'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
import DatePickerFrame from '../frames/DatePickerFrame.vue'
import FrameRU from '../frames/FrameRU.vue'
import ButtonText from '../texts/ButtonText.vue'
import TitleText from '../texts/TitleText.vue'
import CRUDMainForm from './CRUDMainForm.vue'

const emit = defineEmits(['close', 'add-user'])
const store = useUser()

const newUser = reactive({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  dob: '',
  phone: '',
  role: '',
  password: '',
})

const handleAdd = async () => {
  if (store.loading) return
  const payload = {
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    username: newUser.username,
    dob: newUser.dob,
    phone: newUser.phone,
    roles: [newUser.role],
    password: newUser.password
  }
  const ok = await store.addUser({ ...payload })
  if (ok) {
    alert('User added successfully!')
    // Reset form...
    emit('close')
  } else {
    alert('Failed to add user!')
  }
}
</script>

<template>
  <div class="detail-wrapper">
    <CRUDMainForm title="Add User" :data="newUser" @close="$emit('close')">
      <template #title>
        <TitleText><template #text>Add User</template></TitleText>
      </template>

      <template #content>
        <div class="frame-wrapper">
          <FrameRU v-model="newUser.username" placeholder="Username" />
          <FrameRU v-model="newUser.password" placeholder="Password" />
          <FrameRU v-model="newUser.firstName" placeholder="Firstname" />
          <FrameRU v-model="newUser.lastName" placeholder="Lastname" />
          <FrameRU v-model="newUser.email" placeholder="Email" />

          <DatePickerFrame v-model="newUser.dob" placeholder="DOB" />
          <FrameRU v-model="newUser.phone" placeholder="Phone" />


          <ButtonCRUD @click="handleAdd">
            <template #btn-text>
              <ButtonText><template #text>ADD</template></ButtonText>
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
