<script setup>
import { ref } from 'vue'
import CatalogTable from './tables/CatalogTable.vue'
import CatalogTable2 from './tables/CatalogTable2.vue'
import BorrowButton from './buttons/BorrowButton.vue'
import SearchFrame from './frames/SearchFrame.vue'

const activeTab = ref('borrowed')
</script>

<template>
  <div class="content">
    <div class="top-bar">
      <div class="left">
        <BorrowButton 
          :active="activeTab === 'borrowed'" 
          variant="primary" 
          @click="activeTab = 'borrowed'"
        >
          <template #text>Borrowed Books</template>
        </BorrowButton>
        <BorrowButton 
          :active="activeTab === 'overdue'" 
          variant="secondary" 
          @click="activeTab = 'overdue'"
        >
          <template #text>Overdue Borrowers</template>
        </BorrowButton>
      </div>
      <div class="right">
        <SearchFrame />
      </div>
    </div>

    <!-- Bảng CatalogTable hoặc CatalogTable2 tùy theo tab active -->
    <div class="table-section">
      <CatalogTable v-if="activeTab === 'borrowed'" />
      <CatalogTable2 v-else />
    </div>
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  padding: 20px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.left {
  display: flex;
  gap: 16px;
}

.right {
  flex-shrink: 0;
}

.table-section {
  margin-top: 20px;
}
</style>
