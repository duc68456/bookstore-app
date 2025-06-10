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
import ManageIcon from '@/assets/icons-vue/manage.vue'
import ManageIconWhite from '@/assets/icons-vue-white/manage.vue'
import ReportIcon from '@/assets/icons-vue/report.vue'
import ReportIconWhite from '@/assets/icons-vue-white/report.vue'
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
const Manage = () => router.push('/manage')
const Report = () => router.push('/report')

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}

import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="window">
    <div class="logo">
      <SmallMainLogo />
    </div>

    <div class="menu">

    <router-link to="/books" class="no-underline">
      <ButtonSideBar :class="{ 'active': isActive('/books') }">
        <template #btn-icon="{ hover }">
          <component :is="isActive('/books') || hover ? BookIcon : BookIconWhite" />
        </template>
        <template #btn-text>
          <ButtonText><template #text>Books</template></ButtonText>
        </template>
      </ButtonSideBar>
    </router-link>

    <router-link to="/users" class="no-underline">
      <ButtonSideBar :class="{ 'active': isActive('/users') }">
        <template #btn-icon="{ hover }">
          <component :is="isActive('/users') || hover ? PeopleIcon : PeopleIconWhite" />
        </template>
        <template #btn-text>
          <ButtonText><template #text>Users</template></ButtonText>
        </template>
      </ButtonSideBar>
    </router-link>

    <router-link to="/manage" class="no-underline">
      <ButtonSideBar :class="{ 'active': isActive('/manage') }">
        <template #btn-icon="{ hover }">
          <component :is="isActive('/manage') || hover ? ManageIcon : ManageIconWhite" />
        </template>
        <template #btn-text>
          <ButtonText><template #text>Manage</template></ButtonText>
        </template>
      </ButtonSideBar>
    </router-link>

    <router-link to="/report" class="no-underline">
      <ButtonSideBar :class="{ 'active': isActive('/report') }">
        <template #btn-icon="{ hover }">
          <component :is="isActive('/report') || hover ? ReportIcon : ReportIconWhite" />
        </template>
        <template #btn-text>
          <ButtonText><template #text>Report</template></ButtonText>
        </template>
      </ButtonSideBar>
    </router-link>

    </div>

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
  width: 14vw;
  height: 100vh;
  background: var(--vt-c-second-bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 20px;
  overflow: hidden;
}

.logo {
  margin-bottom: 16px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Khoảng cách giữa các nút */
  width: 100%;
  align-items: stretch;
  margin-bottom: auto;
}

.bottom {
  margin-top: auto;
  margin-bottom: 20px; /* Không quá sát đáy */
}

.router-link-active {
  background-color: var(--vt-c-active-bg-color); /* Add the background color for active button */
  color: var(--vt-c-active-text-color); /* Change text color */
}

.no-underline {
  text-decoration: none; /* Tắt gạch chân */
}
</style>
