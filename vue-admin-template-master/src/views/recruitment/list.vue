<template>
  <div>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="招聘职位">
        <el-input v-model="RecruQuery.position" placeholder="招聘职位"/>
      </el-form-item>
      <el-form-item label="招聘类别">
        <!--        <el-input v-model="newsQuery.name" placeholder="新闻分类"/>-->
        <el-select v-model="RecruQuery.name" placeholder="请选择">
          <el-option
            v-for="item in category"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
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
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="position"
        label="招聘职位"
        width="150"/>
      <el-table-column
        prop="name"
        label="招聘类别"
        width="120"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/recruitment/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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

import recru from '@/api/smart/recruitment'
import recruCate from '@/api/smart/recruitmentCategory'
export default {
  // 写核心代码位置
  // data:{
  // },
  data() { // 定义变量和初始值
    return {// 查询之后接口返回集合
      list: null,
      page: 1, // 当前页
      limit: 6, // 每页记录数
      total: 0, // 总记录数
      RecruQuery:{},
      category:[]
    }
  },
  created() { // 页面渲染之前执行，一般调用methods定义的方法
    // 调用
    this.getList()
    this.selectAllCategory()
  },
  methods: { // 创建具体的方法，调用recuritment.js定义的方法
    // 讲师列表的方法
    // 讲师列表的方法
    getList(page = 1) {
      this.page = page
      recru.selectAllCondition(this.page, this.limit, this.RecruQuery)
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
    removeDataById(id) {
      this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 点击确定，执行then方法
        // 调用删除的方法
        recru.deleteRecruitmentById(id)
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
    selectAllCategory(){
      recruCate.selectAllCategory().then(response=>{
        this.category=response.data.data
      })

    },
    resetData(){
      this.RecruQuery={}
      this.getList()
    }


  }
}
</script>

