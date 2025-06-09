<script setup>
import { ref, computed } from 'vue'
import { useBook } from '@/data/book' 

import TitleText from './texts/TitleText.vue'

import BookReportTable from './tables/BookReportTable.vue'
import UserReportTable from './tables/UserReportTable.vue'

const book = useBook()

</script>

<template>
  <div style="overflow-y: auto;" class="content">
    <div class="top-bar">
        <div class="left">
            <TitleText><template #text>Bookstore Report</template></TitleText>
        </div>
    </div>
    <div class="table-wrapper">
        <BookReportTable />
        <UserReportTable />
    </div>
  </div>
</template>


<style scoped>
.content {
  width: 100%;
  height: 100%;
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

.table-wrapper {
    display: flex;
    flex-direction: row;
}
</style>
