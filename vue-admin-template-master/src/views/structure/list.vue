<template>
  <div>
    <el-table
      :data="this.list"
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
        prop="name"
        label="名字"
        width="150"/>
      <el-table-column
        prop="title"
        label="标题"
        width="150"/>
      <el-table-column label="图片" width="120px">
        <template width="90" slot-scope="scope">
          <img style="width:100px;height:100px;border:none;" :src="scope.row.image">
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/structure/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" style="width: 73px"  @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// 引入调用teacher.js文件
import structure from '@/api/smart/structure'

export default {
  // 写核心代码位置
  // data:{
  // },
  data() { // 定义变量和初始值
    return {
      list:[],
    }
  },
  created() { // 页面渲染之前执行，一般调用methods定义的方法
    // 调用
    this.getList()
  },
  methods: { // 创建具体的方法，调用structure.js定义的方法

    getList() {
      structure.selectAll().then(response => { // 请求成功
        // response接口返回的数据
        // console.log(response)
        this.list = response.data.data

      }).catch(function(error) { // 请求失败处理
        console.log(error)
      }
      )
    },
    removeDataById(id){
      structure.deleteOrganizationalStructureById(id).then(response=>{
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getList()
        // this.reload()
      })
    }


  }
}
</script>

