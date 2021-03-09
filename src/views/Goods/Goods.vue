<template>
  <div id="goods_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="goods_card">
      <!-- 卡片头部搜索 -->
      <div class="box_card_search">
        <el-input placeholder="请输入内容" v-model="params.query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" class="add_goods_btn" @click="handleAddGoods">添加商品</el-button>
      </div>
      <!-- 表格区域 -->
      <el-table :data="goods.goods" border style="width: 100%">
        <el-table-column type="index" label="#" width="50">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="700">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格（元）">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column prop="upd_time" label="创建时间" width="200">>
          <template slot-scope="scope">
            {{scope.row.upd_time | dateFilter}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="150">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="params.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="goods.total">
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      params: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      goodsData: []
    }
  },
  mounted() {
    this.$store.dispatch("getGoodsData", this.params)
  },
  methods: {
    handleAddGoods() {
      this.$router.push('/goods/add')
    },
    handleSizeChange(val) {
      this.params.pagesize = val
      this.$store.dispatch("getGoodsData", this.params)
    },
    handleCurrentChange(val) {
      this.params.pagenum = val
      this.$store.dispatch("getGoodsData", this.params)
    }
  },
  computed: {
    ...mapState({
      goods: state => state.goods.goods
    })
  }
}
</script>

<style lang="less" scoped>
#goods_container {
  .el-card {
    margin-top: 20px;
    .box_card_search {
      .el-input {
        width: 500px;
      }
      .add_goods_btn {
        margin-left: 20px;
      }
    }
    .el-table {
      margin: 20px 0;
    }
  }
}
</style>
