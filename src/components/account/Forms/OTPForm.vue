<script setup>
import WhitePad from '../pads/WhitePad.vue'
import IconLogoBlack from '../icons/IconLogoBlack.vue'
import MainTitle from '../texts/MainTitle.vue'
import Note from '../texts/Note.vue'
import Frame4 from '../frames/Frame4.vue'
import TextInput from '../TextInput.vue'
import LongButton from '../buttons/LongButton.vue'
import ButtonText from '../texts/ButtonText.vue'
import LeftButton from '../buttons/LeftButton.vue'

// Props
const props = defineProps({
  otp: String
})

// Emits
const emit = defineEmits(['update:otp', 'submit', 'back'])

const handleSubmit = () => {
  emit('submit', { otp: props.otp })
}
</script>

<template>
  <div style="position: relative; width: 100%; height: 100%;">
    <div style="position: absolute; top: 12px; left: 12px; z-index: 10;">
      <LeftButton @click="$emit('back')">BACK</LeftButton>
    </div>

    <!-- Form chính - Y HỆT SignInForm -->
    <WhitePad>
      <template #logo>
        <IconLogoBlack />
      </template>

      <template #main-title>
        <MainTitle>
          <template #main-title>Check your Mailbox</template>
        </MainTitle>
      </template>

      <template #note>
        <Note>
          <template #note>Please enter the OTP to proceed</template>
        </Note>
      </template>

      <template #frame1>
        <Frame4>
          <template #txtInput>
            <TextInput 
              :model-value="otp" 
              @update:model-value="$emit('update:otp', $event)"
              placeholder="OTP" 
            />
          </template>
        </Frame4>
      </template>

      <template #button>
        <LongButton @click="handleSubmit">
          <template #btn-text>
            <ButtonText>
              <template #btnText>VERIFY</template>
            </ButtonText>
          </template>
        </LongButton>
      </template>
    </WhitePad>
  </div>
</template>
