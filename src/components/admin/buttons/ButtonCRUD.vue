<template>
    <div class="btn">
        <slot name="btn-text"></slot>
    </div>
</template>

<style scoped>
    .btn {
        display: flex;
        width: 259px;
        height: 54px;
        padding: 16px 10px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: 10px;
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