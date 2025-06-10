<script setup>
import { ref } from 'vue'
import { useBook } from '@/data/book'
import TitleText from './texts/TitleText.vue'
import BookReportTable from './tables/BookReportTable.vue'
import UserReportTable from './tables/UserReportTable.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const book = useBook()
const bookMonth = ref(new Date())
const userMonth = ref(new Date())
</script>

<template>
  <div style="overflow-y: auto;" class="content">
    <div class="top-bar">
      <div class="left">
        <TitleText><template #text>Bookstore Report</template></TitleText>
      </div>
    </div>
    <div class="table-wrappers">
      <!-- Block Book Report -->
      <div class="table-block">
        <div class="month-picker-wrapper">
          <VueDatePicker
            v-model="bookMonth"
            month-picker
            :format="'MM/yyyy'"
          />
        </div>
        <BookReportTable :month="bookMonth" />
      </div>

      <!-- Block User Report -->
      <div class="table-block">
        <div class="month-picker-wrapper">
          <VueDatePicker
            v-model="userMonth"
            month-picker
            :format="'MM/yyyy'"
          />
        </div>
        <UserReportTable :month="userMonth" />
      </div>
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

.table-wrappers {
  display: flex;
  flex-direction: row;
  gap: 24px; /* Khoảng cách giữa 2 bảng */
}

.table-block {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;
  border-radius: 8px;
  padding: 16px;
}

.month-picker-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}
</style>
