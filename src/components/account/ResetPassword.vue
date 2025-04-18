<script setup>
import MainForm1 from './Forms/MainForm1.vue'
import LeftPad from './pads/LeftPad.vue'
import WhitePad from './pads/WhitePad.vue'

import MainLogo from '../MainLogo/MainLogo.vue'
import LargeWhiteText from './texts/largeWhiteText.vue'
import IconLogoBlack from './icons/IconLogoBlack.vue'
import MainTitle from './texts/MainTitle.vue'
import Note from './texts/Note.vue'
import Frame4 from './frames/Frame4.vue'
import TextInput from './TextInput.vue'
import LongButton from './buttons/LongButton.vue'
import ButtonText from './texts/ButtonText.vue'
import RightButton from './buttons/RightButton.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const newPassword = ref('')
const confirmPassword = ref('')

const handleReset = () => {
  console.log('New Password:', newPassword.value)
  console.log('Confirm Password:', confirmPassword.value)
  // Bạn có thể xử lý xác minh hoặc chuyển hướng tiếp theo ở đây
}
</script>

<template>
  <MainForm1>
    <!-- LeftPad (đen) -->
    <template #pad-left>
      <LeftPad>
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
      </LeftPad>
    </template>

    <!-- RightPad (trắng) -->
    <template #pad-right>
      <div style="position: relative; width: 100%; height: 100%;">
        <!-- Nút BACK góc phải -->
        <div style="position: absolute; top: 12px; right: 0;">
          <RightButton @click="router.back()">BACK</RightButton>
        </div>


        <WhitePad>
          <template #logo>
            <IconLogoBlack />
          </template>

          <template #main-title>
            <MainTitle>
              <template #main-title>
                Reset Password
              </template>
            </MainTitle>
          </template>

          <template #note>
            <Note>
              <template #note>
                Please enter your new password
              </template>
            </Note>
          </template>

          <template #frame1>
            <Frame4>
              <template #txtInput>
                <TextInput v-model="newPassword" placeholder="New Password" type="password" />
              </template>
            </Frame4>
          </template>

          <template #frame2>
            <Frame4>
              <template #txtInput>
                <TextInput v-model="confirmPassword" placeholder="Confirm Password" type="password" />
              </template>
            </Frame4>
          </template>

          <template #button>
            <LongButton @click="handleReset">
              <template #btn-text>
                <ButtonText>
                  <template #btnText>
                    RESET PASSWORD
                  </template>
                </ButtonText>
              </template>
            </LongButton>
          </template>
        </WhitePad>
      </div>
    </template>
  </MainForm1>
</template>
