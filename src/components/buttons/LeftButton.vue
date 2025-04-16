<template>
  <div class="btn">
    <BackText>
      <template #back>BACK</template>
    </BackText>
  </div>
</template>

<script setup>
import BackText from '@/components/texts/BackText.vue'
</script>

<style scoped>
.btn {
  display: flex;
  width: 53px;
  height: 22px;
  padding: 4px 13px 5px 13px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 20px 0px 0px 20px;
  border: 1px solid #000;
  background: #FFF;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:hover {
  background: #eaeaea;
  transform: scale(1.05);
}

.btn:hover ::v-deep(.back-text) {
  color: #333;
}
</style>
