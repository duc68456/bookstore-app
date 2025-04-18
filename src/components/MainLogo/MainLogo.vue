<script setup>
import IconLogoWhite from './IconLogoWhite.vue'
import IconTextBookWorm from './IconTextBookWorm.vue'
import IconTextLibrary from './IconTextLibrary.vue'
</script>
<template>
<div class = "main-logo">
    <div class="slot"><IconLogoWhite class="icon logo-white" /></div>
    <div class="slot"><IconTextBookWorm class="icon bookworm" /></div>
    <div class  ="slot"><IconTextLibrary class="icon library" /></div>
</div>
</template>

<style scoped>
.main-logo {
  position: relative;
  width: 264.375px;
  height: 157.414px;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.slot {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1%;
  margin-bottom: 1%; 
}
</style>
