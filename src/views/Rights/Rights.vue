<template>
  <div id="rights_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="rights" style="width: 100%" border>
      <el-table-column type="index" label="#">
      </el-table-column>
      <el-table-column prop="authName" label="权限名称">
      </el-table-column>
      <el-table-column prop="path" label="路径">
      </el-table-column>
      <el-table-column prop="level" label="权限等级">
        <template v-slot="scope">
          <el-tag v-if="scope.row.level==0">一级</el-tag>
          <el-tag v-else-if="scope.row.level==1" type="success">二级</el-tag>
          <el-tag v-else type="warning">三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.$store.dispatch("getRightsList")
  },
  methods: {
  },
  computed: {
    ...mapState({
      rights: state => state.rights.rights
    })
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 20px;
}
</style>
