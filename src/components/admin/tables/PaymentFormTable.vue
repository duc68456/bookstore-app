<script setup>
import { ref } from 'vue'
import ButtonCRUD from '../buttons/ButtonCRUD.vue'
import ButtonText from '../texts/ButtonText.vue'

defineProps({
  customers: Array
})

const emit = defineEmits(['process-payment'])

const dialog = ref(false)
const customerToProcess = ref(null)

const openPaymentDialog = (customer) => {
  customerToProcess.value = customer
  dialog.value = true
}

const confirmPayment = () => {
  emit('process-payment', customerToProcess.value)
  dialog.value = false
  customerToProcess.value = null
}

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Phone', key: 'phone' },
  { title: 'Current Debt', key: 'debt' },
  { title: 'Last Payment', key: 'lastPayment' },
  { title: 'Action', key: 'action', sortable: false }
]
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
      <template #item.action="{ item }">
        <div class="action-icons">
          <ButtonCRUD @click="openPaymentDialog(item)" class="pay-button">
            <template #btn-text>
              <ButtonText><template #text>PAY</template></ButtonText>
            </template>
          </ButtonCRUD>
        </div>
      </template>
    </v-data-table>

    <!-- Payment confirmation dialog -->
    <v-dialog v-model="dialog" width="400" class="payment-dialog" persistent scroll-strategy="block">
      <v-card>
        <v-card-title class="text-h6">Process Payment</v-card-title>
        <v-card-text>
          Process payment for <strong>{{ customerToProcess?.name }}</strong>?
          <br>
          Current debt: <strong>{{ customerToProcess?.debt }}</strong>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="dialog = false">Cancel</v-btn>
          <v-btn color="var(--vt-c-second-bg-color)" variant="tonal" @click="confirmPayment">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

.action-icons {
  display: flex;
  justify-content: center;
}

.payment-dialog .v-card {
  width: 25vw;
  height: 25vh;
  border-radius: 50px;
  background: var(--vt-c-main-bg-color);
  align-items: center;
}

.payment-dialog .v-card-title {
  color: var(--vt-c-second-bg-color);
  font-weight: bold;
  text-align: center;
}

.payment-dialog .v-card-text {
  font-size: 16px;
  color: var(--vt-c-second-bg-color);
}

.pay-button {
  width: 100%;
}
</style>
