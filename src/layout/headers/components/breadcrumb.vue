<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in BreadcrumbList" :key="index">
      <span class="no-redirect" v-if="index === BreadcrumbList.length - 1">{{
        // item.name
        $t(`menus.${item.name}`)
      }}</span>
      <span class="redirect" v-else @click="handleRedirect(item.path)">{{
        // item.name
        $t(`menus.${item.name}`)
      }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const BreadcrumbList = ref([])

const initBreadcrumbList = () => {
  BreadcrumbList.value = route.matched
  // console.log(route.matched)
}

const handleRedirect = (path) => {
  router.push(path)
}

watch(
  route,
  () => {
    initBreadcrumbList()
  },
  { deep: true, immediate: true }
)
</script>

<style lang="scss" scoped>
.no-redirect {
  color: #97a8be;
  cursor: text;
}
.redirect {
  color: #666;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    color: $menuBg;
  }
}
</style>
