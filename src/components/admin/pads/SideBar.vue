<script setup>
import SmallMainLogo from '@/components/MainLogo/SmallMainLogo.vue'
import ButtonSideBar from '@/components/admin/buttons/ButtonSideBar.vue'
import ButtonText from '@/components/admin/texts/ButtonText.vue'

// Icons
import BookIconWhite from '@/assets/icons-vue-white/book.vue'
import LogOutIconWhite from '@/assets/icons-vue-white/logout.vue'
import ManageIconWhite from '@/assets/icons-vue-white/manage.vue'
import PeopleIconWhite from '@/assets/icons-vue-white/people.vue'
import ReportIconWhite from '@/assets/icons-vue-white/report.vue'
import BookIcon from '@/assets/icons-vue/book.vue'
import LogOutIcon from '@/assets/icons-vue/logout.vue'
import ManageIcon from '@/assets/icons-vue/manage.vue'
import PeopleIcon from '@/assets/icons-vue/people.vue'
import ReportIcon from '@/assets/icons-vue/report.vue'

import { useAuthorStore } from '@/data/authors'
import { useCategoryStore } from '@/data/categories'
import { useUser } from '@/data/user'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const userStore = useUser()
const categoryStore = useCategoryStore()
const authorStore = useAuthorStore()

// Navigation actions
const goDashboard = () => router.push('/dashboard')
const goCatalog = () => router.push('/catalog')
const goBooks = () => {
  categoryStore.fetchCategories();
  authorStore.fetchAuthors();
  router.push('/books')
}
const goUsers = async () => {
  try {
    await userStore.fetchUsers()
    router.push('/users')
  } catch (e) {
    console.error('Cannot fetch users:', e)
  }
}
const goBranches = () => router.push('/branches')
const goManage = () => router.push('/manage')
const goReport = () => router.push('/report')
const logOut = () => router.push('/')

// Active route checker
const isActive = (path) => route.path === path || route.path.startsWith(path + '/')
</script>

<template>
  <div class="window">
    <div class="logo">
      <SmallMainLogo />
    </div>

    <div class="menu">
      <ButtonSideBar @click="goBooks" :class="{ 'active': isActive('/books') }">
        <template #btn-icon="{ hover }">
          <component :is="isActive('/books') || hover ? BookIcon : BookIconWhite" />
        </template>
        <template #btn-text>
          <ButtonText><template #text>Books</template></ButtonText>
        </template>
      </ButtonSideBar>

      <ButtonSideBar @click="goUsers" :class="{ 'active': isActive('/users') }">
        <template #btn-icon="{ hover }">
          <component :is="isActive('/users') || hover ? PeopleIcon : PeopleIconWhite" />
        </template>
        <template #btn-text>
          <ButtonText><template #text>Users</template></ButtonText>
        </template>
      </ButtonSideBar>

      <ButtonSideBar @click="goManage" :class="{ 'active': isActive('/manage') }">
        <template #btn-icon="{ hover }">
          <component :is="isActive('/manage') || hover ? ManageIcon : ManageIconWhite" />
        </template>
        <template #btn-text>
          <ButtonText><template #text>Manage</template></ButtonText>
        </template>
      </ButtonSideBar>

      <ButtonSideBar @click="goReport" :class="{ 'active': isActive('/report') }">
        <template #btn-icon="{ hover }">
          <component :is="isActive('/report') || hover ? ReportIcon : ReportIconWhite" />
        </template>
        <template #btn-text>
          <ButtonText><template #text>Report</template></ButtonText>
        </template>
      </ButtonSideBar>
    </div>

    <div class="bottom">
      <ButtonSideBar @click="logOut">
        <template #btn-icon="{ hover }">
          <component :is="hover ? LogOutIcon : LogOutIconWhite" />
        </template>
        <template #btn-text>
          <ButtonText><template #text>Logout</template></ButtonText>
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
  gap: 10px;
  width: 100%;
  align-items: stretch;
  margin-bottom: auto;
}

.bottom {
  margin-top: auto;
  margin-bottom: 20px;
}

/* Active styles via .active class */
.active {
  background-color: var(--vt-c-active-bg-color);
  color: var(--vt-c-active-text-color);
}
</style>
