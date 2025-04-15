<template>
    <p class="title">
        <slot name="note"/>
    </p>
</template>
<style scoped>
.title {
    color: #000;
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 16.8px */
}
</style>
