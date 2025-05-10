<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ButtonManage from '../buttons/ButtonManage.vue'
import CRUDMainForm from '../CRUDForms/CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import EntryFormTable from '../tables/EntryFormTable.vue'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
import ButtonText from '../texts/ButtonText.vue'
const router = useRouter()

const entryList = ref([
  { id: 'E1', time: '09:00 AM', total: '$150.00' },
  { id: 'E2', time: '10:15 AM', total: '$200.00' },
  { id: 'E3', time: '11:30 AM', total: '$320.00' }
])
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
            <template #content>
              <EntryFormTable :entries="entryList" />

              <ButtonCRUD @click="handleAddBook">
                <template #btn-text>
                  <ButtonText><template #text>ADD BOOK ENTRY</template></ButtonText>
                </template>
              </ButtonCRUD>
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