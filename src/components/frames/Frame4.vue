<template>
  <div class="frame">
    <slot name="txtInput"></slot>
  </div>
</template>

<script setup>
// Không cần gì ở đây hiện tại, nhưng vẫn nên có <script setup> để hợp lệ
</script>

<style scoped>
.frame {
  border-radius: 12px;
  border: 1px solid #3D3E3E;
  background: var(--vt-c-main-bg-color);
  display: flex;
  width: 267px;
  padding: 12px 16px;
  align-items: center;
  gap: 8px;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.frame:hover {
  background: #F5F5F5;
  border-color: #727374;
}
</style>
