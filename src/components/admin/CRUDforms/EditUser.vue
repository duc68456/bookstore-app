<script setup>
import { reactive } from 'vue'
import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import FrameRU from '../frames/FrameRU.vue'
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
          <FrameRU v-model="editedUser.name">
            <template #text-above>
              <FrameText><template #text>Name</template></FrameText>
            </template>
          </FrameRU>

          <FrameRU v-model="editedUser.email">
            <template #text-above>
              <FrameText><template #text>Email</template></FrameText>
            </template>
          </FrameRU>

          <FrameRU v-model="editedUser.username">
            <template #text-above>
              <FrameText><template #text>Username</template></FrameText>
            </template>
          </FrameRU>

          <FrameRU v-model="editedUser.dob">
            <template #text-above>
              <FrameText><template #text>Day Of Birth</template></FrameText>
            </template>
          </FrameRU>

          <FrameRU v-model="editedUser.phone">
            <template #text-above>
              <FrameText><template #text>Phone</template></FrameText>
            </template>
          </FrameRU>

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
