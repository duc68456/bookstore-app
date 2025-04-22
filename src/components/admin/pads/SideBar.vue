<script setup>
import SmallMainLogo from '@/components/MainLogo/SmallMainLogo.vue'
import ButtonSideBar from '@/components/admin/buttons/ButtonSideBar.vue'
import ButtonText from '@/components/admin/texts/ButtonText.vue'

import ElementIcon from '@/assets/icons-vue/element.vue'
import ElementIconWhite from '@/assets/icons-vue-white/element.vue'
import DiscoverIcon from '@/assets/icons-vue/discover.vue'
import DiscoverIconWhite from '@/assets/icons-vue-white/discover.vue'
import BookIcon from '@/assets/icons-vue/book.vue'
import BookIconWhite from '@/assets/icons-vue-white/book.vue'
import PeopleIcon from '@/assets/icons-vue/people.vue'
import PeopleIconWhite from '@/assets/icons-vue-white/people.vue'
import BranchesIcon from '@/assets/icons-vue/buildings.vue'
import BranchesIconWhite from '@/assets/icons-vue-white/buildings.vue'
import LogOutIcon from '@/assets/icons-vue/logout.vue'
import LogOutIconWhite from '@/assets/icons-vue-white/logout.vue'

import { useRouter } from 'vue-router'
const router = useRouter()
const logOut = () => router.push('/')
const Dashboard = () => router.push('/dashboard')
const Catalog = () => router.push('/catalog')
const Books = () => router.push('/books')
const Users = () => router.push('/users')
const Branches = () => router.push('/branches')

</script>

<template>
  <div class="window">
    <div class="logo">
      <SmallMainLogo />
    </div>

    <ButtonSideBar @click="Dashboard">
      <template #btn-icon="{ hover }">
        <component :is="hover ? ElementIcon : ElementIconWhite" />
      </template>
      <template #btn-text>
        <ButtonText><template #text>Dashboard</template></ButtonText>
      </template>
    </ButtonSideBar>

    <ButtonSideBar @click="Catalog">
      <template #btn-icon="{ hover }">
        <component :is="hover ? DiscoverIcon : DiscoverIconWhite" />
      </template>
      <template #btn-text>
        <ButtonText><template #text>Catalog</template></ButtonText>
      </template>
    </ButtonSideBar>

    <ButtonSideBar @click="Books">
      <template #btn-icon="{ hover }">
        <component :is="hover ? BookIcon : BookIconWhite" />
      </template>
      <template #btn-text>
        <ButtonText><template #text>Books</template></ButtonText>
      </template>
    </ButtonSideBar>

    <ButtonSideBar @click="Users">
      <template #btn-icon="{ hover }">
        <component :is="hover ? PeopleIcon : PeopleIconWhite" />
      </template>
      <template #btn-text>
        <ButtonText><template #text>Users</template></ButtonText>
      </template>
    </ButtonSideBar>

    <ButtonSideBar @click="Branches">
      <template #btn-icon="{ hover }">
        <component :is="hover ? BranchesIcon : BranchesIconWhite" />
      </template>
      <template #btn-text>
        <ButtonText><template #text>Branches</template></ButtonText>
      </template>
    </ButtonSideBar>

    <div class="bottom">
      <ButtonSideBar @click="logOut">
        <template #btn-icon="{ hover }">
          <component :is="hover ? LogOutIcon : LogOutIconWhite" />
        </template>
        <template #btn-text>
          <ButtonText><template #text>Log Out</template></ButtonText>
        </template>
      </ButtonSideBar>
    </div>
  </div>
</template>

<style scoped>
.window {
  width: 222px;
  height: 100vh;
  background: var(--vt-c-second-bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
}

.logo {
  margin-bottom: 8px;
}

.bottom {
  margin-top: auto;
  margin-bottom: 8px;
}
</style>
