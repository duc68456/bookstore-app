<template>
    <p class="title">
        <slot name="note"/>
    </p>
</template>
<style scoped>
.title {
    color: var(--vt-c-main-bg-color);
    font-family: Montserrat;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 18.2px */
}
</style>
