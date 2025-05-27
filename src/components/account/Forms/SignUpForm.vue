<script setup>
import WhitePad from '../pads/WhitePad.vue'
import IconLogoBlack from '../icons/IconLogoBlack.vue'
import MainTitle from '../texts/MainTitle.vue'
import Note from '../texts/Note.vue'
import SignupFrame from '../frames/SignupFrame.vue'
import ContactFrame from '../frames/ContactFrame.vue'
import EmailFrame from '../frames/EmailFrame.vue'
import LongButton from '../buttons/LongButton.vue'
import ButtonText from '../texts/ButtonText.vue'

// Props
const props = defineProps({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  contact: String,
  email: String
})

// Emits
const emit = defineEmits([
  'update:firstName', 'update:lastName', 'update:username', 
  'update:password', 'update:contact', 'update:email', 'submit'
])

const handleSubmit = () => {
  emit('submit', {
    firstName: props.firstName,
    lastName: props.lastName,
    username: props.username,
    password: props.password,
    contact: props.contact,
    email: props.email
  })
}
</script>

<template>
  <!-- SỬ DỤNG TRỰC TIẾP WhitePad component - KHÔNG có wrapper -->
  <WhitePad>
    <template #logo>
      <IconLogoBlack />
    </template>
    
    <template #main-title>
      <MainTitle>
        <template #main-title>Sign Up</template>
      </MainTitle>
    </template>
    
    <template #note>
      <Note>
        <template #note>Please provide your information to sign up.</template>
      </Note>
    </template>
    
    <template #frame1>
      <div style="display: flex; flex-direction: column; gap: 16px; width: 100%; align-items: center;">
        <div style="display: flex; gap: 12px;">
          <SignupFrame 
            :model-value="firstName" 
            @update:model-value="$emit('update:firstName', $event)"
            placeholder="First Name" 
          />
          <SignupFrame 
            :model-value="lastName" 
            @update:model-value="$emit('update:lastName', $event)"
            placeholder="Last Name" 
          />
        </div>

        <div style="display: flex; gap: 12px;">
          <ContactFrame 
            :model-value="contact" 
            @update:model-value="$emit('update:contact', $event)"
            placeholder="Contact No" 
          />
          <EmailFrame 
            :model-value="email" 
            @update:model-value="$emit('update:email', $event)"
            placeholder="Email" 
          />
        </div>

        <div style="display: flex; gap: 12px;">
          <SignupFrame 
            :model-value="username" 
            @update:model-value="$emit('update:username', $event)"
            placeholder="Username" 
          />
          <SignupFrame 
            :model-value="password" 
            @update:model-value="$emit('update:password', $event)"
            placeholder="Password" 
            type="password"
          />
        </div>
      </div>
    </template>
    
    <template #button>
      <LongButton @click="handleSubmit">
        <template #btn-text>
          <ButtonText>
            <template #btnText>SIGN UP</template>
          </ButtonText>
        </template>
      </LongButton>
    </template>
  </WhitePad>
</template>
  
<!-- LOẠI BỎ style scoped để không override WhitePad -->
