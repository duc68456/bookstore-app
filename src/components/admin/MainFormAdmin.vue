<script setup>
import SideBar from './pads/SideBar.vue'
import TopBar from './pads/TopBar.vue'
</script>

<template>
    <div class="main-form">
        <div class="side-bar">
            <SideBar />
        </div>
        <div class="main-content-area">
            <div class="top-bar">
                <TopBar />
            </div>
            <div class="main-content">
                <router-view />
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

.main-content-area {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.main-content {
    flex-grow: 1;
    background: var(--vt-c-third-bg-color);
    display: flex;
    flex-direction: column;
}
</style>
