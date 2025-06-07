<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  readonly: Boolean,
  placeholder: String,
  modelValue: Date
})

const emit = defineEmits(['update:modelValue'])

const menu = ref(false)
const isFocused = ref(false)

const shouldShowFloatingLabel = computed(() => {
  if (isFocused.value) return true
  if (!props.modelValue) return false
  if (typeof props.modelValue === 'string') return props.modelValue.length > 0
  if (props.modelValue instanceof Date) return true
  return false
})

const updateValue = (val) => {
  // Nếu val là string, convert sang Date
  let date = val
  if (typeof val === 'string') {
    // Nếu là "dd/MM/yyyy"
    const [day, month, year] = val.split('/')
    date = new Date(`${year}-${month}-${day}`)
  }
  emit('update:modelValue', date)
  menu.value = false
}



const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  isFocused.value = false
}

const formattedDate = computed(() => {
  if (!props.modelValue) return ''
  return new Date(props.modelValue).toLocaleDateString('vi-VN')
})
</script>

<template>
  <div class="wrapper">
    <div class="frame" :class="{ 'focused': shouldShowFloatingLabel }">
      <!-- Floating label -->
      <label 
        class="floating-label" 
        :class="{ 'active': shouldShowFloatingLabel }"
      >
        {{ placeholder }}
      </label>
      
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template #activator="{ props: menuProps }">
          <input 
            v-bind="menuProps"
            class="input" 
            type="text" 
            :readonly="false"
            :placeholder="shouldShowFloatingLabel ? '' : placeholder"
            :value="formattedDate"
            @focus="handleFocus"
            @blur="handleBlur"
            style="cursor: pointer;"
          />
        </template>
        
        <v-date-picker
          :model-value="modelValue"
          @update:model-value="updateValue"
          show-adjacent-months
        />
      </v-menu>
      
      <!-- Calendar icon -->
      <v-icon 
        class="calendar-icon"
        @click="menu = !menu"
      >
        mdi-calendar
      </v-icon>
    </div>
  </div>
</template>

<style scoped>
.frame {
  position: relative;
  display: flex;
  width: 441px;
  padding: 12px 16px;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid #3D3E3E;
  background-color: var(--vt-c-main-bg-color);
  transition: border-color 0.3s ease;
}

.frame.focused {
  border-color: var(--vt-c-second-bg-color); 
}

.input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 15px;
  font-family: Montserrat, sans-serif;
  color: #333;
  background: transparent;
  padding-top: 8px;
  cursor: pointer;
}

.floating-label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  font-family: Montserrat, sans-serif;
  color: #999;
  pointer-events: none;
  transition: all 0.3s ease;
  background-color: var(--vt-c-main-bg-color);
  padding: 0 4px;
}

.floating-label.active {
  top: 0;
  transform: translateY(-50%);
  font-size: 12px;
  color: var(--vt-c-second-bg-color); 
  font-weight: 500;
}

.calendar-icon {
  color: #666;
  cursor: pointer;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
