<script setup>
import { ref, computed } from 'vue'
import { useUser } from '@/data/user' 

const user = useUser()

const props = defineProps({
  customers: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'select-payment'])

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Phone', key: 'phone' },
  { title: 'Current Debt', key: 'debt' },
]

const onRowClick = (paymentRow) => {
  emit('select-payment', paymentRow);
}

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
      :headers="headers"
      :items="customers"
      class="elevation-1"
      item-value="id"
      :items-per-page="-1"
      hide-default-footer
    >
      <template #item="{ item }">
        <tr @click="onRowClick(item)">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.debt }}</td>
        </tr>
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
