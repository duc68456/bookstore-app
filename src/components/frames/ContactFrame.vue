<script setup>
defineProps({
  modelValue: String,
  placeholder: String
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="contact-frame">
    <input type="text" class="contact-input" :placeholder="placeholder" :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<style scoped>
.contact-frame {
  width: 170px;
  display: flex;
  align-items: center;
}

.contact-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #3D3E3E;
  background: var(--vt-c-main-bg-color);

  font-family: Montserrat;
  font-size: 12px;
  outline: none;
}
</style>
