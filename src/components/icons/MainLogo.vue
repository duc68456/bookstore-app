<script setup>
import IconLogoWhite from './IconLogoWhite.vue'
import IconTextBookWorm from './IconTextBookWorm.vue'
import IconTextLibrary from './IconTextLibrary.vue'
</script>
<template>
<div class = "main-logo">
    <IconLogoWhite class="icon logo-white" />
    <IconTextBookWorm class="icon bookworm" />
    <IconTextLibrary class="icon library" />
</div>
</template>

<style scoped>
.main-logo {
  position: relative;
  margin: 125px 102px 293px 103px;
  width: 264.375px;
  height: 157.414px;
  flex-shrink: 0;
}

.icon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* Icon đầu - căn trên */
.logo-white {
  top: 0;
}

/* Icon giữa - cách top 91.4px */
.bookworm {
  top: 91.4px;
}

/* Icon cuối - căn đáy */
.library {
  bottom: 0;
}
</style>
