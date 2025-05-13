<script setup>
defineProps({
  modelValue: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  },
  readonly: {
    type: Boolean,
    default: false
  }
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="name-frame">
    <input :readonly="readonly" :type="type" :placeholder="placeholder" :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" class="input-box" />
  </div>
</template>

<style scoped>
.name-frame {
  display: flex;
  align-items: center;
}

.input-box {
  width: 441px;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #3D3E3E;
  background: var(--vt-c-main-bg-color);

  font-family: Montserrat;
  font-size: 12px;
  outline: none;
  transition: border-color 0.3s ease;
}

.input-box:hover {
  border-color: #727374;
  /* selection color khi hover */
}
</style>
