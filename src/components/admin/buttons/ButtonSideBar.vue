<script setup>
import { ref } from 'vue'
const isHover = ref(false)
</script>
<template>
    <div class="btn"
    @mouseover="isHover = true"
    @mouseleave="isHover = false">
        <slot name="btn-icon" :hover="isHover" />
        <slot name="btn-text"></slot>
    </div>
</template>

<style scoped>
.btn {
    display: flex;
    width: 222px;
    height: 48px;
    padding: 12px 50px 14px 41px;
    align-items: flex-start;
    gap: 24.006px;
    flex-shrink: 0;
    background: var(--vt-c-second-bg-color);
    transition: background 0.3s ease;
    cursor: pointer;
}

.btn:hover {  
    border: 1px solid var(--vt-c-second-bg-color);
    background: var(--vt-c-main-bg-color); 
}

.btn:hover ::v-deep(.text) {  
    color: var(--vt-c-second-bg-color);
}
</style>