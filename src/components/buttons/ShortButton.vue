<template>
    <div class="btn">
        <slot name="btn-text"></slot>
    </div>
</template>

<style scoped>
.btn {
    display: flex;
    width: 185px;
    height: 42px;
    padding: 12px 60px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 15px;
    border: 1px solid var(--vt-c-main-bg-color);
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