<template>
  <div>
    <el-form ref="organizationalStructure" :model="organizationalStructure" :rules="rules" label-width="80px">
      <el-form-item label="组织名字" prop="name">
        <el-input v-model="organizationalStructure.name"/>
      </el-form-item>
      <el-form-item label="组织标题">
        <el-input v-model="organizationalStructure.title"/>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          ref="upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/upload/file'"
          class="avatar-uploader">
          <img v-if="image1!=null" :src="organizationalStructure.image" width="300" height="200">
        </el-upload>
      </el-form-item>
      <el-form-item label="内容">
        <quill-editor
          ref="myQuillEditor"
          v-model="organizationalStructure.content"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate('organizationalStructure')">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
import structure from '@/api/smart/structure'

import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
export default {
  inject:['reload'],
  data() {
    return {
      rules:{
       name: [{required: true, message: "组织名字不能为空", trigger: "change"}],
      },
      organizationalStructure: {
        name: '',
        image: '',
        content: '',
        createTime: '',
        modifiedTime: ''
      },
      BASE_API: process.env.BASE_API, // 接口API地址
      // 富文本内容
      content: '',
      image1:'',
      editorOption: {}
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      // 判断路径有id值,做修改
      if (this.$route.params && this.$route.params.id) {
        // 从路径获取id值
        const id = this.$route.params.id
        console.log(id)
        // 调用根据id查询的方法
        this.selectById(id)
      }else{
        this.organizationalStructure={}
      }
    },
    handleAvatarSuccess(res, file) {
      console.log(res)// 上传响应
      console.log(URL.createObjectURL(file.raw))// base64编码
      this.image1=file.url
      this.organizationalStructure.image = res.data.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isJPG && !isPng) {
        this.$message.error('上传图片只能是 JPG或png 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return (isJPG || isPng) && isLt10M
    },
    saveOrUpdate(formName) {

      // 判断修改还是添加
      if (!this.organizationalStructure.id) {
        // 添加
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.addStructure()
            this.$router.push({path:'/structure/list'})
          } else {
            console.log("error submit!!");
            return false;
          }
        })

      } else {
        // 修改
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.updateStructure()
            this.$router.push({path:'/structure/list'})
          } else {
            console.log("error submit!!");
            return false;
          }
        });

      }
    },
    updateStructure() {
      structure.updateStructure(this.organizationalStructure)
        .then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push({ path: '/structure/list' })
          // 回到列表页面 路由跳转
        })
    },
    addStructure(){
      structure.addOrganizationalStructure(this.organizationalStructure).then(response => {
        // 提示信息
        this.$message({
          type: 'success',
          message: '增加成功!'
        })
        this.$router.push({ path: '/structure/list' })
        // 回到列表页面 路由跳转
      })
    },

    cancel() {
      this.$router.push({ path: '/structure/list' })
    },
    selectById(id) {
      structure.selectById(id).then(response => {
        this.organizationalStructure = response.data.data
      })
    },
    onEditorReady(editor) { // 准备编辑器

    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {} // 内容改变事件
  }

}
</script>

