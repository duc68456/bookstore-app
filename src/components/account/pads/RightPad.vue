<template>
<div class="window">
    <div class="slot"><slot name="logo"></slot></div>
    <div class="slot"><slot name="small-text"></slot></div>
    <div class="slot"><slot name="big-text"></slot></div>
    <div class="slot"><slot name="button"></slot></div>
</div>
</template>
<style scoped>
.window {
    width: 469px;
    height: 575px;
    flex-shrink: 0;
    border-radius: 40px 0px 0px 40px;
    background: var(--vt-c-second-bg-color);
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2; /* Add z-index to ensure it's above other elements */
}

.slot {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 5%;
    margin-bottom: 5%; 
}
</style>
