<template>
  <v-dialog v-model="visible" max-width="400">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn v-if="showCancel" text color="grey" @click="cancel">Cancel</v-btn>
        <v-btn text color="primary" @click="confirm">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  title: String,
  message: String,
  showCancel: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const visible = ref(props.modelValue)

watch(() => props.modelValue, val => {
  visible.value = val
})

function confirm() {
  visible.value = false
  emit('update:modelValue', false)
  emit('confirm')
}

function cancel() {
  visible.value = false
  emit('update:modelValue', false)
  emit('cancel')
}
</script>
