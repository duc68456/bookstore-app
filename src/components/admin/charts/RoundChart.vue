<template>
  <div class="chart-wrapper">
    <svg viewBox="0 0 670 670" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <path
        d="M670 335C670 520.017 520.029 670 335 670C150.002 670 0 520.017 0 335C0 149.983 150.002 0 335 0C520.029 0 670 149.983 670 335Z"
        fill="#151619" />
    </svg>
  </div>
</template>

<style scoped>
.chart-wrapper {
  width: 100%;
  max-width: 600px;
  /* Giảm kích thước tối đa */
  aspect-ratio: 1 / 1;
  padding: 10px;
  /* Khoảng trống nhẹ để không bị sát rìa */
  box-sizing: border-box;
}

svg {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
