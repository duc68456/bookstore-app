<script setup>
import BigUserIcon from '@/assets/icons-vue/big-user.vue'
import BigSettingIcon from '@/assets/icons-vue/big-setting.vue'
import NameText from '@/components/admin/texts/NameText.vue'
import RoleText from '@/components/admin/texts/RoleText.vue'
import TimeText from '@/components/admin/texts/TimeText.vue'
import DayText from '@/components/admin/texts/DayText.vue'
import LineTopBar from '@/components/admin/lines/LineTopBar.vue'
</script>

<template>
  <div class="window">
    <div class="logo">
      <BigUserIcon />
    </div>
    <div class="left-group">
      <div class="name">
        <NameText><template #text>Nisan Gunasekara</template></NameText>
      </div>
      <div class="role">
        <RoleText><template #text>Admin</template></RoleText>
      </div>
    </div>
    <div class="right-section">
      <div class="right-group">
        <div class="time">
          <TimeText><template #text>12:29 PM</template></TimeText>
        </div>
        <div class="day">
          <DayText><template #text>Sep 02, 2023</template></DayText>
        </div>
      </div>
      <div class="line">
        <LineTopBar />
      </div>
      <div class="setting">
        <BigSettingIcon />
      </div>
    </div>
  </div>
</template>

<style scoped>
.window {
  width: 100%;
  height: 71px;
  background: var(--vt-c-main-bg-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 20px;
  gap: 10px;
}

.left-group {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

.right-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  gap: 20px;
}

.right-group {
  align-items: flex-end;
  display: flex;
  flex-direction: column;
}

.logo,
.name,
.role,
.time,
.day,
.line,
.setting {
  display: flex;
  align-items: center;
}
</style>
