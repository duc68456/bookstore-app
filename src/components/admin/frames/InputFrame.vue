<script setup>

const model = defineModel() 
</script>

<template>
  <div class="frame">
        <input class="input" type="number" v-model.number="model" min="0" />
  </div>
</template>

<style scoped>
.frame {
  display: flex;
  align-items: center;
  width: 70px;
  height: 36px;
  padding: 0 20px;
  border-radius: 12px;
  border: 1px solid #E8E8E8;
  background-color: var(--vt-c-main-bg-color);
  gap: 15px;
}

.input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 15px;
  font-family: Montserrat, sans-serif;
  color: #333;
}
</style>
