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
        flex-shrink: 0;border-radius: 15px;
        background: var(--vt-c-second-bg-color);
    }
</style>