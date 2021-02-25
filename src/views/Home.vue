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
          <el-menu background-color="#333744" text-color="#fff" unique-opened router :default-active="activePath">
            <el-submenu :index="'/'+menu.path" v-for="menu in leftMenus" :key="menu.id">
              <template slot="title"><i :class="menusIcon[menu.id]"></i>{{menu.authName}}</template>
              <el-menu-item :index="'/'+menuchild.path" v-for="menuchild in menu.children" :key="menuchild.id" @click="handleMenu('/'+menuchild.path)">{{menuchild.authName}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      // 当前导航菜单激活状态
      activePath: "",
      // 菜单栏icon
      menusIcon: {
        '125': 'el-icon-user-solid',
        '103': 'el-icon-s-opportunity',
        '101': 'el-icon-s-goods',
        '102': 'el-icon-s-order',
        '145': 'el-icon-s-data'
      }
    }
  },
  mounted() {
    this.$store.dispatch("getLeftMenus"),
      // 页面刷新时
      this.activePath = window.sessionStorage.getItem("activePath") || "/users"

  },
  methods: {
    handleOutLogin() {
      this.$router.push("/login")
      sessionStorage.clear("token")
    },
    handleMenu(path) {
      window.sessionStorage.setItem('activePath', path)
      this.activePath = path
    }
  },
  computed: {
    ...mapState({
      leftMenus: (state) => {
        return state.leftMenus
      }
    })
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
