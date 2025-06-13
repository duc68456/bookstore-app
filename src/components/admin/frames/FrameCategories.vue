<template>
  <div class="wrapper">
    <div class="frame" :class="{ 'focused': shouldShowFloatingLabel }">
      <label class="floating-label" :class="{ 'active': shouldShowFloatingLabel }">
        {{ placeholder }}
      </label>

      <v-select v-model="selected" v-model:menu="menu" :items="categories" item-title="categoryName"
        item-value="categoryName" :placeholder="shouldShowFloatingLabel ? '' : placeholder" multiple chips
        :loading="loading" class="category-select" @focus="handleFocus" @blur="handleBlur" />

      <v-icon @click="openDialog" class="add-icon">mdi-plus-circle</v-icon>
    </div>

    <!-- Add Category Dialog -->
    <v-dialog v-model="dialog" width="400" persistent>
      <v-card>
        <v-card-title class="dialog-title">
          <v-icon class="back-icon" @click="closeDialog">mdi-arrow-left</v-icon>
          Add New Category
        </v-card-title>
        <v-card-text class="dialog-body">
          <v-text-field v-model="newCategory" label="Category Name" dense hide-details />
        </v-card-text>
        <v-card-actions class="dialog-actions">
          <v-spacer />
          <v-btn class="add-btn" @click="handleAddAndClose">ADD</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCategoryStore } from '@/data/categories'

const props = defineProps({
  modelValue: Array,
  placeholder: String
})
const emit = defineEmits(['update:modelValue'])

// Category store
const store = useCategoryStore()
const { categories, fetchCategories, loading } = store

// State
const menu = ref(false)
const dialog = ref(false)
const newCategory = ref('')
const isFocused = ref(false)

// Selected binding
const selected = computed({
  get: () => props.modelValue || [],
  set: v => emit('update:modelValue', v)
})

const shouldShowFloatingLabel = computed(() => {
  return isFocused.value || (props.modelValue && props.modelValue.length > 0)
})

// Fetch on component init
fetchCategories()

// If user opens dropdown before fetch completes, fetch again
watch(menu, open => {
  if (open && !categories.length && !loading) {
    fetchCategories()
  }
})

// Focus handlers
function handleFocus() {
  isFocused.value = true
  if (!categories.length && !loading) fetchCategories()
}
function handleBlur() {
  isFocused.value = false
}

// Dialog handlers
function openDialog() {
  dialog.value = true
}
function closeDialog() {
  dialog.value = false
  newCategory.value = ''
}

function handleAddAndClose() {
  const name = newCategory.value.trim()
  if (!name) return
  // Add optimistically
  const newObj = { id: Date.now().toString(), categoryName: name }
  categories.push(newObj)
  selected.value = [...selected.value, name]
  closeDialog()
}
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
  max-width: 441px;
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

/* Vuetify deep selectors */
::v-deep(.category-select .v-field__input) {
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: 15px;
}

::v-deep(.v-select__selections) {
  display: flex;
  gap: 8px;
}

::v-deep(.v-chip__content) {
  height: 32px;
  align-items: center;
  justify-content: center;
}

::v-deep(.v-field__label) {
  display: none !important;
}
</style>
