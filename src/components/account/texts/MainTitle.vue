<template>
    <p class="title">
        <slot name="main-title"/>
    </p>
</template>
<style scoped>
.title {
    color: var(--vt-c-second-bg-color);
    font-family: Montserrat;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 42px */
}
</style>
