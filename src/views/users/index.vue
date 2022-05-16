<template>
  <el-card>
    <el-row gutter="20">
      <el-col span="7">
        <el-input
          :placeholder="$t('table.placeholder')"
          clearable
          v-model="queryForm.query"
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search">{{
        $t('table.search')
      }}</el-button>
      <el-button type="primary">{{ $t('table.adduser') }}</el-button>
    </el-row>
  </el-card>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 2
})
</script>

<style lang="scss" scoped></style>
