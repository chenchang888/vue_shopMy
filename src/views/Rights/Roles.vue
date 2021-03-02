<template>
  <div id="roles_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>、
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button type="primary">添加角色</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="expand">
<<<<<<< HEAD
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="角色名称" prop="id">
        </el-table-column>
        <el-table-column label="角色描述" prop="name">
=======
          <template v-slot="scop">
            <el-row v-for="item in scop.row.children" :key="item.id">
              <el-col :span="3">
                <el-tag>{{item.authName}}</el-tag>
              </el-col>
              <el-col :span="21">
                <el-row v-for="item1 in item.children" :key="item1.id">
                  <el-col :span="4">
                    <el-tag>{{item1.authName}}</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-tag v-for="item2 in item.children" :key="item2.id">{{item2.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName">
        </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc">
>>>>>>> users
        </el-table-column>
        <el-table-column label="操作" prop="desc">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
<<<<<<< HEAD
      tableData: {}
    }
  },
=======
      tableData: []
    }
  },
  mounted() {
    this.$store.dispatch("getRolesList", () => {
      this.$nextTick(() => {
        this.tableData = this.rolesList
      })
    })
  },
  methods: {

  },
  computed: {
    ...mapState({
      rolesList: state => state.rolesList
    })
  }
>>>>>>> users
}
</script>

<style lang="less" scoped>
#roles_container {
  .box-card {
    margin-top: 20px;
  }
}
<<<<<<< HEAD
=======
.el-table{
  margin-top: 20px;
}
.el-row {
  display: flex;
  align-items: center;
  padding: 20px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.el-tag{
  margin-right: 10px;
}
>>>>>>> users
</style>
