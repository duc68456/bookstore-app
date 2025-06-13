<template>
  <div class="wrapper">
    <div class="frame" :class="{ focused: isFocused || selected.length }">
      <label class="floating-label" :class="{ active: isFocused || selected.length }">
        {{ placeholder }}
      </label>

      <v-select
        v-model="selected"
        v-model:menu="menu"
        :items="authors"
        item-title="name"
        item-value="name"
        :placeholder="(isFocused || selected.length) ? '' : placeholder"
        multiple
        chips
        :loading="loading"
        class="author-select"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <v-icon @click="openDialog" class="add-icon">mdi-plus-circle</v-icon>
    </div>

    <!-- Add Author Dialog -->
    <v-dialog v-model="dialog" width="400" persistent>
      <v-card>
        <v-card-title class="dialog-title">
          <v-icon class="back-icon" @click="closeDialog">mdi-arrow-left</v-icon>
          Add New Author
        </v-card-title>
        <v-card-text class="dialog-body">
          <v-text-field
            v-model="newAuthor"
            label="Author Name"
            dense
            hide-details
          />
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
import { useAuthorStore } from '@/data/authors'
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps({ modelValue: Array, placeholder: String })
const emit  = defineEmits(['update:modelValue'])

// Author store returns objects { id, name, _raw }
const store = useAuthorStore()
const { authors, fetchAuthors, loading } = store

// initial fetch
onMounted(fetchAuthors)

// component state
const menu      = ref(false)
const dialog    = ref(false)
const newAuthor = ref('')
const isFocused = ref(false)

// v-model binding
const selected = computed({
  get:  () => props.modelValue || [],
  set: v   => emit('update:modelValue', v)
})

// re-fetch if opened without data
watch(menu, open => {
  if (open && !authors.length && !loading) fetchAuthors()
})

function handleFocus() {
  isFocused.value = true
  if (!authors.length && !loading) fetchAuthors()
}
function handleBlur() {
  isFocused.value = false
}

function openDialog() {
  dialog.value = true
}
function closeDialog() {
  dialog.value = false
  newAuthor.value = ''
}

function handleAddAndClose() {
  const name = newAuthor.value.trim()
  if (!name) return
  // optimistic add
  const newObj = { id: Date.now().toString(), name, _raw: {} }
  authors.push(newObj)
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

.author-select {
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

/* Deep selectors for Vuetify internals */
::v-deep(.author-select .v-field__input) {
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
