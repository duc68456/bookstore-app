<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import WhitePad from './pads/WhitePad.vue'
import RightPad from './pads/RightPad.vue'

import MainTitle from './texts/MainTitle.vue'
import Note from './texts/Note.vue'
import MainForm1 from './Forms/MainForm1.vue'
import IconLogoBlack from './icons/IconLogoBlack.vue'
import Frame4 from './frames/Frame4.vue'
import TextInput from './TextInput.vue'
import LongButton from './buttons/LongButton.vue'
import ButtonText from './texts/ButtonText.vue'
import ForgotPassText from './texts/ForgotPassText.vue'

import MainLogo from './icons/MainLogo.vue'
import WhiteText from './texts/WhiteText.vue'
import ShortButton from './buttons/ShortButton.vue'

const router = useRouter()
const username = ref('')
const password = ref('')

const goToSignUp = () => {
    router.push('/sign-up')
}
</script>

<template>
    <MainForm1>
        <template #pad-left>
            <WhitePad>
                <template #logo>
                    <IconLogoBlack />
                </template>
                <template #main-title>
                    <MainTitle>
                        <template #main-title>
                            Welcome Back !!
                        </template>
                    </MainTitle>
                </template>
                <template #note>
                    <Note>
                        <template #note>
                            Please enter your credentials to log in
                        </template>
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
                            <TextInput v-model="password" placeholder="Password" />
                        </template>
                    </Frame4>
                </template>
                <template #forgot-password>
                    <ForgotPassText>
                        <template #fg>
                            Forgot password?
                        </template>
                    </ForgotPassText>
                </template>
                <template #button>
                    <LongButton>
                        <template #btn-text>
                            <ButtonText>
                                <template #btnText>
                                    SIGN IN
                                </template>
                            </ButtonText>
                        </template>
                    </LongButton>
                </template>
            </WhitePad>
        </template>

        <template #pad-right>
            <RightPad>
                <template #logo>
                    <MainLogo />
                </template>
                <template #small-text>
                    <WhiteText>
                        <template #note>
                            New to our platform? Sign Up now.
                        </template>
                    </WhiteText>
                </template>
                <template #button>
                    <ShortButton @click="goToSignUp">
                        <template #btn-text>
                            <ButtonText>
                                <template #btnText>
                                    SIGN UP
                                </template>
                            </ButtonText>
                        </template>
                    </ShortButton>
                </template>
            </RightPad>
        </template>
    </MainForm1>
</template>
