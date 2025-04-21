<script setup>
</script>
<template>
    <div class="main-form">
        <div class="side-bar">
            <slot name="side-bar"></slot>
        </div>
        <div class="main-content-area">
            <div class="top-bar">
                <slot name="top-bar"></slot>
            </div>
            <div class="main-content">
                <slot name="main-content"></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-form {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.side-bar {
    width: 222px;
    flex-shrink: 0;
}

.main-content-area {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.top-bar {
    height: 71px;
}

.main-content {
    flex-grow: 1;
    background: var(--vt-c-third-bg-color);
    display: flex;
    justify-content: flex-start;
    /* đẩy chart về trái */
    align-items: flex-start;
    /* đẩy chart về trên */
    padding-top: 4vh;
    /* ~30px nếu viewport cao 750px */
    padding-left: 4vw;
    /* ~60px nếu viewport rộng 1500px */
    padding-bottom: 10vh;
    /* ~80px nếu viewport cao 800px */
}
</style>
