<template>
  <div>
    <el-form ref="productVo" :model="this.productVo" :rules="rules" label-width="80px">
      <el-form-item label="产品名字"  prop="name">
        <el-input v-model="productVo.name" style="width:200px"/>
      </el-form-item>
      <el-form-item label="产品分类" prop="cid">
        <el-select v-model="productVo.cid"  placeholder="请选择">
          <el-option
            v-for="item in categoryName1"
            :key="item.cid"
            :label="item.categoryName"
            :value="item.cid"/>
        </el-select>
      </el-form-item>
      <el-form-item label="产品首页图片" label-width="105px">
        <el-upload
          :action="BASE_API+'/upload/file'"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          class="avatar-uploader">
          <img v-if="imageurl!=null" :src="productVo.firstImage" width="200" height="200" >
          <i v-else class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品简介">
        <textarea cols="65" rows="4"  v-model="productVo.intro" ></textarea>
      </el-form-item>
      <el-form-item label="产品功能">
        <el-input v-model="productVo.function" style="width:500px"/>
      </el-form-item>
      <el-form-item label="外形尺寸">
        <el-upload
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :action="BASE_API+'/upload/file'"
          class="avatar-uploader">
          <img v-if="imageurl1!=null" :src="productParameter.dimensions" width="200" height="200" >
          <i v-else class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品重量">
        <el-upload
          :on-success="handleAvatarSuccess2"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :action="BASE_API+'/upload/file'"
          class="avatar-uploader">
          <img v-if="imageurl2!=null" :src="productParameter.weight" width="200" height="200" >
          <i v-else class="el-icon-plus "></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="额定载荷">
        <el-upload
          :on-success="handleAvatarSuccess3"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :action="BASE_API+'/upload/file'"
          class="avatar-uploader">
          <img v-if="imageurl3!=null" :src="productParameter.loading" width="200" height="200" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品轴距">
        <el-upload
          :on-success="handleAvatarSuccess4"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :action="BASE_API+'/upload/file'"
          class="avatar-uploader">
          <img v-if="imageurl4!=null" :src="productParameter.wheelbase" width="200" height="200" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="最高车速">
        <el-upload
          :on-success="handleAvatarSuccess5"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :action="BASE_API+'/upload/file'"
          class="avatar-uploader">
          <img v-if="imageurl5!=null" :src="productParameter.speed" width="200" height="200" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品续航">
        <el-upload
          :on-success="handleAvatarSuccess6"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :action="BASE_API+'/upload/file'"
          class="avatar-uploader">
          <img v-if="imageurl6!=null" :src="productParameter.endurance" width="200" height="200" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品续航里程"label-width="105px">
        <el-upload
          :on-success="handleAvatarSuccess7"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :action="BASE_API+'/upload/file'"
          class="avatar-uploader">
          <img v-if="imageurl7!=null" :src="productParameter.mileage" width="200" height="200" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="障碍检测时间" label-width="105px">
        <el-upload
          :on-success="handleAvatarSuccess8"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :action="BASE_API+'/upload/file'"
          class="avatar-uploader">
          <img v-if="imageurl8!=null" :src="productParameter.detectionTime" width="200" height="200" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品画册">
        <el-upload
          ref="upload"
          :action="BASE_API+'/upload/file'"
          :auto-upload="true"
          :on-remove="handleRemove1"
          :on-success="handleSuccess1"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePictureCardPreview"
          list-type="picture-card"
        >
          <i class="el-icon-plus"/>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img :src="dialogImageUrl" width="100%" alt="">
        </el-dialog>
      </el-form-item>
<!--       <el-form-item label="产品应用">-->
<!--        <el-button type="text" @click="submitDisappear()">点击产品画册增加产品图片，产品说明，产品链接</el-button>-->
<!--        <el-dialog title="产品"  :visible.sync="dialogFormVisible">-->
<!--          <el-form  :model="appli">-->
<!--            <el-form-item label="图片说明">-->
<!--              <el-input v-model="appli.description" style="width: auto" autocomplete="off"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="图片链接" >-->
<!--              <el-upload-->
<!--                :on-success="handleAvatarSuccess11"-->
<!--                :before-upload="beforeAvatarUpload"-->
<!--                :show-file-list="false"-->
<!--                :action="BASE_API+'/upload/file'"-->
<!--                class="avatar-uploader">-->
<!--                <img v-if="imageurl14!=null" :src="appli.imageUrl" width="200" height="200" >-->
<!--&lt;!&ndash;                <i v-else class="el-icon-plus avatar-uploader-icon"></i>&ndash;&gt;-->
<!--              </el-upload>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="链接">-->
<!--              <el-input v-model="appli.link" style="width: 400px" autocomplete="off"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--          <div slot="footer" class="dialog-footer">-->
<!--            <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--            <el-button type="primary" @click="submitImage()">确 定</el-button>-->
<!--          </div>-->
<!--        </el-dialog>-->
<!--       </el-form-item>-->
      <div style="margin-left: 80px">
        <el-button type="primary" @click="submitDisappear()">增加</el-button>
        <el-dialog title="产品"  :visible.sync="dialogFormVisible">
          <el-form  :model="appli">
            <el-form-item label="图片说明">
              <el-input v-model="appli.description" style="width: auto" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="应用图片" >
              <el-upload
                :on-success="handleAvatarSuccess11"
                :before-upload="beforeAvatarUpload"
                :show-file-list="false"
                :action="BASE_API+'/upload/file'"
                class="avatar-uploader">
                <img v-if="imageurl14!=null" :src="appli.imageUrl" width="200" height="200" >
                <!--                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
              </el-upload>
            </el-form-item>
            <el-form-item label="链接地址">
              <el-input v-model="appli.link" style="width: 400px" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitImage()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-form-item label="应用列表" >
        <el-table
          :data="this.application"
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
            prop="description"
            label="名字"
            width="150"/>
          <el-table-column
            prop="link"
            label="链接"
            width="150"/>
          <el-table-column label="图片" width="120px">
            <template width="90" slot-scope="scope">
              <img style="width:100px;height:100px;border:none;" :src="scope.row.imageUrl">
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" icon="el-icon-delete" style="width: 73px"  @click="removeDataById1(scope.row.id)">删除</el-button>
              <el-button type="primary" size="mini" @click="submitDisappear()">增加</el-button>
              <el-dialog title="产品"  :visible.sync="dialogFormVisible">
                <el-form  :model="appli">
                  <el-form-item label="图片说明">
                    <el-input v-model="appli.description" style="width: auto" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="图片链接" >
                    <el-upload
                      :on-success="handleAvatarSuccess11"
                      :before-upload="beforeAvatarUpload"
                      :show-file-list="false"
                      :action="BASE_API+'/upload/file'"
                      class="avatar-uploader">
                      <img v-if="imageurl14!=null" :src="appli.imageUrl" width="200" height="200" >
                      <!--                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="链接">
                    <el-input v-model="appli.link" style="width: 400px" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submitImage()">确 定</el-button>
                </div>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>

      </el-form-item>
      <el-form-item>

        <el-button type="primary" @click="saveOrUpdate('productVo')">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
  </el-form>
  </div>

</template>
<script>
import product from '@/api/smart/product'
import productImage from '@/api/smart/productImage'
import productClass from '@/api/smart/productClass'
import { v4 as uuidv4 } from 'uuid'
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import Layout from "../layout/Layout";
Vue.use(VueQuillEditor)
export default {
  components: {Layout},
  data() {
    return {
      rules: {
        // 要以数组形式展示
        cid: [
          {required: true, message: "类别名不能为空", trigger: "change"}],
        name: [{required: true, message: "新闻标题不能为空", trigger: "change"}]
      },
      productVo: {
        name: '',
        cid: '',
        intro: '',
        function: '',
        categoryName: '',
        firstImage: '',
        createTime: '',
        modifiedTime: '',
        pid: '',
        pppid:'',
        ppid:''
      },
      pictureAlbum:[],
      application:[],
      productParameter:{
        dimensions: '',
        weight: '',
        loading: '',
        wheelbase: '',
        speed: '',
        endurance: '',
        mileage: '',
        detectionTime: '',
      },
      productPic:[],
      appli:{
        imageUrl: '',
        link: '',
        description:'',
        ppid:''
       },
    pi:{
        pppid:'',
      imageUrl:'',
      description:'',
      link:''
    },
      appli2:{},
      appli3:{},
      appli4:{},
      appli5:{},
      appli6:{},
      appli7:{},
      appli8:{},
      appli9:{},
      imageurl:'',
      imageurl1:'',
      imageurl2:'',
      imageurl3:'',
      imageurl4:'',
      imageurl5:'',
      imageurl6:'',
      imageurl7:'',
      imageurl8:'',
      imageurl9:'',
      imageurl10:'',
      imageurl14:'',
      dialogImageUrl: '',
      saveBtnDisabled: false,
      categoryName1: [],
      BASE_API: process.env.BASE_API, // 接口API地址
      // 富文本内容
      li: [],
      content: '',
      dialogVisible: false,
      editorOption: {},
      formLabelWidth: '120px',
      dialogTableVisible: false,
      dialogFormVisible: false,
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  created() {
    this.selectCategory()
    this.init()
  },
  methods: {
    submitDisappear() {
      this.dialogFormVisible = true
      this.appli = {}
    },
    saveImage() {
      this.$router.push({path: '/product/list'})
    },
    submitImage() {
      this.dialogFormVisible = false
      let appli2 = {}
      appli2.link = this.appli.link
      appli2.description = this.appli.description
      appli2.imageUrl = this.appli.imageUrl
      this.application.push(appli2)
    },
    handleAvatarSuccess11(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.appli.imageUrl = res.data.url
      this.imageurl14 = file.url
      // console.log(this.productVo.firstImage)
    },
    handleAvatarSuccess(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.productVo.firstImage = res.data.url
      this.imageurl = res.data.url
      // console.log(this.productVo.firstImage)
    },
    handleAvatarSuccess1(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.productParameter.dimensions = res.data.url
      this.imageurl1 = file.url
      // console.log(this.productVo.firstImage)
    },
    handleAvatarSuccess2(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.productParameter.weight = res.data.url
      this.imageurl2 = res.data.url
      // console.log(this.productVo.firstImage)
    },
    handleAvatarSuccess3(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.productParameter.loading = res.data.url
      this.imageurl3 = res.data.url
      // console.log(this.productVo.firstImage)
    },
    handleAvatarSuccess4(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.productParameter.wheelbase = res.data.url
      this.imageurl4 = res.data.url
      // console.log(this.productVo.firstImage)
    },
    handleAvatarSuccess5(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.productParameter.speed = res.data.url
      this.imageurl5 = res.data.url
      // console.log(this.productVo.firstImage)
    },
    handleAvatarSuccess6(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.productParameter.endurance = res.data.url
      this.imageurl6 = res.data.url
      // console.log(this.productVo.firstImage)
    },
    handleAvatarSuccess7(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.productParameter.mileage = res.data.url
      this.imageurl7 = res.data.url
    },
    handleAvatarSuccess8(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.productParameter.detectionTime = res.data.url
      this.imageurl8 = res.data.url
    },
    handlePictureCardPreview(file) { // 查看某张图片的原图
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove1(file, fileList) {

      this.productPic.forEach((item, i) => {
        let arr = item.split("*")
        if (arr[1] == file.uid) {
          console.log(file.uid)
          this.productPic.splice(i, 1)
        }
      })

    },
    removeDataById(id){
     this.pictureAlbum.forEach((item,i)=>{
       if(item.id==id){
         this.pictureAlbum.splice(i,1)
       }
     })
    },
    removeDataById1(id){
      this.application.forEach((item,i)=>{
        if(item.id==id){
          this.application.splice(i,1)
        }
      })
    },

    handleSuccess1(response, file, fileList) {
      this.productPic.push(response.data.url + "*" + file.uid)
      this.productPic.forEach(item=>{
        console.log(item)
      })
      // this.productPic.forEach(item => {
      // let arr=item.split("*")
      //   let productP={
      //   pppid:''
      //     ,imageUrl:''}
      //    productP.imageUrl=arr[0]
      //   productP.pppid=''
      //   this.pictureAlbum.push(productP)


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
    addAllProduct() {
      let onlyUuid = uuidv4()
      onlyUuid = onlyUuid.toString().replace("-", "").substring(0, 6);
      this.productVo.id = onlyUuid
      this.productVo.pid = onlyUuid
      this.productVo.ppid=onlyUuid
      this.productVo.pppid=onlyUuid
      this.productParameter.pid = onlyUuid
      console.log(this.pictureAlbum)
      this.productPic.forEach(item=>{
       let arr=item.split("*")
        this.pi.pppid=onlyUuid
        this.pi.imageUrl=arr[0]
        this.pictureAlbum.push(this.pi)
      })
      this.pictureAlbum.forEach(item=>{
        console.log(item)
      })
      this.pictureAlbum.forEach(item => {

        product.addProductPicture(item).then(response => {
        })
      })
      this.application.forEach((item, i) => {
        item.ppid = this.productVo.id
        productImage.addImage(item).then(response => {
          }
        ).catch(error => {
          console.log(error)
        })

      })
      product.addProductParameter(this.productParameter).then(response => {

      })
      product.addProduct(this.productVo)
          .then(response => { // 添加成功
            // 提示信息
            // console.log(response)
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.$router.push({path: '/product/list'})
          })
      // 回到列表页面 路由跳转


    },
    init() {
      this.productVo = {}
      },
    saveOrUpdate(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.addAllProduct()
          } else {
            console.log("error submit!!");
            return false;
          }
        })},
    cancel() {
      this.productVo.image = ''
      this.$router.push({path: '/product/list'})
    },

    selectCategory() {
      productClass.selectCategory().then(response => {
        this.categoryName1 = response.data.data
        console.log(this.categoryName1)
      })
    },

    onEditorReady(editor) { // 准备编辑器

    },
    onEditorBlur() {
    }, // 失去焦点事件
    onEditorFocus() {
    }, // 获得焦点事件
    onEditorChange() {
    } // 内容改变事件

  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.t-ctn {
  width: 100%;
  overflow-x: auto;
}

.t-ctn .s-ctn {
  height: 150px;
  white-space: nowrap;
  font-size: 0;
}

.t-ctn .s-ctn div {
  font-size: 14px;
  box-sizing: border-box;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  display: inline-block;
  width: 200px;
  height: 100%;
  border: 10px solid red;
}

</style>


