<template>
  <div>
    <el-table
      :data="company"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="公司名称"
        width="250"/>
      <el-table-column
        prop="address"
        label="公司地址"
        width="250"/>
      <el-table-column
        prop="phone"
        label="公司电话"
        width="120"/>
      <el-table-column
        prop="development"
        label="发展方向"
        width="250"/>
      <el-table-column
        prop="postCode"
        label="邮政编码"
        width="120"/>


      <!--      <el-table-column label="新闻缩略图" width="120px">-->
      <!--        <template width="90" slot-scope="scope">-->
      <!--          <img style="width:100px;height:100px;border:none;" :src="scope.row.image">-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="createTime"-->
      <!--        label="开始时间"-->
      <!--        width="120"/>-->
      <!--      <el-table-column-->
      <!--        prop="modifiedTime"-->
      <!--        label="修改时间"-->
      <!--        width="120"/>-->
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <router-link :to="'/company/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>

import company from '@/api/smart/company'

export default {
  // 写核心代码位置
  // data:{
  // },
  data() { // 定义变量和初始值
    return {
      list: null,
      company:[]// 查询之后接口返回集合
    }
  },
  created() { // 页面渲染之前执行，一般调用methods定义的方法
    // 调用
    this.getList()
  },
  methods: { // 创建具体的方法，调用teacher.js定义的方法
    // 讲师列表的方法
    getList() {

      company.selectCompanyInfo()
        .then(response => { // 请求成功
          // response接口返回的数据
          // console.log(response)
          this.list = response.data.data
          this.company.push(this.list)
        }).catch(function(error) { // 请求失败处理
          console.log(error)
        }

      )
    },

  }
}
</script>

