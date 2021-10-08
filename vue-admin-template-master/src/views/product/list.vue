<template>
  <div>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="产品名字">
        <el-input v-model="productQuery.name" placeholder="产品名字"/>
      </el-form-item>
      <el-form-item label="产品类别">
<!--        <el-input v-model="productQuery.categoryName" placeholder="产品类别"/>-->
        <el-select v-model="productQuery.categoryName" placeholder="请选择">
          <el-option
            v-for="item in category"
            :key="item.cid"
            :label="item.categoryName"
            :value="item.categoryName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品功能">
        <el-input v-model="productQuery.function" placeholder="产品功能"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="产品名字"
        width="150"/>
      <el-table-column
        prop="categoryName"
        label="产品分类"
        width="140"/>
      <el-table-column
        prop="function"
        label="产品功能"
        width="240"/>
      <el-table-column
        prop="createTime"
        label="开始时间"
        width="120"/>
      <el-table-column
        prop="modifiedTime"
        label="修改时间"
        width="120"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/product/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>

</template>

<script>

import product from '@/api/smart/product'
import productClass from '@/api/smart/productClass'

export default {
  // 写核心代码位置
  // data:{
  // },
  data() { // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 6, // 每页记录数
      total: 0, // 总记录数
      productQuery: {},
      category:[]
    }
  },
  created() { // 页面渲染之前执行，一般调用methods定义的方法
    // 调用
    this.getList()
    this.selectCategory()
  },
  methods: { // 创建具体的方法，调用teacher.js定义的方法
    // 讲师列表的方法
    getList(page = 1) {
      this.page = page
      product.getProductListPage(this.page, this.limit, this.productQuery)
        .then(response => { // 请求成功
          // response接口返回的数据
          // console.log(response)
          this.list = response.data.data
          this.total = response.data.total
        }).catch(function(error) { // 请求失败处理
          console.log(error)
        }

        )
    },
    resetData() { // 清空的方法
      // 表单输入项数据清空
      this.productQuery = {}
      // 查询所有数据
      this.getList()
    },
    // 删除的方法
    removeDataById(id) {
      this.$confirm('此操作将永久删除产品记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 点击确定，执行then方法
        // 调用删除的方法
        product.deleteProductById(id)
          .then(response => { // 删除成功
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 回到列表页面
            this.getList()
          })
      }) // 点击取消，执行catch方法
    },
    selectCategory(){
      productClass.selectCategory().then(response=>{
        this.category=response.data.data
      })
      }


  }
}
</script>

