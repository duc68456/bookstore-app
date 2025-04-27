<script setup>
import SearchIcon from '@/assets/icons-vue/search-icon.vue'
</script>
<template>
  <div class="search-frame">
    <SearchIcon />
    <input class="search-input" type="text" placeholder="Search by ID" />
  </div>
</template>

<style scoped>
.search-frame {
  display: flex;
  align-items: center;
  width: 300px;
  height: 48px;
  padding: 0 16px;
  border-radius: 12px;
  border: 1px solid #E8E8E8;
  background-color: var(--vt-c-main-bg-color);
  gap: 15px;
}

.search-icon {
  font-size: 20px;
  color: #757575;
  margin-right: 8px;
}

.search-input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 15px;
  font-family: Montserrat, sans-serif;
  color: #333;
}
</style>
