<script setup>
import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import BookTable from '../tables/BookTable.vue'
</script>
<template>
    <CRUDMainForm>
        <template #title>
            <TitleText>
                <template #text>
                    Edit Entry Form
                </template>
            </TitleText>
        </template>
        <template #content>
          <BookTable :items="books" :fullBookDetails="bookDetails" :showActions="false" :show-quantity="false" :show-price="false" />
        </template>
    </CRUDMainForm>
</template>
<style scoped>
</style>