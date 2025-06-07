<script setup>
import { ref, computed } from 'vue'

    const props = defineProps({
    readonly: Boolean,
    placeholder: String,
    modelValue: Date
})

const emit = defineEmits(['update:modelValue'])

const isFocused = ref(false)

    const shouldShowFloatingLabel = computed(() => {
    if (isFocused.value) return true
    if (!props.modelValue) return false
    if (typeof props.modelValue === 'string') return props.modelValue.length > 0
    if (props.modelValue instanceof Date) return true
    return (props.modelValue && props.modelValue.length > 0) || isFocused.value
})

const handleFocus = () => {
    isFocused.value = true
}

const handleBlur = () => {
    isFocused.value = false     
}

const displayValue = computed(() => {
    if (!props.modelValue) return ''
    const date = new Date(props.modelValue)
    if (isNaN(date)) return props.modelValue // fallback nếu không phải date hợp lệ
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
})

    const onInput = (val) => {
    const [day, month, year] = val.split('/')
    const parsed = new Date(`${year}-${month}-${day}`)
    if (!isNaN(parsed)) {
        emit('update:modelValue', parsed)
    } else {
        emit('update:modelValue', val)
    }
    }

</script>

<template>
<div class="wrapper">
    <div class="frame" :class="{ 'focused': shouldShowFloatingLabel }">
    <label 
        class="floating-label" 
        :class="{ 'active': shouldShowFloatingLabel }"
    >
        {{ placeholder }}
    </label>
    
    <input 
        class="input" 
        type="text" 
        :readonly="readonly" 
        :placeholder="shouldShowFloatingLabel ? '' : placeholder"
        :value="displayValue"
        @input="onInput($event.target.value)"
        @focus="handleFocus"
        @blur="handleBlur"
    />
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
padding-top: 8px; /* Tạo space cho floating label */
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

.wrapper {
display: flex;
flex-direction: column;
align-items: flex-start;
}
</style>
