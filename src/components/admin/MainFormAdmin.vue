<script setup>
</script>
<template>
    <div class="main-form">
        <slot name="side-bar"></slot>
        <slot name="top-bar"></slot>
        <slot name="main-content"></slot>
    </div>
</template>

<style scoped>
.main-form {
    display: flex;
    width: 100vw;
    height: 100vh;
    background: var(--vt-c-third-bg-color);
}
</style>