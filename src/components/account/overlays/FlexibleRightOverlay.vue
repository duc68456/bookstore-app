<script setup>
import RightPad from '../pads/RightPad.vue'
import MainLogo from '../../MainLogo/MainLogo.vue'
import WhiteText from '../texts/WhiteText.vue'
import LWhiteText from '../texts/L-WhiteText.vue'
import ShortButton from '../buttons/ShortButton.vue'
import ButtonText from '../texts/ButtonText.vue'

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
  <RightPad>
    <template #logo>
      <MainLogo />
    </template>
    
    <template #small-text>
      <!-- Dùng LWhiteText cho library text (OTP mode) -->
      <LWhiteText v-if="useMultilineText">
        <template #note>{{ title }}</template>
      </LWhiteText>
      
      <!-- Dùng WhiteText cho text thường -->
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
  </RightPad>
</template>
