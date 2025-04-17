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
  border: 1px solid #000;
  background: #fff;
}
</style>
