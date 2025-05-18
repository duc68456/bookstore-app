<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  customers: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

// Loại bỏ cột Action và dialog không cần thiết
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Phone', key: 'phone' },
  { title: 'Current Debt', key: 'debt' },
  { title: 'Last Payment', key: 'lastPayment' }
]

// Tạo computed để xử lý v-model
const selected = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <v-container fluid>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="customers"
      class="elevation-1"
      item-value="id"
      :items-per-page="-1"
      hide-default-footer
      show-select
    >
      <!-- Có thể thêm template tùy chỉnh cho các cột nếu cần -->
      <template #item.debt="{ item }">
        <span :class="{'debt-highlight': parseFloat(item.debt.replace('$', '')) > 100}">
          {{ item.debt }}
        </span>
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped>
.v-data-table {
  background-color: var(--vt-c-main-bg-color);
  border-radius: 12px;
  padding: 12px;
  font-family: Montserrat;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  color: var(--vt-c-second-bg-color);
}

.debt-highlight {
  color: #d32f2f;
  font-weight: bold;
}
</style>
