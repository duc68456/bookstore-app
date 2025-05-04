<script setup>
defineProps({
  readonly: Boolean
})
</script>
<template>
  <div class="wrapper">
    <slot name="text-above"></slot>
    <div class="frame">
      <input class="input" type="text" :readonly="readonly" />
    </div>
  </div>
</template>

<style scoped>
.frame {
  display: flex;
  width: 441px;
  padding: 12px 16px;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid #3D3E3E;
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

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
