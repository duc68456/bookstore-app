<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import MainForm1 from './Forms/MainForm1.vue'
import RightPad from './pads/RightPad.vue'
import WhitePad from './pads/WhitePad.vue'

import MainLogo from '../MainLogo/MainLogo.vue'
import IconLogoBlack from './icons/IconLogoBlack.vue'

import MainTitle from './texts/MainTitle.vue'
import Note from './texts/Note.vue'
import Frame4 from './frames/Frame4.vue'
import TextInput from './TextInput.vue'
import LongButton from './buttons/LongButton.vue'
import ButtonText from './texts/ButtonText.vue'
import WhiteText from './texts/WhiteText.vue'
import ShortButton from './buttons/ShortButton.vue'

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')

const goToSignIn = () => router.push('/')
</script>

<template>
  <MainForm1>
    <template #pad-left>
      <RightPad>
        <template #logo>
          <MainLogo />
        </template>
        <template #small-text>
          <WhiteText>
            <template #note>
              Already have an account? Sign in here.
            </template>
          </WhiteText>
        </template>
        <template #button>
          <ShortButton @click="goToSignIn">
            <template #btn-text>
              <ButtonText>
                <template #btnText>SIGN IN</template>
              </ButtonText>
            </template>
          </ShortButton>
        </template>
      </RightPad>
    </template>

    <template #pad-right>
      <WhitePad>
        <template #logo>
          <IconLogoBlack />
        </template>
        <template #main-title>
          <MainTitle>
            <template #main-title>Create Account</template>
          </MainTitle>
        </template>
        <template #note>
          <Note>
            <template #note>Fill in your details to create an account.</template>
          </Note>
        </template>

        <template #frame1>
          <Frame4>
            <template #txtInput>
              <TextInput v-model="username" placeholder="Username" />
            </template>
          </Frame4>
        </template>

        <template #frame2>
          <Frame4>
            <template #txtInput>
              <TextInput v-model="email" placeholder="Email" />
            </template>
          </Frame4>
        </template>

        <template #frame3>
          <Frame4>
            <template #txtInput>
              <TextInput v-model="password" placeholder="Password" />
            </template>
          </Frame4>
        </template>

        <template #button>
          <LongButton>
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
