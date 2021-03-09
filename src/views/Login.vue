<template>
  <div class="container">
    <div class="login_wrap">
      <div class="login_title">管理后台</div>
      <el-form :model="loginRuleForm" status-icon ref="loginRuleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="userAccount" :rules="[{ required: true, message: '账号不能为空'}]">
          <el-input v-model="loginRuleForm.userAccount" placeholder="请输入账号" prefix-icon="iconfont icon-zhanghuffffffpx"></el-input>
        </el-form-item>
        <el-form-item prop="password" :rules="[{ required: true, message: '密码不能为空'}]">
          <el-input placeholder="请输入密码" v-model="loginRuleForm.password" show-password prefix-icon="iconfont icon-mima"></el-input>
        </el-form-item>
        <el-form-item class="login_btn">
          <el-button type="primary" @click="submitLoginForm('loginRuleForm')">登录</el-button>
          <el-button @click="resetLoginForm('loginRuleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { requestLogin } from "../api/index"
export default {
  data() {
    return {
      loginRuleForm: {
        userAccount: "admin",
        password: "123456"
      }
    };
  },
  methods: {
    submitLoginForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await requestLogin(this.loginRuleForm)
          if (res.data.meta.status === 200) {
            const token = res.data.data.token
            sessionStorage.setItem('token', token)
            this.$router.push("/home")
          }else{
            this.$message.error("账号或密码错误")
          }
        } else {
          this.$message({
            showClose: true,
            message: '账号或密码错误',
            type: 'error',
            offset: 50
          });
          return false;
        }
      });
    },
    resetLoginForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  .login_wrap {
    position: relative;
    display: flex;
    align-items: center;
    width: 450px;
    height: 300px;
    border-radius: 10px;
    background-color: #fff;
    .login_title {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translate(-50%);
      font-size: 40px;
      color: #2b4b6b;
    }
    .el-form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      .login_btn {
        text-align: end;
      }
    }
  }
}
</style>
