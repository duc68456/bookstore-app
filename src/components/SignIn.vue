<script setup>
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
    import ForgotPass from './texts/ForgotPass.vue'

    import MainLogo from './icons/MainLogo.vue'
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
                    <ForgotPass>
                        <template #fg>
                            Forgot password?
                        </template>
                    </ForgotPass>
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
                <MainLogo/>
            </RightPad>
        </template>
    </MainForm1>
</template>

