<script setup>
import LeftPad from '../pads/LeftPad.vue'
import MainLogo from '../../MainLogo/MainLogo.vue'
import WhiteText from '../texts/WhiteText.vue'
import LWhiteText from '../texts/L-WhiteText.vue'
import ShortButton from '../buttons/ShortButton.vue'
import ButtonText from '../texts/ButtonText.vue'

// Props để nhận nội dung linh hoạt
defineProps({
  title: String,
  buttonText: String,
  useMultilineText: {
    type: Boolean,
    default: false
  }
})

defineEmits(['action'])
</script>

<template>
  <LeftPad>
    <template #logo>
      <MainLogo />
    </template>
    
    <template #small-text>
      <!-- Chế độ multiline cho forgot password -->
      <LWhiteText v-if="useMultilineText">
        <template #note>{{ title }}</template>
      </LWhiteText>
      
      <!-- Chế độ single line cho các trường hợp khác -->
      <WhiteText v-else>
        <template #note>{{ title }}</template>
      </WhiteText>
    </template>
    
    <!-- Chỉ hiển thị button khi có buttonText -->
    <template #button v-if="buttonText">
      <ShortButton @click="$emit('action')">
        <template #btn-text>
          <ButtonText>
            <template #btnText>{{ buttonText }}</template>
          </ButtonText>
        </template>
      </ShortButton>
    </template>
  </LeftPad>
</template>
