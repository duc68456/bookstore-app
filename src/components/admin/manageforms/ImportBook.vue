<script setup>
import { useRouter } from 'vue-router'
import ButtonManage from '../buttons/ButtonManage.vue'
import CRUDMainForm from '../CRUDForms/CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
const router = useRouter()

function goBack() {
  router.push('/manage')
}
</script>
<template>
    <div class="detail-wrapper">
        <CRUDMainForm @close="goBack">
            <template #title>
                <TitleText><template #text>Import Book</template></TitleText>
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
</style>