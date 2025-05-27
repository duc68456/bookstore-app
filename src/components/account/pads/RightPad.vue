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
    width: 100%; /* THAY ĐỔI: từ 469px thành 100% */
    height: 100%; /* THAY ĐỔI: từ 575px thành 100% */
    flex-shrink: 0;
    border-radius: 40px 0px 0px 40px;
    background: var(--vt-c-second-bg-color);
    /* LOẠI BỎ: margin-left: auto; */
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative; /* THÊM: để đảm bảo positioning đúng */
}

.slot {
    width: 80%; /* THAY ĐỔI: từ 100% thành 80% để có padding */
    display: flex;
    justify-content: center;
    margin-top: 3%; /* GIẢM: từ 5% thành 3% */
    margin-bottom: 3%; /* GIẢM: từ 5% thành 3% */
}
</style>
