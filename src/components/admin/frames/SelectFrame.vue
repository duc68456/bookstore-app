<script setup>
const props = defineProps({
  modelValue: [String, Object, Number, null],
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  },
  optionLabelKey: {
    type: String,
    default: 'name'
  },
  optionValueKey: {
    type: String,
    default: 'id'
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

function handleChange(event) {
  const selectedId = event.target.value;
  // Tìm object tương ứng từ options dựa vào id
  const selectedObject = props.options.find(opt => opt[props.optionValueKey] == selectedId);
  emit('update:modelValue', selectedObject);
}
</script>

<template>
  <div class="frame-select">
    <select
      :disabled="readonly"
      :value="modelValue ? modelValue[optionValueKey] : ''"
      @change="handleChange"
      class="select-box"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option
        v-for="(opt, index) in options"
        :key="index"
        :value="opt[optionValueKey]"
      >
        {{ typeof opt === 'object' ? opt[optionLabelKey] : opt }}
      </option>
    </select>
  </div>
</template>


<style scoped>
.frame-select {
  display: flex;
  align-items: center;
}

.select-box {
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

.select-box:hover {
  border-color: #727374;
}
</style>
