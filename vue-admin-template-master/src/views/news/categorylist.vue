<template>
  <div>
    <el-button type="primary" size="mini" icon="el-icon-edit" @click="save()">增加</el-button>
    <el-table
      :data="categoryre"
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
        label="类别名"
        width="150"/>
      <el-table-column label="操作" width="320" align="center">
        <template slot-scope="scope">
          <router-link :to="'/news/categoryedit/'+scope.row.cid">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <router-link :to="'/news/categorysave'">
            <el-button type="primary" size="mini" icon="el-icon-edit">增加</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.cid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import newCategory from '@/api/smart/newsClass'
export default {
  data(){
    return{
      categoryre:[]
    }
  },
  created() {
    this.selectAllCatego()
  },
  methods:{
    selectAllCatego(){
      newCategory.selectCategory().then(response=>{
        this.categoryre=response.data.rows
        console.log(this.categoryre)
      })
    },
    removeDataById(id){
      newCategory.deleteCategory(id).then(response=>{
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.selectAllCatego()
        this.$router.push({path:'/news/categorylist'})
      })
    },
    save(){
      this.$router.push({path:'/news/categorysave'})
    }

  }

}
</script>
