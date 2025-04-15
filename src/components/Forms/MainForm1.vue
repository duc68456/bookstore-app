<template>
    <div class="main-form">
        <slot name="pad-left"></slot>
        <slot name="pad-right"></slot>
    </div>
</template>

<style scoped>
    .main-form {
        width: 930px;
        height: 575px;
        background-color: var(--vt-c-main-bg-color);
        display: flex;
        position: relative;
    }
</style>