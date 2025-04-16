<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import MainForm1 from './Forms/MainForm1.vue'
import WhitePad from './pads/WhitePad.vue'
import RightPad from './pads/RightPad.vue'
import MainLogo from './icons/MainLogo.vue'
import IconLogoBlack from './icons/IconLogoBlack.vue'
import MainTitle from './texts/MainTitle.vue'
import Note from './texts/Note.vue'
import Frame4 from './frames/Frame4.vue'
import TextInput from './TextInput.vue'
import LongButton from './buttons/LongButton.vue'
import ButtonText from './texts/ButtonText.vue'
import LeftButton from './buttons/LeftButton.vue'
import LargeWhiteText from './texts/largeWhiteText.vue'

const router = useRouter()
const otp = ref('')

const handleVerify = () => {
  console.log('OTP entered:', otp.value)
  router.push('/forgot-password/reset-password')
}

</script>

<template>
  <MainForm1>
    <!-- Trắng nằm bên trái -->
    <template #pad-left>
      <div style="position: relative; width: 100%; height: 100%;">
        <!-- Nút BACK góc trái -->
        <div style="position: absolute; top: 12px; left: 12px; z-index: 10;">
          <LeftButton @click="router.back()">BACK</LeftButton>
        </div>

        <WhitePad>
          <template #logo>
            <IconLogoBlack />
          </template>

          <template #main-title>
            <MainTitle>
              <template #main-title>
                Check your Mailbox
              </template>
            </MainTitle>
          </template>

          <template #note>
            <Note>
              <template #note>
                Please enter the OTP to proceed
              </template>
            </Note>
          </template>

          <template #frame1>
            <Frame4>
              <template #txtInput>
                <TextInput v-model="otp" placeholder="OTP" />
              </template>
            </Frame4>
          </template>

          <template #button>
            <LongButton @click="handleVerify">
              <template #btn-text>
                <ButtonText>
                  <template #btnText>
                    VERIFY
                  </template>
                </ButtonText>
              </template>
            </LongButton>
          </template>
        </WhitePad>
      </div>
    </template>

    <!-- Đen nằm bên phải -->
    <template #pad-right>
      <RightPad>
        <template #logo>
          <MainLogo />
        </template>
        <template #small-text>
          <LargeWhiteText>
            <template #note>
              "Your premier digital library"<br />
              for borrowing and reading books"
            </template>
          </LargeWhiteText>
        </template>
      </RightPad>
    </template>
  </MainForm1>
</template>
