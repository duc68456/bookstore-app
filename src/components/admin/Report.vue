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
      <div class="table-block">
        <div class="month-picker-wrapper">
          <VueDatePicker
            class="month-picker"
            v-model="bookMonth"
            month-picker
            :format="'MM/yyyy'"
            :clearable="false"
          />
        </div>
        <BookReportTable :month="bookMonth" />
      </div>

      <div class="table-block">
        <div class="month-picker-wrapper">
          <VueDatePicker
            class="month-picker"
            v-model="userMonth"
            month-picker
            :format="'MM/yyyy'"
            :clearable="false"
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
}

.table-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 12px;
  border-radius: 8px;
}

.month-picker-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}

.month-picker {
}

:deep(.month-picker .dp__input) {
  background-color: var(--vt-c-main-bg-color);
  font-family: Montserrat;
  font-size: 15px;
  font-style: normal;
  width: 130px;
  text-align: center;
  color: var(--vt-c-second-bg-color);
}

</style>
