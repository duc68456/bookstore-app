<script setup>
import MainForm1 from './Forms/MainForm1.vue'
import LeftPad from './pads/LeftPad.vue'
import WhitePad from './pads/WhitePad.vue'

import MainLogo from '../MainLogo/MainLogo.vue'
import IconLogoBlack from './icons/IconLogoBlack.vue'
import MainTitle from './texts/MainTitle.vue'
import Note from './texts/Note.vue'
import SignupFrame from './frames/SignupFrame.vue'
import ContactFrame from './frames/ContactFrame.vue'
import EmailFrame from './frames/EmailFrame.vue'
import LongButton from './buttons/LongButton.vue'
import ShortButton from './buttons/ShortButton.vue'
import ButtonText from './texts/ButtonText.vue'
import WhiteText from './texts/WhiteText.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const firstName = ref('')
const lastName = ref('')
const username = ref('')
const password = ref('')
const contact = ref('')
const email = ref('')

const handleSignUp = () => {
  console.log('Signup Info:', {
    firstName: firstName.value,
    lastName: lastName.value,
    contact: contact.value,
    email: email.value,
    username: username.value,
    password: password.value
  })
  // TODO: add signup logic
}
</script>

<template>
  <MainForm1>
    <!-- Left: Black pad -->
    <template #pad-left>
      <LeftPad>
        <template #logo>
          <MainLogo />
        </template>
        <template #small-text>
          <WhiteText>
            <template #note>
              Already have Account? Sign In now.
            </template>
          </WhiteText>
        </template>
        <template #button>
          <ShortButton @click="router.push('/')">
            <template #btn-text>
              <ButtonText>
                <template #btnText>SIGN IN</template>
              </ButtonText>
            </template>
          </ShortButton>
        </template>
      </LeftPad>
    </template>

    <!-- Right: White pad -->
    <template #pad-right>
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
            <template #note>
              Please provide your information to sign up.
            </template>
          </Note>
        </template>

        <!-- Combined frame1 + frame2 for vertical alignment -->
        <template #frame1>
          <div style="display: flex; flex-direction: column; gap: 16px; width: 100%; align-items: center;">
            <!-- First Name & Last Name -->
            <div style="display: flex; gap: 12px;">
              <SignupFrame v-model="firstName" placeholder="First Name" />
              <SignupFrame v-model="lastName" placeholder="Last Name" />
            </div>

            <!-- Contact & Email -->
            <div style="display: flex; gap: 12px;">
              <ContactFrame v-model="contact" placeholder="Contact No" />
              <EmailFrame v-model="email" placeholder="Email" />
            </div>

            <!-- Username & Password -->
            <div style="display: flex; gap: 12px;">
              <SignupFrame v-model="username" placeholder="Username" />
              <SignupFrame v-model="password" placeholder="Password" type="password" />
            </div>
          </div>
        </template>

        <!-- Bottom button -->
        <template #button>
          <LongButton @click="handleSignUp">
            <template #btn-text>
              <ButtonText>
                <template #btnText>SIGN UP</template>
              </ButtonText>
            </template>
          </LongButton>
        </template>
      </WhitePad>
    </template>
  </MainForm1>
</template>
