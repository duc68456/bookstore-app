<script setup>
import { computed, ref } from 'vue'
import { categoriesList } from '@/data/categories.js'

const props = defineProps({
  modelValue: Array,
  placeholder: String
})
const emit = defineEmits(['update:modelValue'])

const selectedCategories = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const newCategory = ref('')
const dialog = ref(false)

const openAddCategoriesDialog = () => {
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  newCategory.value = ''
}

const handleAddAndClose = () => {
  const name = newCategory.value.trim()
  if (name && !categoriesList.includes(name)) {
    categoriesList.push(name)
    selectedCategories.value.push(name)
  }
  closeDialog()
}

const isFocused = ref(false)

const shouldShowFloatingLabel = computed(() => {
  return isFocused.value || (props.modelValue && props.modelValue.length > 0)
})


const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  isFocused.value = false
}
</script>

<template>
  <div class="wrapper">
    <div class="frame" :class="{ 'focused': shouldShowFloatingLabel }">
      <label 
        class="floating-label" 
        :class="{ 'active': shouldShowFloatingLabel }"
      >
        {{ placeholder }}
      </label>
      <v-select
        v-model="selectedCategories"
        :items="categoriesList"
        :placeholder="shouldShowFloatingLabel ? '' : placeholder"
        multiple
        chips
        variant="plain"
        hide-details
        density="comfortable"
        menu-icon="mdi-chevron-down"
        class="category-select"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <v-icon
        @click="openAddCategoriesDialog"
        color="grey"
        small
        class="add-icon"
      >
        mdi-plus-circle
      </v-icon>
    </div>

    <v-dialog v-model="dialog" width="400" persistent>
      <v-card class="dialog-card">
        <v-card-title class="dialog-title">
          <v-icon class="back-icon" @click="closeDialog">mdi-arrow-left</v-icon>
          <span>Add New Category</span>
        </v-card-title>
        <v-card-text class="dialog-body">
          <v-text-field
            v-model="newCategory"
            label="Category Name"
            dense
            hide-details
          />
        </v-card-text>
        <v-card-actions class="justify-end pb-4 pr-4">
          <v-btn class="add-btn" @click="handleAddAndClose">ADD</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.frame.focused {
  border-color: var(--vt-c-second-bg-color); 
}

.frame {
  display: flex;
  width: 441px;
  padding: 12px 16px;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #3D3E3E;
  background-color: var(--vt-c-main-bg-color);
  font-family: Montserrat, sans-serif;
  position: relative;
}

.floating-label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  font-family: Montserrat, sans-serif;
  color: #999;
  pointer-events: none;
  transition: all 0.3s ease;
  background-color: var(--vt-c-main-bg-color);
  padding: 0 4px;
  z-index: 1;
}

.floating-label.active {
  top: 0;
  transform: translateY(-50%);
  font-size: 12px;
  color: var(--vt-c-second-bg-color);
  font-weight: 500;
}

.add-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

::v-deep(.category-select .v-field__input) {
  color: black !important;
  font-size: 15px;
  padding-top: 6px;
  padding-bottom: 6px;
  margin-top: 4px;
  margin-bottom: 0px;
}

::v-deep(.v-chip__content) {
  color: black !important;
  font-weight: 500;
  display: flex;
  align-items: center;  /* Căn chỉnh item ngang */
  justify-content: center;  /* Căn chỉnh item dọc */
  height: 32px;  /* Điều chỉnh chiều cao cho cân đối */
}

::v-deep(.v-select__selections) {
  padding-top: 0px;
  padding-bottom: 0px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Pop-up dialog */
.dialog-card {
  border-radius: 16px;
  font-family: Montserrat;
}

.dialog-title {
  display: flex;
  align-items: center;
  padding: 16px;
  font-weight: 600;
  font-size: 18px;
}

.back-icon {
  margin-right: 8px;
  cursor: pointer;
  color: var(--vt-c-second-bg-color);
}

.add-btn {
  color: white;
  background-color: var(--vt-c-second-bg-color);
  font-weight: bold;
}

::v-deep(.v-field__label) {
  display: none !important;
}

/* ✅ Tạo space cho floating label */
::v-deep(.category-select) {
  padding-top: 8px;
}
</style>
