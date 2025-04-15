<template>
    <p class="text">
        <slot name="btnText"></slot>
    </p>
</template>
<style scoped>
.text {
    color: var(--vt-c-main-bg-color);
    font-family: Montserrat;
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 18.2px */
}
</style>