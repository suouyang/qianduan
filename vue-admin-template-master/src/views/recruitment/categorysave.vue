<template>
  <div>
    <el-form ref="category" :model="category" :rules="rules" label-width="100px">
      <el-form-item label="招聘类别名" prop="name">
        <el-input v-model="category.name" style="width:150px"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate('category')">立即创建</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
      </el-form>
  </div>
</template>
<script>
import recrucate from '@/api/smart/recruitmentCategory'
export default {
  data(){
    return{
      rules:{
        name: [{required: true, message: "招聘类别不能为空", trigger: "change"}],
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
        const cid=this.$route.params.id
        console.log(cid)
        recrucate.selectCategoryById(cid).then(response=>{
          this.category=response.data.data
          console.log(this.category)
        })
      }else{
        this.category={}
      }
    },
    // saveOrUpdate(){
    //   if(this.category.cid){
    //     this.update()
    //   }else{
    //     this.save()
    //   }
    // },
    saveOrUpdate(formName) {

      // 判断修改还是添加
      if (!this.category.cid) {
        // 添加
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.save()
            // this.$router.push({path:'/news/categorylist'})
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
            // this.$router.push({path:'/recruitment/categorylist'})
          } else {
            console.log("error submit!!");
            return false;
          }
        });

      }
    },
    update(){
      recrucate.updateCategory(this.category).then(response=>{
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
        this.$router.push({path:'/recruitment/categorylist'})
      })
    },
    save(){
      recrucate.addCategory(this.category).then(response=>{
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.$router.push({path:'/recruitment/categorylist'})

      })
    },
    cancel(){
      this.$router.push({path:'/recruitment/categorylist'})
    }


  }
}
</script>
