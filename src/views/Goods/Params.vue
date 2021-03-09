<template>
  <div id="params_container">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体 -->
    <el-card class="box-card">
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon>
      </el-alert>
      <!-- 选择商品分类 -->
      <div class="choose_cart">
        <span class="demonstration">选择商品分类：</span>
        <el-cascader v-model="value" :options="options" :props="props" @change="handleChange"></el-cascader>
      </div>
      <!-- 标签页 -->
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="动态参数" name="first">
            <el-button type="primary">添加参数</el-button>
            <el-table :data="tableData" type="expand" style="width: 100%">
              <el-table-column prop="" label="" width="180">
              </el-table-column>
              <el-table-column prop="" label="#" type="index" width="180">
              </el-table-column>
              <el-table-column prop="" label="属性名称" width="180">
              </el-table-column>
              <el-table-column prop="" label="操作">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="静态属性" name="second">
            <el-button type="primary">添加属性</el-button>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      value: [],
      options: [],
      props: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      activeName: 'first',
      tableData: [],
      cart_id: ""
    }
  },
  mounted() {
    this.$store.dispatch("getGoodsClassify").then(() => {
      console.log(this.goodsClassify);
      this.options = this.goodsClassify
    })
  },
  methods: {
    handleChange(value) {
      console.log(value);
      console.log(this.value);
    },
    // 标签页切换
    handleClick(tab, e) {
      console.log(tab.index);
      console.log(e);
      if (tab.index === "0") {
        this.$store.dispatch("getGoodsParameter", {
          id: this.cart_id,
          sel: "many"
        }).then(() => {
          // 返回的promise获取数据
          this.goodsParameter.forEach((item) => {
            this.attr_vals = item.attr_vals.split(",")
          })
        })
      } else if (tab.index === "1") {
        this.$store.dispatch("getGoodsParameter", {
          id: this.cart_id,
          sel: "only",
          getParameter: () => {
            this.goodsOnly = this.goodsParameter
          }
        })
      }
    }
  },
  computed: {
    ...mapState({
      goodsClassify: state => state.goods.goodsClassify
    })
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 20px;
  .choose_cart {
    margin: 20px 0;
  }
}
</style>
