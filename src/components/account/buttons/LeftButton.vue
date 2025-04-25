<template>
  <div class="left-btn">
    <BackText>
      <template #back>
        <slot />
      </template>
    </BackText>
  </div>
</template>

<script setup>
import BackText from '../texts/BackText.vue'
</script>

<style scoped>
.left-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 53px;
  height: 22px;
  padding: 4px 13px 5px 13px;
  border-radius: 0 20px 20px 0;
  border: 1px solid var(--vt-c-second-bg-color);
  background: var(--vt-c-main-bg-color);
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  transition: 0.3s ease-in-out;
}

/* Hover effect */
.left-btn:hover {
  background: var(--vt-c-second-bg-color);
  letter-spacing: 0.3px;
  /* selection color */
}

/* Đổi màu chữ bên trong */
.left-btn:hover ::v-deep(.back-text) {
  color: var(--vt-c-main-bg-color);;
}
</style>
