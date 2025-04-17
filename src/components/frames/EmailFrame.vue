<script setup>
defineProps({
  modelValue: String,
  placeholder: String
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="email-frame">
    <input type="email" class="email-input" :placeholder="placeholder" :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<style scoped>
.email-frame {
  width: 220px;
  display: flex;
  align-items: center;
}

.email-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #3D3E3E;
  background: var(--vt-c-main-bg-color);

  font-family: Montserrat;
  font-size: 12px;
  outline: none;
  transition: border-color 0.3s ease;
}

.email-input:hover {
  border-color: #727374;
  /* Selection color khi hover */
}
</style>
