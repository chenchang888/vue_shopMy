<template>
  <div class="add_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="add_card">
      <el-alert title="添加商品信息" type="success" center></el-alert>
      <div class="step_wrap">
        <el-steps :space="200" :active="active" align-center process-status="process" finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>
      <div>
        <!-- 商品基本信息 -->
        <el-form v-if="baseGoodsForm" :model="baseGoodsForm" ref="baseGoodsForm" label-width="100px" label-position="top" class="demo-ruleForm">
          <el-tabs tab-position="left" value="0" @tab-click="handleTabs" :before-leave="handleLeaveTab">
            <el-tab-pane label="基本信息">
              <el-form-item label="商品名称" prop="goods_name" :rules="[
                        { required: true, message: '名称不能为空', trigger: 'blur'}]">
                <el-input v-model="baseGoodsForm.goods_name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="goods_price" :rules="[
                        { required: true, message: '价格不能为空', trigger: 'blur'}]">
                <el-input v-model="baseGoodsForm.goods_price" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight" :rules="[
                        { required: true, message: '重量不能为空', trigger: 'blur'}]">
                <el-input v-model="baseGoodsForm.goods_weight" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="goods_number" :rules="[
                        { required: true, message: '数量不能为空', trigger: 'blur'}]">
                <el-input v-model="baseGoodsForm.goods_number" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" prop="goods_cat" :rules="[
                        { required: true,  message: '商品分类不能为空',trigger: 'change'}]">
                <el-cascader v-model="value" :props="props" :options="goodsClassily" @change="handleChange"></el-cascader>
              </el-form-item>
            </el-tab-pane>
            <!-- 商品参数 -->
            <el-tab-pane label="商品参数">
              <div class="goods_params" v-for="item in goodsParameter" :key="item.id">
                <div class="goods_params_title">{{item.attr_name}}</div>
                <el-checkbox-group v-model="checkboxGroup2" size="mini" @change="checkNav">
                  <el-checkbox :label="item1" border v-for="(item1,index) in attr_vals" :key="index"></el-checkbox>
                </el-checkbox-group>
              </div>
            </el-tab-pane>
            <el-tab-pane label="商品属性">
              <!-- 商品属性 -->
              <el-form status-icon class="demo-ruleForm" label-position="top">
                <el-form-item :label="item.attr_name" v-for="item in goodsParameter" :key="item.attr_id">
                  <el-input type="text" autocomplete="off" v-model="item.attr_vals"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <!-- 商品图片 -->
            <el-tab-pane label="商品图片">
              <el-upload class="upload-demo" :headers="headersObj" action="http://127.0.0.1:8888/api/private/v1/upload" :on-success="handleSuccess" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-tab-pane>
            <!-- 商品内容 -->
            <el-tab-pane label="商品内容">
              <quill-editor class="content_edit" v-model="baseGoodsForm.goods_introduce" @change="onEditorChange($event)"></quill-editor>
              <el-button type="primary" @click="handleSubmit">完成</el-button>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { requestGoodsSubmit } from "../../api/index"
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  data() {
    return {
      active: 0, //激活步骤
      value: [], //商品分类值
      // options: [],
      props: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      // 分类id
      cart_id: '',
      // 动态商品参数选中项
      checkboxGroup2: [],
      // 动态商品参数
      attr_vals: [],
      // 商品属性
      goodsOnly: [],
      // 上传图片列表
      fileList: [],
      // 请求头
      headersObj: {
        Authorization: window.sessionStorage.getItem("token")
      },
      // 添加商品参数
      baseGoodsForm: {
        goods_name: '名称',
        goods_price: 10,
        goods_weight: 10,
        goods_number: 10,
        goods_cat: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
    }
  },
  components: {
    quillEditor
  },
  mounted() {
    this.$store.dispatch("getGoodsClassify", () => {
      this.$nextTick(() => {
        this.options = this.goodsClassily
      })
    })
  },
  methods: {
    // 切换标签菜单栏
    handleTabs(e) {
      if (e.index === "1") {
        this.$store.dispatch("getGoodsParameter", {
          id: this.cart_id,
          sel: "many"
        }).then(() => {
          // 返回的promise获取数据
          this.goodsParameter.forEach((item) => {
            this.attr_vals = item.attr_vals.split(",")
          })
        })
      } else if (e.index === "2") {
        this.$store.dispatch("getGoodsParameter", {
          id: this.cart_id,
          sel: "only",
          getParameter: () => {
            this.goodsOnly = this.goodsParameter
          }
        })
      }
    },
    // 更换tab栏
    handleLeaveTab(activeName, oldActiveName) {
      let flag = false
      if (this.$refs["baseGoodsForm"]) {
        this.$refs["baseGoodsForm"].validate((valid) => {
          if (valid) {
            flag = true
            this.active = Number(activeName)
          } else {
            this.$message.error("请完善基本信息")
            flag = false
          }
        })
      }
      if (oldActiveName === "0" && !flag) {
        return false
      }
    },
    // 分类选择
    handleChange() {
      this.cart_id = this.value[this.value.length - 1]
      this.baseGoodsForm.goods_cat = this.value.join(',')
    },
    // 动态参数选择
    checkNav(checkItem) {
      this.baseGoodsForm.attrs = checkItem
    },
    // 商品属性
    // 上传图片成功
    handleSuccess(response) {
      if (response.meta.status !== 200) {
        this.$message.error("上传失败")
        return
      }
      this.baseGoodsForm.pics.push({
        pic: response.data.tmp_path
      })
    },
    // 移除图片
    handleRemove(file) {
      const pics = this.baseGoodsForm.pics
      const tmp_path = file.response.data.tmp_path
      if (file.response.meta.status !== 200) {
        this.$message.error("删除失败")
        return
      }
      const index = pics.findIndex(item => item.pic === tmp_path)
      if (index === -1) {
        return
      }
      pics.splice(index, 1)
    },
    // 商品详情内容
    onEditorChange({ html }) {
      this.baseGoodsForm.goods_introduce = html
    },
    // 完成提交
    async handleSubmit() {
      const res = await requestGoodsSubmit(this.baseGoodsForm)
      res.data.meta.status !== 201 ? this.$message.error('添加失败') : this.$message.success('添加成功')
    }
  },
  computed: {
    ...mapState({
      goodsClassily: state => state.goods.goodsClassify,
      goodsParameter: state => state.goods.goodsparameter
    })
  }
}
</script>

<style lang="less" scoped>
.add_card {
  margin-top: 20px;
  .step_wrap {
    margin: 20px 0 20px 100px;
  }
  .goods_params {
    margin-bottom: 40px;
    .goods_params_title {
      margin-bottom: 20px;
    }
  }
  .el-button {
    margin: 20px 10px;
  }
  .content_edit {
    height: 500px;
    margin-bottom: 50px;
  }
}
</style>
