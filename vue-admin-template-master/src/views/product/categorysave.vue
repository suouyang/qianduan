<template>
  <div>
    <el-form ref="category" :model="category" :rules="rules" label-width="100px">
      <el-form-item label="产品类别" prop="categoryName">
        <el-input v-model="category.categoryName" style="width:150px"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate('category')">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import productClass from '@/api/smart/productClass'
export default {
  data(){

    return{
      rules:{
        categoryName: [{required: true, message: "产品类别不能为空", trigger: "change"}],
        // cid: [{required: true, message: "新闻类别不能为空", trigger: "change"}]
      },
      category:{
        name:''
      }
    }
  },
  created() {
    this.init()
  },
  methods:{
    init(){
      if(this.$route.params.id && this.$route.params){
        const id=this.$route.params.id
        console.log(id)
        productClass.selectCategoryById(id).then(response=>{
          this.category=response.data.data
          console.log(this.category)
        })
      }else{
        this.category={}
      }
    },
    saveOrUpdate(formName) {

      // 判断修改还是添加
      if (!this.category.cid) {
        // 添加
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.save()
            this.$router.push({path:'/product/categorylist'})
          } else {
            console.log("error submit!!");
            return false;
          }
        });

      } else {
        // 修改
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.update()
            this.$router.push({path:'/product/categorylist'})
          } else {
            console.log("error submit!!");
            return false;
          }
        });

      }
    },
    update(){
      productClass.updateCategory(this.category).then(response=>{
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
        this.$router.push({path:'/product/categorylist'})
      })
    },
    save(){
      productClass.addCategory(this.category).then(response=>{
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.$router.push({path:'/product/categorylist'})

      })
    },
    cancel(){
      this.$router.push({path:'/product/categorylist'})
    }


  }
}
</script>
