<template>
  <div>
    <el-form ref="firstImage" :model="firstImage" label-width="80px">
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          :action="BASE_API+'/upload/file'"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload">
          <img v-if="imageUrl!=null" :src="firstImage.imageUrl" class="avatar" width="300px" height="200px">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Update()">立即创建</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
      </el-form>
  </div>
</template>
<script>
import structure from '@/api/smart/structure'
export default {
  data(){
    return{
      firstImage:'',
      BASE_API: process.env.BASE_API,
      imageUrl:''
    }
  },
  created() {
    this.selectOrgnizationalFirst()
  },
  methods:{
    handleSuccess(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.firstImage.imageUrl = res.data.url
      this.imageUrl=res.data.url
      console.log(this.firstImage.image)
    },
    // watch: {  //监听
    //   $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
    //     this.init()
    //   }
    // },

    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt20M = file.size / 1024 / 1024 < 20

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG或 PNG 格式!')
      }
      if (!isLt20M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      return (isJPG || isPNG) && isLt20M
    },
    selectOrgnizationalFirst(){
      structure.selectOrgnizationalFirstImage().then(response=>{
        this.firstImage=response.data.data
        console.log(this.firstImage)

      })
      },
    Update(){
      structure.updateOrgnizationalFirstImage(this.firstImage).then(response=>{
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.$router.push({ path: '/structure/first'})
      })
    },
    cancel(){
      this.$router.push({ path: '/structure/list'})
    }
    }



}
</script>
