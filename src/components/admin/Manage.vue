<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TitleText from './texts/TitleText.vue'

// Import icons (bạn cần tạo hoặc import các icon này)
import ImportIcon from '@/assets/icons-vue/import.vue'
import ExportIcon from '@/assets/icons-vue/export.vue'
import PaymentIcon from '@/assets/icons-vue/payment.vue'

const router = useRouter()

// Dữ liệu thống kê mẫu (trong thực tế nên lấy từ store)
const stats = ref({
  import: {
    count: 12,
    lastUpdate: 'May 17, 2025',
    pending: 3
  },
  export: {
    count: 8,
    lastUpdate: 'May 18, 2025',
    pending: 5
  },
  payment: {
    total: '$560.50',
    pending: '$285.70',
    lastUpdate: 'May 16, 2025'
  }
})

function goToImportBook() {
  router.push('/manage/import-book')
}

function goToExportBook() {
  router.push('/manage/export-book')
}

function goToPaymentReceipt() { 
  router.push('/manage/payment-receipt')
}
</script>

<template>
  <div class="content">
    <div class="top-bar">
      <div class="left">
        <TitleText>
          <template #text>
            Manage Bookstore
          </template>
        </TitleText>
      </div>
    </div>

    <div class="dashboard-cards">
      <!-- Import Book Card -->
      <div class="card" @click="goToImportBook">
        <div class="card-header">
          <div class="icon-container">
            <ImportIcon />
          </div>
          <h3>Import Books</h3>
        </div>
        <div class="card-content">
          <p>Manage book inventory by creating import receipts for new arrivals.</p>
          <div class="stats">
            <div class="stat-item">
              <span class="stat-value">{{ stats.import.count }}</span>
              <span class="stat-label">Recent Imports</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ stats.import.pending }}</span>
              <span class="stat-label">Pending</span>
            </div>
          </div>
          <div class="last-update">
            Last updated: {{ stats.import.lastUpdate }}
          </div>
        </div>
        <div class="card-footer">
          <button class="action-button">Manage Imports</button>
        </div>
      </div>

      <!-- Export Book Card -->
      <div class="card" @click="goToExportBook">
        <div class="card-header">
          <div class="icon-container">
            <ExportIcon />
          </div>
          <h3>Export Books</h3>
        </div>
        <div class="card-content">
          <p>Create sales receipts and manage customer orders and exports.</p>
          <div class="stats">
            <div class="stat-item">
              <span class="stat-value">{{ stats.export.count }}</span>
              <span class="stat-label">Recent Exports</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ stats.export.pending }}</span>
              <span class="stat-label">Pending Orders</span>
            </div>
          </div>
          <div class="last-update">
            Last updated: {{ stats.export.lastUpdate }}
          </div>
        </div>
        <div class="card-footer">
          <button class="action-button">Manage Exports</button>
        </div>
      </div>

      <!-- Payment Receipt Card -->
      <div class="card" @click="goToPaymentReceipt">
        <div class="card-header">
          <div class="icon-container">
            <PaymentIcon />
          </div>
          <h3>Payment Receipts</h3>
        </div>
        <div class="card-content">
          <p>Track customer payments and manage outstanding balances.</p>
          <div class="stats">
            <div class="stat-item">
              <span class="stat-value">{{ stats.payment.total }}</span>
              <span class="stat-label">Total Received</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ stats.payment.pending }}</span>
              <span class="stat-label">Outstanding</span>
            </div>
          </div>
          <div class="last-update">
            Last updated: {{ stats.payment.lastUpdate }}
          </div>
        </div>
        <div class="card-footer">
          <button class="action-button">Manage Payments</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  padding: 20px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.left {
  display: flex;
  align-items: center;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  padding: 0 20px;
}

.card {
  background-color: var(--vt-c-main-bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-top: 4px solid var(--vt-c-second-bg-color);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-header {
  background-color: var(--vt-c-second-bg-color);
  color: var(--vt-c-main-bg-color);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;  
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.card-content {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-content p {
  margin-top: 0;
  margin-bottom: 16px;
  color: #666;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin: 16px 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-value {
  font-size: 22px;
  font-weight: bold;
  color: var(--vt-c-second-bg-color);
}

.stat-label {
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}

.last-update {
  font-size: 12px;
  color: #999;
  margin-top: auto;
  text-align: center;
}

.card-footer {
  padding: 16px 20px;
  border-top: 1px solid #eee;
}

.action-button {
  background-color: var(--vt-c-second-bg-color);
  background-size: 500% 100%;
  background-image: linear-gradient(to right,
    var(--vt-c-second-bg-color),
    var(--vt-c-gradient-bg-color),
    var(--vt-c-gradient-bg-color),
    var(--vt-c-second-bg-color));
  background-position: 0% 50%;
  transition: background-position 0.4s ease-in-out; 
  color: var(--vt-c-main-bg-color);
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
}

.action-button:hover {
  background-position: 100% 50%; 
}


</style>
