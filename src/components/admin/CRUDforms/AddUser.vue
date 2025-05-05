<script setup>
import { reactive } from 'vue'
import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import FrameRU from '../frames/FrameRU.vue'
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
          <FrameRU v-model="newUser.name">
            <template #text-above>
              <FrameText><template #text>Name</template></FrameText>
            </template>
          </FrameRU>
          <FrameRU v-model="newUser.email">
            <template #text-above>
              <FrameText><template #text>Email</template></FrameText>
            </template>
          </FrameRU>
          <FrameRU v-model="newUser.username">
            <template #text-above>
              <FrameText><template #text>Username</template></FrameText>
            </template>
          </FrameRU>
          <FrameRU v-model="newUser.dob">
            <template #text-above>
              <FrameText><template #text>Day Of Birth</template></FrameText>
            </template>
          </FrameRU>
          <FrameRU v-model="newUser.phone">
            <template #text-above>
              <FrameText><template #text>Phone</template></FrameText>
            </template>
          </FrameRU>

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
