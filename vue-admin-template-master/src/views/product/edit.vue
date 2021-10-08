<template>
  <div>
    <el-form ref="productVo" :model="this.productVo" label-width="80px">
      <el-form-item label="产品名字">
        <el-input v-model="productVo.name" style="width:600px"/>
      </el-form-item>
      <el-form-item label="产品分类">
        <el-select v-model="productVo.cid" placeholder="请选择">
          <el-option
            v-for="item in categoryName1"
            :key="item.cid"
            :label="item.categoryName"
            :value="item.cid"/>
        </el-select>
      </el-form-item>
      <el-form-item label="产品首页图" label-width="90px">
        <el-upload
          :action="BASE_API+'/upload/file'"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeUpload"
          :show-file-list="false"
          class="avatar-uploader">
          <img v-if="imageurl!=null" :src="productVo.firstImage" width="200" height="200" >
          <i v-else class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品简介">
        <el-input v-model="productVo.intro" style="width:600px"/>
      </el-form-item>
      <el-form-item label="产品功能">
        <el-input v-model="productVo.function" style="width:600px"/>
      </el-form-item>
      <el-form-item label="产品外形尺寸"label-width="auto">
        <el-upload
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeUpload"
          :show-file-list="false"
          :action="BASE_API+'/upload/file'"
          class="avatar-uploader">
          <img v-if="imageurl1!=null" :src="productParameter.dimensions" width="200" height="200" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品重量">
        <el-upload
          :on-success="handleAvatarSuccess2"
          :before-upload="beforeUpload"
          :show-file-list="false"
          :action="BASE_API+'/upload/file'"
          class="avatar-uploader">
          <img v-if="imageurl2!=null" :src="productParameter.weight" width="200" height="200" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品额定载荷"label-width="auto">
        <el-upload
          :on-success="handleAvatarSuccess3"
          :before-upload="beforeUpload"
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
          :before-upload="beforeUpload"
          :show-file-list="false"
          :action="BASE_API+'/upload/file'"
          class="avatar-uploader">
          <img v-if="imageurl4!=null" :src="productParameter.wheelbase" width="200" height="200" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品最高车速"label-width="auto">
        <el-upload
          :on-success="handleAvatarSuccess5"
          :before-upload="beforeUpload"
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
          :before-upload="beforeUpload"
          :show-file-list="false"
          :action="BASE_API+'/upload/file'"
          class="avatar-uploader">
          <img v-if="imageurl6!=null" :src="productParameter.endurance" width="200" height="200" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品续航里程"label-width="100px">
        <el-upload
          :on-success="handleAvatarSuccess7"
          :before-upload="beforeUpload"
          :show-file-list="false"
          :action="BASE_API+'/upload/file'"
          class="avatar-uploader">
          <img v-if="imageurl7!=null" :src="productParameter.mileage" width="200" height="200" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="障碍检测时间"label-width="100px">
        <el-upload
          :on-success="handleAvatarSuccess8"
          :before-upload="beforeUpload"
          :show-file-list="false"
          :action="BASE_API+'/upload/file'"
          class="avatar-uploader">
          <img v-if="imageurl8!=null" :src="productParameter.detectionTime" width="200" height="200" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <div style="margin-left: 80px">
        <el-button type="primary"  @click="submitDisappear1()">添加</el-button>
        <el-dialog title="图片"  :visible.sync="dialogFormVisible1">
          <el-form  :model="pic">
            <el-form-item label="图片链接" >
              <el-upload
                :on-success="handleAvatarSuccess33"
                :before-upload="beforeUpload"
                :show-file-list="false"
                :action="BASE_API+'/upload/file'"
                class="avatar-uploader">
                <img v-if="imageurl18!=null" :src="pic.imageUrl" width="200" height="200" >
                <!--                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="submitImage1()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-form-item label="产品画册">
        <el-table
          :data="this.productAlbum"
          border
          fit
          highlight-current-row>
          <el-table-column
            label="序号"
            width="70"
            align="center">
            <template slot-scope="scope">
              {{  scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="图片" width="300px" hight="300px">
            <template width="90"  slot-scope="scope">
              <img style="width:200px;height:200px;border:none;" :src="scope.row.imageUrl">-->
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200px" >
            <template slot-scope="scope">
              <el-button type="danger" size="mini" icon="el-icon-delete" style="width: 73px"  @click="removeDataById1(scope.row.id)">删除</el-button>
              <el-button type="primary" size="mini" @click="submitDisappear1()">添加</el-button>
              <el-dialog title="图片"  :visible.sync="dialogFormVisible1">
                <el-form  :model="pic">
                  <el-form-item label="图片链接" >
                    <el-upload
                      :on-success="handleAvatarSuccess33"
                      :before-upload="beforeUpload"
                      :show-file-list="false"
                      :action="BASE_API+'/upload/file'"
                      class="avatar-uploader">
                      <img v-if="imageurl18!=null" :src="pic.imageUrl" width="200" height="200" >
                      <!--                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    </el-upload>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                  <el-button type="primary" @click="submitImage1()">确 定</el-button>
                </div>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
<!--        <el-button type="text" @click="submitDisappear1()">添加</el-button>-->
<!--        <el-dialog title="图片"  :visible.sync="dialogFormVisible1">-->
<!--          <el-form  :model="pic">-->
<!--            <el-form-item label="图片链接" >-->
<!--              <el-upload-->
<!--                :on-success="handleAvatarSuccess33"-->
<!--                :before-upload="beforeUpload"-->
<!--                :show-file-list="false"-->
<!--                :action="BASE_API+'/upload/file'"-->
<!--                class="avatar-uploader">-->
<!--                <img v-if="imageurl18!=null" :src="pic.imageUrl" width="200" height="200" >-->
<!--                &lt;!&ndash;                <i v-else class="el-icon-plus avatar-uploader-icon"></i>&ndash;&gt;-->
<!--              </el-upload>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--          <div slot="footer" class="dialog-footer">-->
<!--            <el-button @click="dialogFormVisible1 = false">取 消</el-button>-->
<!--            <el-button type="primary" @click="submitImage1()">确 定</el-button>-->
<!--          </div>-->
<!--        </el-dialog>-->
      </el-form-item>
      <div style="margin-left: 80px">
        <el-button type="primary"  @click="submitDisappear()">添加</el-button>
        <el-dialog title="图片"  :visible.sync="dialogFormVisible">
          <el-form  :model="appli">
            <el-form-item label="图片说明">
              <el-input v-model="appli.description" style="width: auto" ></el-input>
            </el-form-item>
            <el-form-item label="链接">
              <el-input v-model="appli.link" style="width: auto"  ></el-input>
            </el-form-item>
            <el-form-item label="图片链接" >
              <el-upload
                :on-success="handleAvatarSuccess44"
                :before-upload="beforeUpload"
                :show-file-list="false"
                :action="BASE_API+'/upload/file'"
                class="avatar-uploader">
                <img v-if="imageurl19!=null" :src="appli.imageUrl" width="200" height="200" >
                <!--                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitImage()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-form-item label="产品应用">
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
              {{  scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="图片说明"
            width="150">
          </el-table-column>
          <el-table-column
            prop="link"
            label="链接"
            width="150">
          </el-table-column>
          <el-table-column label="图片" width="300px" hight="300px">
            <template width="90"  slot-scope="scope">
              <img style="width:200px;height:200px;border:none;" :src="scope.row.imageUrl">-->
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200px" >
            <template slot-scope="scope">
              <el-button type="danger" size="mini" icon="el-icon-delete" style="width: 73px"  @click="removeDataById(scope.row.id)">删除</el-button>
              <el-button type="primary" size="mini" @click="submitDisappear()">添加</el-button>
              <el-dialog title="图片"  :visible.sync="dialogFormVisible">
                <el-form  :model="appli">
                  <el-form-item label="图片说明">
                    <el-input v-model="appli.description" style="width: auto" ></el-input>
                  </el-form-item>
                  <el-form-item label="链接">
                    <el-input v-model="appli.link" style="width: auto"  ></el-input>
                  </el-form-item>
                  <el-form-item label="图片链接" >
                    <el-upload
                      :on-success="handleAvatarSuccess44"
                      :before-upload="beforeUpload"
                      :show-file-list="false"
                      :action="BASE_API+'/upload/file'"
                      class="avatar-uploader">
                      <img v-if="imageurl19!=null" :src="appli.imageUrl" width="200" height="200" >
                      <!--                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    </el-upload>
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
<!--        <el-button type="text" @click="submitDisappear()">添加</el-button>-->
<!--        <el-dialog title="图片"  :visible.sync="dialogFormVisible">-->
<!--          <el-form  :model="appli">-->
<!--            <el-form-item label="图片说明">-->
<!--              <el-input v-model="appli.description" style="width: auto" ></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="链接">-->
<!--              <el-input v-model="appli.link" style="width: auto"  ></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="图片链接" >-->
<!--              <el-upload-->
<!--                :on-success="handleAvatarSuccess44"-->
<!--                :before-upload="beforeUpload"-->
<!--                :show-file-list="false"-->
<!--                :action="BASE_API+'/upload/file'"-->
<!--                class="avatar-uploader">-->
<!--                <img v-if="imageurl19!=null" :src="appli.imageUrl" width="200" height="200" >-->
<!--                &lt;!&ndash;                <i v-else class="el-icon-plus avatar-uploader-icon"></i>&ndash;&gt;-->
<!--              </el-upload>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--          <div slot="footer" class="dialog-footer">-->
<!--            <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--            <el-button type="primary" @click="submitImage()">确 定</el-button>-->
<!--          </div>-->
<!--        </el-dialog>-->
      </el-form-item>
        <el-form-item>

          <el-button type="primary" @click="Update()">确认修改</el-button>
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
  inject:['reload'],
  data() {
    return {
      productVo: {
        name: '',
        cid: '',
        intro: '',
        function: '',
        categoryName: '',
        firstImage: '',
        pid: ''
      },
      productParameter:{
        dimensions:'',
        weight:'',
        loading:'',
        wheelbase:'',
        speed:'',
        endurance:'',
        mileage:'',
        detectionTime:''
      },
      pic:{
        pppid:'',
        imageUrl:'',
      },
      productAlbum:[],
      application:[
      ],
      appli:{
        imageUrl: '',
        link: '',
        description:'',
        ppid:''
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
      imageurl18:'',
      imageurl19:'',
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
      dialogFormVisible1: false,
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
    submitDisappear(){
      this.dialogFormVisible = true
      this.appli={}
    },
    submitDisappear1(){
      this.dialogFormVisible1 = true
      this.pic={}
    },
    handleAvatarSuccess33(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.imageurl18=file.url
      this.pic.imageUrl=res.data.url
      // console.log(this.productVo.firstImage)
    },
    handleAvatarSuccess44(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.imageurl19=res.data.url
      this.appli.imageUrl=res.data.url
      // console.log(this.productVo.firstImage)
    },
    submitImage1() {
      this.dialogFormVisible1 = false
      let pc3={}
      pc3.imageUrl=this.pic.imageUrl
      pc3.pppid=this.productVo.id
      product.addProductPicture(pc3).then(response=>{
        this.$message({
          type: 'success',
          message: '增加成功!'
        })
        // this.$router.push({path: '/product/list'})
         this.reload()
        this.selectProductPicture(this.productVo.id)
      })

    },
    submitImage() {
      this.dialogFormVisible = false
      let appli2={}
      appli2.link=this.appli.link
      appli2.description=this.appli.description
      appli2.imageUrl=this.appli.imageUrl
      appli2.ppid=this.productVo.id
      product.addImage(appli2).then(response=>{
        this.$message({
          type: 'success',
          message: '增加成功!'
        })
        this.$router.push({path: '/product/edit/'+this.productVo.id})
        this.selectImageByPpid(this.productVo.id)
      })
    } ,
    selectProductPicture(id){
      product.selectProductPicture(id).then(response=>{
        this.productAlbum=response.data.data
        console.log(this.productAlbum)
      })
    },
    handleAvatarSuccess11(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.appli.imageUrl= res.data.url
      this.imageurl14=file.url
      // console.log(this.productVo.firstImage)
    },
    handleAvatarSuccess(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.productVo.firstImage = res.data.url
      this.imageurl=res.data.url
      // console.log(this.productVo.firstImage)
    },
    handleAvatarSuccess1(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.productParameter.dimensions = res.data.url
      this.imageurl1=file.url
      // console.log(this.productVo.firstImage)
    },
    handleAvatarSuccess2(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.productParameter.weight = res.data.url
      this.imageurl2=res.data.url
      // console.log(this.productVo.firstImage)
    },
    handleAvatarSuccess3(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.productParameter.loading = res.data.url
      this.imageurl3=res.data.url
      // console.log(this.productVo.firstImage)
    },
    handleAvatarSuccess4(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.productParameter.wheelbase = res.data.url
      this.imageurl4=res.data.url
      // console.log(this.productVo.firstImage)
    },
    handleAvatarSuccess5(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.productParameter.speed = res.data.url
      this.imageurl5=res.data.url
      // console.log(this.productVo.firstImage)
    },
    handleAvatarSuccess6(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.productParameter.endurance = res.data.url
      this.imageurl6=res.data.url
      // console.log(this.productVo.firstImage)
    },
    handleAvatarSuccess7(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.productParameter.mileage = res.data.url
      this.imageurl7=res.data.url
    },
    handleAvatarSuccess8(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.productParameter.detectionTime = res.data.url
      this.imageurl8=res.data.url
    },
    handlePictureCardPreview(file) { // 查看某张图片的原图
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeUpload(file) {
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
    removeDataById1(id){
      product.deleteProductPictureById(id).then(response=>{
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.reload()
      })
    },
    removeDataById(id){
      product.deleteImageSingle(id).then(response=>{
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.reload()
      })

    },
    init() {
      // 判断路径有id值,做修改
      if (this.$route.params && this.$route.params.id) {
        // 从路径获取id值
        const id = this.$route.params.id
        console.log(id)
        // 调用根据id查询的方法
        this.selectProductById(id)
        this.selectProductParameter(id)
        this.selectProductPicture(id)
        this.selectImageByPpid(id)
      }
    },
    Update() {
      this.updateProduct()
      this.updateProductParameter();
    },
    updateProduct() {
      product.updateProduct(this.productVo)
        .then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '修改成功!'
          }).catch(e => {
            console.log(e)
          })
        })
      // 回到列表页面 路由跳转
      this.$router.push({ path: '/product/list' })
    },
    cancel() {
      this.productVo.image = ''
      this.$router.push({ path: '/product/list' })
    },
    selectProductById(id) {
      product.selectProductById(id).then(response => {
        this.productVo = response.data.data

        // console.log(this.productVo)
      })
    },
    selectCategory() {
      productClass.selectCategory().then(response => {
        this.categoryName1 = response.data.data
        // console.log(this.categoryName1)
      })
    },
    selectProductParameter(id){
      product.selectProductParameter(id).then(response=>{
        this.productParameter=response.data.data
        console.log("*****"+this.productParameter)
      })
    },
    selectImageByPpid(id){
      product.selectImageByPpid(id).then(response=>{
        this.application=response.data.data

      })
    },

    updateProductParameter(){
      product.updateProductParameter(this.productParameter).then(response=>{

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


