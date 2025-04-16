<template>
  <input class="text-input" type="text" :placeholder="placeholder" :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script setup>
defineProps({
  placeholder: {
    type: String,
    default: 'Nhập nội dung...'
  },
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.text-input::placeholder {
  color: #727374;
  font-family: Montserrat;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.text-input {
  all: unset;
  /* Reset hầu hết các style mặc định của input */
  color: #727374;
  font-family: Montserrat;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}
</style>
