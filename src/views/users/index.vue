<template>
  <el-card>
    <el-row :gutter="20" class="header">
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
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column
      :width="item.width"
      :prop="item.prop"
      :label="$t(`table.${item.label}`)"
      v-for="(item, index) in options"
      :key="index"
    >
      <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
        <el-switch v-model="row.mg_state" />
      </template>
      <template v-slot="{ row }" v-else-if="item.prop === 'create_time'">
        {{ $filters.filterTimes(row.create_time) }}
      </template>
      <template #default v-else-if="item.prop === 'action'">
        <el-button type="primary" :icon="Edit"></el-button>
        <el-button type="success" :icon="Setting"></el-button>
        <el-button type="danger" :icon="Delete"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { Search, Edit, Setting, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getUsers } from '@/api/user'
import { options } from './options'
const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 2
})

const tableData = ref([])

const initGetUsersList = async () => {
  const res = await getUsers(queryForm.value)
  tableData.value = res.users
}
initGetUsersList()
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}
</style>
