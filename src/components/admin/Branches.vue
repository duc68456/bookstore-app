<script setup>
import TitleText from './texts/TitleText.vue'
import SearchFrame from './frames/SearchFrame.vue'
import BranchesTable from './tables/BranchesTable.vue'

</script>

<template>
  <div class="content">
    <div class="top-bar">
      <div class="left">
        <TitleText>
          <template #text>
            Branch Management
          </template>
        </TitleText>
      </div>
      <div class="right">
        <SearchFrame />
      </div>
    </div>

    <BranchesTable />
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
  align-items: center;
}

.right {
  flex-shrink: 0;
}
</style>
