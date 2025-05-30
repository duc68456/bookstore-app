<script setup>
import { reactive } from 'vue'
import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import FrameRU from '../frames/FrameRU.vue'
import DatePickerFrame from '../frames/DatePickerFrame.vue'
import FrameText from '../texts/FrameText.vue'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
import ButtonText from '../texts/ButtonText.vue'

const emit = defineEmits(['close', 'add-user'])

const newUser = reactive({
  name: '',
  email: '',
  username: '',
  dob: '',
  phone: ''
})

const handleAdd = () => {
  emit('add-user', newUser)
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
          <FrameRU v-model="newUser.name" placeholder="Name" />
          <FrameRU v-model="newUser.email" placeholder="Email" />
          <FrameRU v-model="newUser.username" placeholder="Username" />
          <DatePickerFrame v-model="newUser.dob" placeholder="DOB" />
          <FrameRU v-model="newUser.phone" placeholder="Phone" />
          <FrameRU v-model="newUser.role" placeholder="Role" />

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
