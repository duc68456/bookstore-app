<template>
<div class="window">
<slot />
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
}
</style>