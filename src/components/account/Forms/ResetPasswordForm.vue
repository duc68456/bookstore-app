<script setup>
import WhitePad from '../pads/WhitePad.vue'
import IconLogoBlack from '../icons/IconLogoBlack.vue'
import MainTitle from '../texts/MainTitle.vue'
import Note from '../texts/Note.vue'
import Frame4 from '../frames/Frame4.vue'
import TextInput from '../TextInput.vue'
import LongButton from '../buttons/LongButton.vue'
import ButtonText from '../texts/ButtonText.vue'
import RightButton from '../buttons/RightButton.vue'

// Props
const props = defineProps({
  newPassword: String,
  confirmPassword: String
})

// Emits
const emit = defineEmits(['update:newPassword', 'update:confirmPassword', 'submit', 'back'])

const handleSubmit = () => {
  emit('submit', { 
    newPassword: props.newPassword,
    confirmPassword: props.confirmPassword 
  })
}
</script>

<template>
  <div style="position: relative; width: 100%; height: 100%;">
    <!-- Nút BACK ở góc phải - giống ForgotPasswordForm -->
    <div style="position: absolute; top: 12px; right: 12px; z-index: 10;">
      <RightButton @click="$emit('back')">BACK</RightButton>
    </div>

    <!-- Form chính -->
    <WhitePad>
      <template #logo>
        <IconLogoBlack />
      </template>

      <template #main-title>
        <MainTitle>
          <template #main-title>Reset Password</template>
        </MainTitle>
      </template>

      <template #note>
        <Note>
          <template #note>Please enter your new password</template>
        </Note>
      </template>

      <template #frame1>
        <Frame4>
          <template #txtInput>
            <TextInput 
              :model-value="newPassword" 
              @update:model-value="$emit('update:newPassword', $event)"
              placeholder="New Password" 
              type="password"
            />
          </template>
        </Frame4>
      </template>

      <template #frame2>
        <Frame4>
          <template #txtInput>
            <TextInput 
              :model-value="confirmPassword" 
              @update:model-value="$emit('update:confirmPassword', $event)"
              placeholder="Confirm Password" 
              type="password"
            />
          </template>
        </Frame4>
      </template>

      <template #button>
        <LongButton @click="handleSubmit">
          <template #btn-text>
            <ButtonText>
              <template #btnText>RESET PASSWORD</template>
            </ButtonText>
          </template>
        </LongButton>
      </template>
    </WhitePad>
  </div>
</template>
