<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useEntryFormStore } from '@/data/entryForms'

import ButtonManage from '../buttons/ButtonManage.vue'
import CRUDMainForm from '../CRUDForms/CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import EntryFormTable from '../tables/EntryFormTable.vue'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
import ButtonText from '../texts/ButtonText.vue'
import EditEntryForm from '../CRUDforms/EditEntryForm.vue'

const router = useRouter()
const store = useEntryFormStore()

const entryList = computed(() => store.forms)

const editingEntry = ref(null)

function handleEdit(entry) {
  editingEntry.value = store.formDetails[entry.id]
  editingEntry.value = fullEntry
}

function handleAddBook() {
  store.addEntryForm({
    time: '01:00 PM',
    total: '$100.00'
  })
}

function closeEditForm() {
  editingEntry.value = null
}

function goBack() {
  router.push('/manage')
}
</script>

<template>
    <div v-if="!editingEntry" class="detail-wrapper">
      <CRUDMainForm @close="goBack">
        <template #title>
          <TitleText><template #text>Import Book</template></TitleText>
        </template>
        <template #content>
          <div class="scrollable-content">
          <EntryFormTable :entries="entryList" @edit-entry="handleEdit" />
          <ButtonCRUD @click="handleAddBook">
            <template #btn-text>
              <ButtonText><template #text>ADD BOOK ENTRY</template></ButtonText>
            </template>
          </ButtonCRUD>
          </div>
        </template>
      </CRUDMainForm>
    </div>

    <div v-else class="detail-wrapper">
      <EditEntryForm :entry="editingEntry" @close="closeEditForm" />
    </div>
</template>

<style scoped>

.scrollable-content {
  max-height: calc(100vh - 150px); 
  overflow-y: auto;
  padding-right: 12px;
}

.detail-wrapper {
  color: var(--vt-c-main-bg-color);
  width: 100%;
  padding: 12px;
  font-family: Montserrat;
}
</style>
