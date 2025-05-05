<script setup>
import CRUDMainForm from './CRUDMainForm.vue'
import TitleText from '../texts/TitleText.vue'
import FrameRU from '../frames/FrameRU.vue'
import FrameText from '../texts/FrameText.vue'
defineProps(['book'])
</script>

<template> 
  <div class="detail-wrapper">
    <CRUDMainForm title="Book Detail" :data="book" @close="$emit('close')">
      <template #title>
        <TitleText>
          <template #text>
            Book Detail
          </template>
        </TitleText>
      </template>
      <template #content>
        <div class="frame-wrapper">
          <FrameRU readonly :modelValue="book.name">
            <template #text-above>
              <FrameText>
                <template #text>
                  Name
                </template>
              </FrameText>
            </template>
          </FrameRU>        
          <FrameRU readonly :modelValue="book.author">
            <template #text-above>
              <FrameText>
                <template #text>
                  Author
                </template>
              </FrameText>
            </template>
          </FrameRU>        
          <FrameRU readonly :modelValue="book.selling_price">
            <template #text-above>
              <FrameText>
                <template #text>
                  Selling Price
                </template>
              </FrameText>
            </template>
          </FrameRU>        
          <FrameRU readonly :modelValue="book.quantity">
            <template #text-above>
              <FrameText>
                <template #text>
                  Quantity
                </template>
              </FrameText>
            </template>
          </FrameRU>        
          <FrameRU readonly :modelValue="book.published_year">
            <template #text-above>
              <FrameText>
                <template #text>
                  Published Year
                </template>
              </FrameText>
            </template>
          </FrameRU>        
          <FrameRU readonly :modelValue="book.categories">
            <template #text-above>
              <FrameText>
                <template #text>
                  Categories
                </template>
              </FrameText>
            </template>
          </FrameRU>     
        </div>
      </template>
    </CRUDMainForm>
  </div>
</template>



<style scoped>
.detail-wrapper {
  color: var(--vt-c-main-bg-color);
  width: 100%;
  height: 100%;
  padding: 12px;
  font-family: Montserrat;
}

.frame-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 18px;           
  padding: 5vh 0;    
}
</style>

