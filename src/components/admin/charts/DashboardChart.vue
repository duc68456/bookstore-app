<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const chartData = {
  labels: ['Borrowed Books', 'Returned Books'],
  datasets: [
    {
      backgroundColor: ['#4f4f4f', '#151619'],
      data: [320, 800]
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#000',
        font: {
          size: 14
        }
      }
    }
  }
}
</script>

<template>
  <div class="chart-container">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 600px;
  height: 400px;
  margin: 0 auto;
}
</style>
