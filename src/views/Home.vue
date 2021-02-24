<template>
  <div id="home_container">
    <el-container>
      <el-header>
        <h1>后台管理系统</h1>
        <div class="Login_out" @click="handleOutLogin">
          <el-button>退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-openeds="[]" background-color="#333744" text-color="#fff" active-text-color="" default-active="2-1">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-user-solid"></i>用户管理</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-s-opportunity"></i>权限管理</template>
              <el-menu-item index="2-1">选项2</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-s-goods"></i>商品管理</template>
              <el-menu-item index="3-1">选项2</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-s-order"></i>订单管理</template>
              <el-menu-item index="4-1">选项2</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-s-data"></i>数据统计</template>
              <el-menu-item index="5-1">选项2</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  mounted() {
    
  },
  methods: {
    handleOutLogin() {
      this.$router.push("/login")
      sessionStorage.clear("token")
    }
  }
}
</script>

<style lang="less" scoped>
#home_container {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      position: relative;
      color: #fff;
      font-size: 24px;
      background-color: #373d41;
      h1 {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .Login_out {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
      }
    }
    .el-aside {
      height: 100%;
      background-color: #333744;
    }
  }
}
</style>
