<template>
  <div>
    <el-form ref="environmentImage" :model="environmentImage" label-width="80px">
      <el-form-item label="图片说明">
        <el-input v-model="environmentImage.description"></el-input>
      </el-form-item>
      <el-form-item label="图片">
      <el-upload
        class="avatar-uploader"
        :action="BASE_API+'/upload/file'"
        :show-file-list="false"
        :on-success="handleSuccess"
        :before-upload="beforeUpload">
        <img v-if="imageUrl!=null" :src="environmentImage.imageUrl" class="avatar" width="300px" height="200px">
        <i class="el-icon-plus"></i>
      </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Update()">确认修改</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
      </el-form>
  </div>
</template>
<script>
import join from '@/api/smart/join'
export default {
  data(){
    return{
      environmentImage:{},
      imageUrl:'',
      BASE_API: process.env.BASE_API,
    }
  },
  created() {
    this.init()
  },
  methods:{
    init(){
      if (this.$route.params && this.$route.params.id) {
        // 从路径获取id值
        const id = this.$route.params.id
        console.log(id)
        // 调用根据id查询的方法
        join.selectImageById(id).then(response=>{
          this.environmentImage=response.data.data
          console.log(this.environmentImage)
        })
    }
  },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG或 PNG 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return (isJPG || isPNG) && isLt10M
    },
    handleSuccess(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.environmentImage.imageUrl = res.data.url
      this.imageUrl=file.url
      console.log(this.environmentImage.image)
    },
    Update(){
      join.updateImage(this.environmentImage).then(response=>{
        // if(response.code===20000){
          this.$message({
            type: 'success',
            message: '修改成功!'})

        this.$router.push({ path: '/join/save' })
      })

    },
    cancel(){
      this.environmentImage={}
      this.$router.push({path:'/join/save'})
    }

}


}
</script>
