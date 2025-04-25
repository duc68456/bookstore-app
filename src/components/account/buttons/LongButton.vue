<template>
    <div class="btn">
        <slot name="btn-text"></slot>
    </div>
</template>

<style scoped>
    .btn {
        display: flex;
        width: 267px;
        height: 42px;
        padding: 12px 0px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: 15px;
        background: var(--vt-c-second-bg-color);
        transition: background 0.3s ease;
        transition: 0.3s ease-in-out;
        cursor: pointer;
    }

    .btn:hover {
        border: 1px solid var(--vt-c-second-bg-color);
        background: var(--vt-c-main-color); 
        letter-spacing: 0.3px;
    }
    .btn:hover ::v-deep(.text) {  
        color: var(--vt-c-second-bg-color);
    }
</style>