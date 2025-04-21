<template>
  <div class="window">
    <div class="logo">
      <slot name="logo"></slot>
    </div>
    <div class="left-group">
      <div class="name">
        <slot name="name"></slot>
      </div>
      <div class="role">
        <slot name="role"></slot>
      </div>
    </div>
    <div class="right-section">
      <div class="right-group">
        <div class="time">
          <slot name="time"></slot>
        </div>
        <div class="day">
          <slot name="day"></slot>
        </div>
      </div>
      <div class="line">
        <slot name="line"></slot>
      </div>
      <div class="setting">
        <slot name="setting"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.window {
  width: 100%;
  height: 71px;
  background: var(--vt-c-main-bg-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
  gap: 10px;
}

.left-group {
  display: flex;
  flex-direction: column;
}


.right-group {
  align-items: flex-end;
  display: flex;
  flex-direction: column;
}

.right-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  gap: 10px;
}
.logo,
.name,
.role,
.time,
.day,
.line,
.setting {
  display: flex;
  align-items: center;
}

</style>
