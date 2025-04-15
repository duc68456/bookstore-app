import ButtonWhite from './ButtonWhite.vue'
<template>
<div class="main-form">
    <i>
        <slot name="logo"></slot>
    </i>
    <p class="title">
        <slot name="title"></slot>
    </p>
    <p>
        <slot name="note"></slot>
    </p>
    <slot name="frame1"></slot>
    <slot name="frame2"></slot>
    <ButtonWhite/>
</div>
</template>
<style scoped>
.logo {
    color: var(--vt-c-second-bg-color);
    font-family: Montserrat;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 42px */
}
.main-form {
    width: 930px;
    height: 575px;
    background-color: var(--vt-c-main-bg-color);
    display: flex;
    position: relative;
}
.title {
    color: #000;
    font-family: Montserrat;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 42px */
}
</style>