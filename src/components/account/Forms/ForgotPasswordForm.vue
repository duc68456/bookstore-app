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
  username: String
})

// Emits
const emit = defineEmits(['update:username', 'submit', 'back'])

const handleSubmit = () => {
  emit('submit', { username: props.username })
}
</script>

<template>
  <div style="position: relative; width: 100%; height: 100%;">
    <!-- Nút BACK ở góc phải -->
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
          <template #main-title>Forgot Password</template>
        </MainTitle>
      </template>

      <template #note>
        <Note>
          <template #note>Please enter your username</template>
        </Note>
      </template>

      <template #frame1>
        <Frame4>
          <template #txtInput>
            <TextInput 
              :model-value="username" 
              @update:model-value="$emit('update:username', $event)"
              placeholder="Username" 
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
