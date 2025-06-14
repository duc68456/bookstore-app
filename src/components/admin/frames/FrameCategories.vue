<template>
  <div class="wrapper">
    <div class="frame" :class="{ focused: shouldShowFloatingLabel }">
      <label class="floating-label" :class="{ active: shouldShowFloatingLabel }">
        {{ placeholder }}
      </label>

      <v-select
        v-model="selected"
        v-model:menu="menu"
        :items="categories"
        item-title="categoryName"
        item-value="categoryName"
        multiple
        chips
        :loading="loading"
        class="category-select"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <v-icon @click="openDialog" class="add-icon">mdi-plus-circle</v-icon>
    </div>

    <!-- Dialog thêm Category mới -->
    <v-dialog v-model="dialog" width="400" persistent>
      <v-card>
        <v-card-title class="dialog-title">
          <v-icon class="back-icon" @click="closeDialog">mdi-arrow-left</v-icon>
          Thêm Category mới
        </v-card-title>
        <v-card-text class="dialog-body">
          <v-text-field
            v-model="newCategory"
            label="Tên Category"
            dense
            hide-details
          />
        </v-card-text>
        <v-card-actions class="dialog-actions">
          <v-spacer />
          <v-btn class="add-btn" @click="handleAddAndClose">THÊM</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { useCategoryStore } from '@/data/categories'
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: Array,
  placeholder: String
})
const emit = defineEmits(['update:modelValue'])

const store      = useCategoryStore()
const categories = computed(() => store.categories)
const loading    = computed(() => store.loading)

const menu        = ref(false)
const dialog      = ref(false)
const newCategory = ref('')
const isFocused   = ref(false)

// bind v-model cho selected
const selected = computed({
  get: () => props.modelValue || [],
  set: v => emit('update:modelValue', v)
})

// fetch lần đầu
store.fetchCategories()

// khi dropdown mở mà chưa load thì fetch
watch(menu, open => {
  if (open && !store.categories.length && !store.loading) {
    store.fetchCategories()
  }
})

function handleFocus() {
  isFocused.value = true
  if (!store.categories.length && !store.loading) {
    store.fetchCategories()
  }
}
function handleBlur() {
  isFocused.value = false
}

function openDialog() {
  dialog.value = true
}
function closeDialog() {
  dialog.value = false
  newCategory.value = ''
}

async function handleAddAndClose() {
  const name = newCategory.value.trim()
  if (!name) return

  try {
    // gọi API tạo category mới
    const created = await store.createCategory(name)
    // thêm vào selection
    selected.value = [...selected.value, created.categoryName]
    closeDialog()
  } catch (e) {
    console.error('Tạo category thất bại', e)
    // TODO: hiển thị snackbar hoặc toast báo lỗi
  }
}

// helper tính floating label
const shouldShowFloatingLabel = computed(() =>
  isFocused.value || selected.value.length
)
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}

.frame {
  position: relative;
  display: flex;
  align-items: center;
  width: 441px;
  padding: 12px 16px;
  border: 1px solid #3D3E3E;
  border-radius: 12px;
  background-color: var(--vt-c-main-bg-color);
  transition: border-color 0.3s;
}
.frame.focused {
  border-color: var(--vt-c-second-bg-color);
}

.floating-label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--vt-c-main-bg-color);
  padding: 0 4px;
  color: #999;
  transition: all 0.3s;
  pointer-events: none;
  z-index: 1;
}
.floating-label.active {
  top: 0;
  transform: translateY(-50%);
  font-size: 12px;
  color: var(--vt-c-second-bg-color);
  font-weight: 500;
}

.category-select {
  flex: 1;
}

.add-icon {
  margin-left: 8px;
  cursor: pointer;
  color: var(--vt-c-second-bg-color);
}

.dialog-title {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  font-weight: 600;
}
.back-icon {
  cursor: pointer;
}
.dialog-body {
  padding: 0 16px 16px;
}
.dialog-actions {
  padding: 8px 16px;
}
.add-btn {
  background-color: var(--vt-c-second-bg-color);
  color: white;
  font-weight: bold;
}

/* override màu chữ trong v-select */
::v-deep(.category-select .v-field__input) {
  color: #000 !important;
}
::v-deep(.category-select .v-chip__content) {
  color: #000 !important;
}
::v-deep(.category-select .v-list-item__title) {
  color: #000 !important;
}
</style>
