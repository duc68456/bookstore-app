<script setup>
import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import FrameRU from '../frames/FrameRU.vue'
import FrameText from '../texts/FrameText.vue'
import DateFrame from '../frames/DateFrame.vue'

defineProps(['user'])
</script>

<template>
  <div class="detail-wrapper">
    <CRUDMainForm title="User Detail" :data="user" @close="$emit('close')">
      <template #title>
        <TitleText>
          <template #text>
            User Detail
          </template>
        </TitleText>
      </template>

      <template #content>
        <div class="frame-wrapper">
          <FrameRU readonly v-model="user.name" placeholder="Name" />
          <FrameRU readonly v-model="user.email" placeholder="Email" />
          <FrameRU readonly v-model="user.username" placeholder="Username" />
          <DateFrame readonly v-model="user.dob" placeholder="DOB" />
          <FrameRU readonly v-model="user.phone" placeholder="Phone" />
          <FrameRU readonly v-model="user.role" placeholder="Role" />
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
