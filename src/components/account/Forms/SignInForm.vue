<script setup>
import WhitePad from '../pads/WhitePad.vue'
import IconLogoBlack from '../icons/IconLogoBlack.vue'
import MainTitle from '../texts/MainTitle.vue'
import Note from '../texts/Note.vue'
import Frame4 from '../frames/Frame4.vue'
import TextInput from '../TextInput.vue'
import LongButton from '../buttons/LongButton.vue'
import ButtonText from '../texts/ButtonText.vue'
import ForgotPassText from '../texts/ForgotPassText.vue'

// Props
const props = defineProps({
  username: String,
  password: String
})

// Emits
const emit = defineEmits(['update:username', 'update:password', 'submit', 'forgot-password'])

const handleSubmit = () => {
  emit('submit', {
    username: props.username,
    password: props.password
  })
}

const handleForgotPasswordClick = () => {
  emit('forgot-password')
}
</script>

<template>
  <WhitePad>
    <template #logo>
      <IconLogoBlack />
    </template>
    
    <template #main-title>
      <MainTitle>
        <template #main-title>Welcome Back !!</template>
      </MainTitle>
    </template>
    
    <template #note>
      <Note>
        <template #note>Please enter your credentials to log in</template>
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
    
    <template #frame2>
      <Frame4>
        <template #txtInput>
          <TextInput 
            :model-value="password" 
            @update:model-value="$emit('update:password', $event)"
            placeholder="Password" 
            type="password"
          />
        </template>
      </Frame4>
    </template>
    
    <template #forgot-password>
      <ForgotPassText @click="handleForgotPasswordClick">
        <template #fg>Forgot password?</template>
      </ForgotPassText>
    </template>
    
    <template #button>
      <LongButton @click="handleSubmit">
        <template #btn-text>
          <ButtonText>
            <template #btnText>SIGN IN</template>
          </ButtonText>
        </template>
      </LongButton>
    </template>
  </WhitePad>
</template>
