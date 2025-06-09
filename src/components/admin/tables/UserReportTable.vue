<script setup>
import { ref } from 'vue'
import { useUser } from '@/data/user'

const userStore = useUser()
const { users } = userStore


const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Opening Debt', key: 'opening_debt' },
  { title: 'Debt Increase', key: 'debt_increase' },
  { title: 'Debt Payment', key: 'deb_payment' },
  { title: 'Closing Debt', key: 'closing_debt' },
]

</script>

<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
      item-value="id"
      :items-per-page="-1"
      hide-default-footer
    >
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
</style>
