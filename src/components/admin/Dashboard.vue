<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import MainFormAdmin from './MainFormAdmin.vue'
import SideBar from './pads/SideBar.vue'
import ButtonSideBar from './buttons/ButtonSideBar.vue' 
import ButtonText from './texts/ButtonText.vue'
import SmallMainLogo from '../MainLogo/SmallMainLogo.vue'

import ElementIcon from '@/assets/icons-vue/element.vue'
import ElementIconWhite from '@/assets/icons-vue-white/element.vue'
import PeopleIcon from '@/assets/icons-vue/people.vue'
import PeopleIconWhite from '@/assets/icons-vue-white/people.vue'
import BookIcon from '@/assets/icons-vue/book.vue'
import BookIconWhite from '@/assets/icons-vue-white/book.vue'
import LogOutIcon from '@/assets/icons-vue/logout.vue'
import LogOutIconWhite from '@/assets/icons-vue-white/logout.vue'

const router = useRouter()
const username = ref('')
const password = ref('')


</script>
<template>
    <MainFormAdmin>
        <template #side-bar>
            <SideBar>
                <template #logo>
                    <SmallMainLogo />
                </template>
                <template #btn1>
                    <ButtonSideBar>
                        <template #btn-icon="{ hover }">
                            <component :is="hover ? ElementIcon : ElementIconWhite" />
                        </template>
                        <template #btn-text>
                            <ButtonText>
                                <template #text>
                                    Dashboard
                                </template>
                            </ButtonText>
                        </template>
                    </ButtonSideBar>
                </template>
                <template #btn2>
                    <ButtonSideBar>
                        <template #btn-icon="{ hover }">
                            <component :is="hover ? PeopleIcon : PeopleIconWhite" />
                        </template>
                        <template #btn-text>
                            <ButtonText>
                                <template #text>
                                    Users
                                </template>
                            </ButtonText>
                        </template>
                    </ButtonSideBar>
                </template>
                <template #btn3>
                    <ButtonSideBar>
                        <template #btn-icon="{ hover }">
                            <component :is="hover ? BookIcon : BookIconWhite" />
                        </template>
                        <template #btn-text>
                            <ButtonText>
                                <template #text>
                                    Books
                                </template>
                            </ButtonText>
                        </template>
                    </ButtonSideBar>
                </template>
                <template #btn-log-out>
                    <ButtonSideBar>
                        <template #btn-icon="{ hover }">
                            <component :is="hover ? LogOutIcon : LogOutIconWhite" />
                        </template>
                        <template #btn-text>
                            <ButtonText>
                                <template #text>
                                    Log Out
                                </template>
                            </ButtonText>
                        </template>
                    </ButtonSideBar>
                </template>
            </SideBar>
        </template>
    </MainFormAdmin>
</template>