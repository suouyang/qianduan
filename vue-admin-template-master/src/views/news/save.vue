<template>
  <div>
    <el-form ref="newsInfo" :model="newsInfo" :rules="rules" label-width="80px">
      <el-form-item label="新闻标题" prop="title">
        <el-input v-model="newsInfo.title" style="width: 420px"></el-input>
      </el-form-item>
      <el-form-item label="新闻分类" prop="cid">
        <el-select v-model="newsInfo.cid" placeholder="请选择">
          <el-option
            v-for="item in categoryName"
            :key="item.cid"
            :label="item.name"
            :value="item.cid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发表时间">
        <el-date-picker
          v-model="newsInfo.createTime"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="讲师头像">

        <!-- 头衔缩略图 -->
        <pan-thumb :image="newsInfo.image"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>

        <!--
    v-show：是否显示上传组件
    :key：类似于id，如果一个页面多个图片上传控件，可以做区分
    :url：后台上传的url地址
    @close：关闭上传组件
    @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/upload/file'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>

      </el-form-item>
      <el-form-item label="新闻描述">
        <textarea v-model="newsInfo.description" style="width: 620px"></textarea>
      </el-form-item>
      <el-form-item label="内容">
        <quill-editor
          style="width: 900px"
          v-model="newsInfo.content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
          @change="onEditorChange($event)">
        </quill-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate('newsInfo')">立即创建</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>

  </div>

</template>
<script>
import news from '@/api/smart/news'
import newsClass from '@/api/smart/newsClass'
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
// require styles
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      rules:{
        title: [{required: true, message: "新闻标题不能为空", trigger: "change"}],
        cid: [{required: true, message: "新闻类别不能为空", trigger: "change"}]
      },
      dialogVisible: false,
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [7, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      newsInfo: {
        title: '',
        cid:'',
        name:'',
        content: '',
        image: '',
        description: '',
        createTime: '',
        modifiedTime: '',
      },
      picsList:[],
      loading: false,
      imagecropperKey:0,
      image3:'',
      imagecropperShow:false,
      saveBtnDisabled:false,
      categoryName:[],
      BASE_API: process.env.BASE_API,// 接口API地址
      //富文本内容
      content: "",
      editorOption: {}
    }
  },

  created() {
    this.selectCategory()
    this.init()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res)// 上传响应
      console.log(URL.createObjectURL(file.raw))// base64编码
      this.newsInfo.image = res.data.url
      this.image3=res.data.url
      console.log(this.newsInfo.image)
    },
    // 上传成功后的回调函数
    cropSuccess(data) {
      console.log(data)
      this.imagecropperShow = false
      this.newsInfo.image = data.url
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    },

    close() {
      this.imagecropperShow = false
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
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

    addNews() {
      news.addNews(this.newsInfo)
        .then(response => {//添加成功
          //提示信息
          // console.log(response)
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/news/list'})
        })
    },
    init() {
      //判断路径有id值,做修改
      if(this.$route.params && this.$route.params.id) {
        //从路径获取id值
        const id = this.$route.params.id
        console.log(id)
        //调用根据id查询的方法
        this.selectNewsById(id)
      } else { //路径没有id值，做添加
        //清空表单
        this.newsInfo = {}
      }
    },
    saveOrUpdate(formName) {

      // 判断修改还是添加
      if (!this.newsInfo.id) {
        // 添加
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.addNews()
            this.$router.push({path:'/news/list'})
          } else {
            console.log("error submit!!");
            return false;
          }
        });

      } else {
        // 修改
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.updateNews()
            this.$router.push({path:'/news/list'})
          } else {
            console.log("error submit!!");
            return false;
          }
        });

      }
    },
    updateNews() {
      news.updateNews(this.newsInfo)
        .then(response => {
          //提示信息
          this.$message({
            type: 'success',
            message: '修改成功!'
          }).catch(e=>{
            console.log(e)
          })
          //回到列表页面 路由跳转

        })
      this.$router.push({path:'/news/list'})
    },
    cancel(){
      this.newsInfo.image=''
      this.$router.push({path:'/news/list'})
    },
    selectNewsById(id){
      news.selectNewsById(id).then(response=>{
        this.newsInfo=response.data.data
      })
    },
    selectCategory(){
      newsClass.selectCategory().then(response=>{
        this.categoryName=response.data.rows

        console.log(this.categoryName)
      })
    },

    onEditorReady(editor) { // 准备编辑器

    },
    onEditorBlur(){}, // 失去焦点事件
    onEditorFocus(){}, // 获得焦点事件
    onEditorChange(){}, // 内容改变事件
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  }

}


</script>
.cropper-content {
.cropper {
width: auto;
height: 300px;
}
}


