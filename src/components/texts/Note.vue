<template>
    <p class="title">
        <slot name="note"/>
    </p>
</template>
<style scoped>
.title {
    color: var(--vt-c-second-bg-color);
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 16.8px */
}
</style>
