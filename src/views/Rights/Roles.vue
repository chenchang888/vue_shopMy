<template>
  <div id="roles_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button type="primary">添加角色</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="expand">
          <template v-slot="scop">
            <el-row v-for="item in scop.row.children" :key="item.id">
              <el-col :span="3">
                <el-tag closable @close="handleClose(scop.row,item.id)">{{item.authName}}</el-tag>
              </el-col>
              <el-col :span="21">
                <el-row v-for="item1 in item.children" :key="item1.id">
                  <el-col :span="4">
                    <el-tag closable @close="handleClose( scop.row,item1.id)">{{item1.authName}}</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-tag v-for="item2 in item1.children" :disable-transitions="false" :key="item2.id" closable @close="handleClose(scop.row,item2.id)">{{item2.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName">
        </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc">
        </el-table-column>
        <el-table-column label="操作" prop="desc">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEditRole(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteRole(scope.row)">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="handleSetRole(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 对话框 -->
    <el-dialog v-if="treeShow" title="分配权限" :close-on-click-modal="false" :visible.sync="dialogVisible" width="30%" @close="handleCloseDialog">
      <el-tree v-if="treeShow" :data="powersList" show-checkbox node-key="id" ref="tree" default-expand-all :default-checked-keys="checkedKeys" :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleTreeMesSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { requestDeleteRolePower, requestDeleteRole, requestUserSetPower } from "../../api/index"
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      data: [{
        id: 1,
        authName: '一级 1',
        children: [{
          id: 4,
          authName: '二级 1-1',
          children: [{
            id: 9,
            authName: '三级 1-1-1'
          }, {
            id: 10,
            authName: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        authName: '一级 2',
        children: [{
          id: 5,
          authName: '二级 2-1'
        }, {
          id: 6,
          authName: '二级 2-2'
        }]
      }, {
        id: 3,
        authName: '一级 3',
        children: [{
          id: 7,
          authName: '二级 3-1'
        }, {
          id: 8,
          authName: '二级 3-2'
        }]
      }],
      // 选中的节点
      checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 更新tree组件
      treeShow: false,
      // 当前选中的角色id
      roleID: ''
    }
  },
  mounted() {
    this.$store.dispatch("getRolesList", () => {
      this.$nextTick(() => {
        this.tableData = this.rolesList
      })
    }),
      this.$store.dispatch("getPowerList")
  },
  methods: {
    // 删除角色指定权限
    handleClose(row, rightId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await requestDeleteRolePower(row.id, rightId)
        if (res.data.meta.status !== 200) {
          return this.$message.error('删除权限失败！');
        }
        this.$message.success('删除成功');
        row.children = res.data.data
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    // 编辑角色权限

    // 删除角色
    handleDeleteRole(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await requestDeleteRole()
        if (res.data.meta.status !== 200) {
          return this.$message.error('删除角色失败！');
        }
        // 查找删除的元素
        const index = this.rolesList.findIndex((item) => item.id === row.id)
        if (index !== -1) {
          // 为减少服务器请求，改动原数组
          this.rolesList.splice(index, 1)
          this.$message.success('删除成功');
        }
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    // 分配角色权限
    handleSetRole(row) {
      this.roleID = row.id
      this.treeShow = true
      this.handleChooseKeys(row, this.checkedKeys)
      this.dialogVisible = true
    },
    // 筛选选中的节点
    handleChooseKeys(node, Keys) {
      if (!node.children) {
        return Keys.push(node.id)
      }
      node.children.forEach(item => {
        this.handleChooseKeys(item, Keys)
      });
    },
    // 监听对话框关闭事件
    handleCloseDialog() {
      this.checkedKeys = []
      this.treeShow = false
    },
    // 提交选中的权限节点
    async handleTreeMesSubmit() {
      console.log(this.roleID);
      // 获取节点
      const keys = [
        ...this.$refs.tree.getHalfCheckedKeys(),
        ...this.$refs.tree.getCheckedKeys()
      ]
      const keysObj = {
        roleId: this.roleID,
        rids: keys.join(',')
      }
      const res = await requestUserSetPower(keysObj)
      console.log(res);
      if (res.data.meta.status !== 200) {
        return this.$message.error("更新失败")
      }
      this.$message.success("更新成功")
      this.$store.dispatch("getRolesList", () => {
        this.$nextTick(() => {
          this.tableData = this.rolesList
        })
      })
    }
  },
  computed: {
    ...mapState({
      rolesList: state => state.rolesList,
      powersList: state => state.roles.powersList
    })
  }
}
</script>

<style lang="less" scoped>
#roles_container {
  .box-card {
    margin-top: 20px;
  }
}
.el-table {
  margin-top: 20px;
}
.el-row {
  display: flex;
  align-items: center;
  padding: 20px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.el-tag {
  margin-right: 10px;
}
</style>
