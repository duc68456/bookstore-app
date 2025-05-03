<template>
    <div class="btn">
        <slot name="btn-icon"></slot>
    </div>
</template>

<style scoped>
    .btn {
        width: 32px;
        height: 32px;
        flex-shrink: 0;
        justify-content: center;
        align-items: center;
        background-color: var(--vt-c-main-bg-color);
        border-radius: 10px;
        border: 1px solid var(--vt-c-second-bg-color);
        display: flex;
        padding-right: 1px;
    }

    .btn:hover {
        border: 1px solid var(--vt-c-second-bg-color);
        background: var(--vt-c-main-color); 
        letter-spacing: 0.3px;
        cursor: pointer;
    }
    .btn:hover ::v-deep(.text) {  
        color: var(--vt-c-second-bg-color);
    }
</style>