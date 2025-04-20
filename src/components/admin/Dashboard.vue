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
import CatalogIcon from '@/assets/icons-vue/vector.vue'
import CatalogIconWhite from '@/assets/icons-vue-white/vector.vue'
import BookIcon from '@/assets/icons-vue/book.vue'
import BookIconWhite from '@/assets/icons-vue-white/book.vue'
import UserIcon from '@/assets/icons-vue/user.vue'
import UserIconWhite from '@/assets/icons-vue-white/user.vue'
import BranchesIcon from '@/assets/icons-vue/buildings.vue'
import BranchesIconWhite from '@/assets/icons-vue-white/buildings.vue'
import LogOutIcon from '@/assets/icons-vue/logout.vue'
import LogOutIconWhite from '@/assets/icons-vue-white/logout.vue'

const router = useRouter()
const username = ref('')
const password = ref('')

const logOut = () => {
    router.push('/')  // Điều hướng đến trang đăng nhập
}


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
                            <component :is="hover ? CatalogIcon : CatalogIconWhite" />
                        </template>
                        <template #btn-text>
                            <ButtonText>
                                <template #text>
                                    Catalog
                                </template>
                            </ButtonText>
                        </template>
                    </ButtonSideBar>
                </template>
                <template #btn4>
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
                <template #btn5>
                    <ButtonSideBar>
                        <template #btn-icon="{ hover }">
                            <component :is="hover ? BranchesIcon : BranchesIconWhite" />
                        </template>
                        <template #btn-text>
                            <ButtonText>
                                <template #text>
                                    Branches
                                </template>
                            </ButtonText>
                        </template>
                    </ButtonSideBar>
                </template>
                <template #btn-log-out>
                    <ButtonSideBar @click="logOut">
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
