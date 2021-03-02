<template>
  <div id="users_container">
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box_card">
      <!-- 卡片头部搜索 -->
      <div class="box_card_search">
        <el-input placeholder="请输入内容" v-model="searchContent" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" class="add_user_btn" @click="handleAddUser">添加用户</el-button>
      </div>
      <!-- 表格区域 -->
      <div class="box_card_table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="#" width="50">
          </el-table-column>
          <el-table-column prop="username" label="姓名">
          </el-table-column>
          <el-table-column prop="email" label="邮箱">
          </el-table-column>
          <el-table-column prop="mobile" label="电话">
          </el-table-column>
          <el-table-column prop="role_name" label="角色">
          </el-table-column>
          <el-table-column prop="mg_state" label="状态" width="180">
            <template v-slot="scope">
              <el-switch v-model="scope.row.mg_state" active-color="#13ce66" @change="handleSwitch(scope)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="180">
            <template v-slot="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleUserEdit(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleUserDelete(scope.row)"></el-button>
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="handleUserSetting(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[1, 2, 5, 10]" :page-size="usersParams.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加用户对话框区域 -->
    <el-dialog title="添加用户" :visible.sync="addUserDialog" :close-on-click-modal="false">
      <el-form :model="addForm" ref="addForm" :rules="addFormRules" label-width="100px" class="demo-ruleForm">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input type="passWord" v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!-- 提交取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleAddFormSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户弹框区域开始 -->
    <el-dialog title="修改用户" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="ruleForm" ref="nalidateForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off" disabled></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="ruleForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!-- 提交取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleFormSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户弹框区域end -->
    <!-- 分配角色区域 -->
    <el-dialog title="分配角色" :visible.sync="distributionVisible">
      <el-form :model="distributionForm">
        <el-form-item label="当前用户：" :label-width="formLabelWidth">{{distributionForm.username}}</el-form-item>
        <el-form-item label="当前角色：" :label-width="formLabelWidth">{{distributionForm.role_name}}</el-form-item>
        <el-form-item label="活动区域：" :label-width="formLabelWidth">
          <el-select v-model="distributionForm.rid" placeholder="请选择活动区域">
            <el-option v-for="role in rolesList" :key="role.id" :label="role.roleName" :value="role.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="distributionVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUserSetting">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { requestChangeStatus, requestSetUserInfo, requestAddUser, requestDeleteUser, requestRolesList, requestUserSetting } from "../../api/index"
export default {
  data() {
    // 验证手机号
    var checkMobileRules = (rule, value, callback) => {
      if (!value.trim()) {
        return callback(new Error('手机号不能为空'));
      }
      const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (!reg.test(value)) {
        return callback(new Error('请输入正确的手机号'));
      }
      return callback()
    }
    // 验证邮箱
    var checkEmailRules = (rule, value, callback) => {
      if (!value.trim()) {
        return callback(new Error('邮箱不能为空'));
      }
      const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (!reg.test(value)) {
        return callback(new Error('请输入正确的邮箱'));
      }
      return callback()
    }
    return {
      // 用户列表请求参数
      usersParams: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      // 搜索内容
      searchContent: '',
      // 用户列表数据
      tableData: [],
      // 添加用户
      addUserDialog: false,
      // 添加用户表单验证
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addFormRules: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['change', 'blur'] },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: ['change', 'blur'] }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { validator: checkEmailRules, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobileRules, trigger: 'blur' }
        ]
      },
      // 用户编辑弹框
      dialogFormVisible: false,
      // 用户表单数据验证
      ruleForm: {
        id: "",
        name: "",
        email: "",
        mobile: ""
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { validator: checkEmailRules, trigger: ['change', 'blur'] }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobileRules, trigger: ['change', 'blur'] }
        ]
      },
      // 角色权限
      distributionVisible: false,
      distributionForm: {
        id: "",
        rid: "",
        username: "",
        role_name: ""
      },
      rolesList: [],
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.triggerGetuserlist()
  },
  methods: {
    // dispatch触发getuserlist
    triggerGetuserlist() {
      this.$store.dispatch("getuserlist", {
        usersParams: this.usersParams,
        getuserlist: () => {
          this.tableData = this.usersList
        }
      })
    },
    // 单页条数改变
    handleSizeChange(val) {
      this.usersParams.pagesize = val
      this.triggerGetuserlist()
    },
    // 页数改变
    handleCurrentChange(val) {
      this.usersParams.pagenum = val
      this.triggerGetuserlist()
    },
    // 添加用户
    handleAddUser() {
      this.addUserDialog = true
    },
    handleAddFormSubmit() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          this.addUserDialog = false
          this.addForm.name = "",
            this.addForm.passWord = "",
            this.addForm.email = "",
            this.addForm.mobile = ""
          const res = await requestAddUser(this.addForm)
          console.log(res);
          if (res.data.meta.status === 201) {
            this.triggerGetuserlist()
            this.$message({
              showClose: true,
              message: '添加用户成功',
              type: 'success'
            })
          }
        }

      })
    },

    // 更改用户状态
    async handleSwitch(scope) {
      const res = await requestChangeStatus({ id: scope.row.id, status: scope.row.mg_state })
      if (res.data.meta.status === 200) {
        this.$message({
          showClose: true,
          message: '更改状态成功',
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: '更改状态失败',
          type: 'error'
        })
      }
    },


    // 编辑用户信息
    handleUserEdit({ id, username, email, mobile }) {
      this.ruleForm.id = id
      this.ruleForm.name = username
      this.ruleForm.email = email
      this.ruleForm.mobile = mobile
      this.dialogFormVisible = true
    },
    // 提交
    handleFormSubmit() {
      this.$refs.nalidateForm.validate(async (valid) => {
        if (valid) {
          const res = await requestSetUserInfo(this.ruleForm)
          if (res.data.meta.status === 200) {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            });
            const userIndex = this.usersList.findIndex(item => item.id === this.ruleForm.id)
            this.usersList[userIndex].email = this.ruleForm.email
            this.usersList[userIndex].mobile = this.ruleForm.mobile
            this.dialogFormVisible = false
          }
        } else {
          return false;
        }
      });
    },
    // 删除用户信息
    handleUserDelete({ id }) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await requestDeleteUser(id)
        console.log(res);
        if (res.data.meta.status === 200) {
          this.triggerGetuserlist()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 用户分配角色
    async handleUserSetting({ username, role_name, id }) {
      // 获取角色列表
      const res = await requestRolesList()
      if (res.data.meta.status === 200) {
        this.rolesList = res.data.data
      }
      this.distributionVisible = true
      this.distributionForm.id = id
      this.distributionForm.username = username
      this.distributionForm.role_name = role_name
    },
    // 用户分配提交
    async submitUserSetting() {
      const res = await requestUserSetting(this.distributionForm)
      if (res.data.meta.status === 200) {
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        });
        this.distributionVisible = false
        this.triggerGetuserlist()
      }
    }
  },
  computed: {
    ...mapState({
      usersList: state => state.users.usersList,
      total: state => state.users.total
    })
  }
}
</script>

<style lang="less" scoped>
#users_container {
  .el-card {
    margin-top: 20px;
    .box_card_search {
      .el-input {
        width: 500px;
      }
      .add_user_btn {
        margin-left: 20px;
      }
    }
    .box_card_table {
      margin: 20px 0;
    }
  }
}
</style>
