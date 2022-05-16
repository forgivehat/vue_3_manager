<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link"> </span>
    <el-avatar shape="square" :size="40" :src="squareUrl"></el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const logout = () => {
  store.dispatch('app/logout')
}
const squareUrl = ref(
  'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
)
</script>

<style lang="scss" scoped>
// 这个是按F12看到的...
::v-deep .el-dropdown-menu__item {
  white-space: nowrap;
}
</style>
