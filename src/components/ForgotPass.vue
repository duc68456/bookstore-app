<script setup>
    import WhitePad from './pads/WhitePad.vue'
    import LeftPad from './pads/LeftPad.vue'

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

</script>

<template>
    <MainForm1>
        <template #pad-left>
            <LeftPad>
            </LeftPad>
        </template>
        <template #pad-right>
            <WhitePad>
            </WhitePad>
        </template>    
    </MainForm1>
</template>